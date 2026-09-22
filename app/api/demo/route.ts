import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

const TEAM_EMAIL = process.env.TEAM_EMAIL || "princegopalreddy@gmail.com";
const TEAM_PHONE = process.env.TEAM_PHONE || "+917075810619";

type DemoPayload = {
  orgName: string;
  orgType: string;
  contactName: string;
  email: string;
  phone: string;
  city?: string;
  vehicles?: string;
  passengers?: string;
  currentSystem?: string;
  improve?: string;
  // Optional booking-flow fields — present when the request came from the
  // calendar booking experience rather than the plain contact form.
  demoDate?: string;
  demoTime?: string;
  timezone?: string;
};

// Only these are required. Everything else (city, vehicle counts, message,
// and the booking-flow date/time/timezone fields) is optional — this must
// stay in sync with whichever frontend is submitting (DemoForm or
// BookingFlow), both of which only collect these five as mandatory.
const REQUIRED_FIELDS: (keyof DemoPayload)[] = [
  "orgName",
  "orgType",
  "contactName",
  "email",
  "phone",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

function toE164(phone: string) {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  return `+91${cleaned}`;
}

function logTwilioError(label: string, err: unknown) {
  const e = err as { message?: string; code?: number; moreInfo?: string; status?: number };
  console.error(
    `${label} — code: ${e?.code ?? "?"} status: ${e?.status ?? "?"} message: ${
      e?.message ?? String(err)
    }${e?.moreInfo ? ` (${e.moreInfo})` : ""}`
  );
}

export async function POST(req: NextRequest) {
  let data: DemoPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || !String(data[field]).trim()) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (!isValidEmail(data.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!isValidPhone(data.phone)) {
    return NextResponse.json({ error: "Invalid mobile number." }, { status: 400 });
  }

  const orgPhone = toE164(data.phone);
  const hasBooking = Boolean(data.demoDate && data.demoTime);
  const outcome = { emailConfirmation: false, smsConfirmation: false, teamNotified: false };

  const bookingLine = hasBooking
    ? `<p><strong>Demo scheduled for</strong><br/>${data.demoDate} at ${data.demoTime} (${data.timezone || "unspecified timezone"})</p>`
    : "";
  const bookingLineList = hasBooking
    ? `<li>Requested demo: ${data.demoDate} at ${data.demoTime} (${data.timezone || "unspecified timezone"})</li>`
    : "";

  // 1. Confirmation email to the organization
  try {
    await resend.emails.send({
      from: "RideX360 <onboarding@resend.dev>", // swap for your verified sending domain
      to: data.email,
      subject: hasBooking
        ? "Your RideX360 demo is booked"
        : "We've received your RideX360 demo request",
      html: `
        <p>Hi ${data.contactName},</p>
        <p>Thanks for ${hasBooking ? "booking" : "requesting"} a demo of RideX360 for
        <strong>${data.orgName}</strong>.</p>
        ${bookingLine}
        <p><strong>Request summary</strong><br/>
        Organization type: ${data.orgType}<br/>
        ${data.vehicles ? `Vehicles: ${data.vehicles}<br/>` : ""}
        ${data.passengers ? `Approx. passengers: ${data.passengers}<br/>` : ""}</p>
        <p>— The RideX360 Team</p>
      `,
    });
    outcome.emailConfirmation = true;
  } catch (err) {
    console.error("Email confirmation failed:", err);
  }

  // 2. Lead notification email to the RideX360 team
  try {
    await resend.emails.send({
      from: "RideX360 Leads <onboarding@resend.dev>",
      to: TEAM_EMAIL,
      subject: hasBooking
        ? `Demo booked — ${data.orgName}`
        : `New demo request — ${data.orgName}`,
      html: `
        <p>${hasBooking ? "A demo has been booked" : "New demo request submitted"}:</p>
        <ul>
          <li>Organization: ${data.orgName} (${data.orgType})</li>
          <li>Contact: ${data.contactName}</li>
          <li>Email: ${data.email}</li>
          <li>Phone: ${orgPhone}</li>
          ${bookingLineList}
          ${data.city ? `<li>City: ${data.city}</li>` : ""}
          ${data.vehicles ? `<li>Vehicles: ${data.vehicles}</li>` : ""}
          ${data.passengers ? `<li>Approx. passengers: ${data.passengers}</li>` : ""}
          ${data.currentSystem ? `<li>Current system: ${data.currentSystem}</li>` : ""}
          ${data.improve ? `<li>Message: ${data.improve}</li>` : ""}
        </ul>
      `,
    });
    outcome.teamNotified = true;
  } catch (err) {
    console.error("Team notification email failed:", err);
  }

  // 3. SMS confirmation to the organization + 4. SMS alert to the team
  if (twilioClient && process.env.TWILIO_FROM_NUMBER) {
    const smsSuffix = hasBooking
      ? ` Your demo is set for ${data.demoDate} at ${data.demoTime}.`
      : " Our team will contact you shortly.";

    try {
      await twilioClient.messages.create({
        to: orgPhone,
        from: process.env.TWILIO_FROM_NUMBER,
        body: `RideX360: Thanks ${data.contactName}, we've received your demo ${
          hasBooking ? "booking" : "request"
        } for ${data.orgName}.${smsSuffix}`,
      });
      outcome.smsConfirmation = true;
    } catch (err) {
      logTwilioError("SMS confirmation failed", err);
    }

    try {
      await twilioClient.messages.create({
        to: TEAM_PHONE,
        from: process.env.TWILIO_FROM_NUMBER,
        body: `RideX360 demo ${hasBooking ? "booked" : "request"}: ${data.orgName} — ${
          data.contactName
        }, ${orgPhone}.${
          hasBooking ? ` ${data.demoDate} at ${data.demoTime}.` : ""
        }`,
      });
    } catch (err) {
      logTwilioError("Team SMS alert failed", err);
    }
  } else {
    console.warn("Twilio not configured — skipping SMS.");
  }

  return NextResponse.json({ ok: true, ...outcome });
}