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
  city: string;
  vehicles: string;
  passengers: string;
  currentSystem: string;
  improve: string;
};

const REQUIRED_FIELDS: (keyof DemoPayload)[] = [
  "orgName",
  "orgType",
  "contactName",
  "email",
  "phone",
  "city",
  "vehicles",
  "passengers",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Accepts optional leading + and 10-15 digits, ignoring spaces/dashes/parens.
function isValidPhone(phone: string) {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

// Twilio needs E.164 format (+countrycode number). If no country code was
// given, default to India (+91) since that's this org's primary market.
function toE164(phone: string) {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  return `+91${cleaned}`;
}

// Extracts a readable message/code from a Twilio SDK error instead of
// dumping the whole error object into the terminal.
function logTwilioError(label: string, err: unknown) {
  const e = err as {
    message?: string;
    code?: number;
    moreInfo?: string;
    status?: number;
  };
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
  const outcome = { emailConfirmation: false, smsConfirmation: false, teamNotified: false };

  // 1. Confirmation email to the organization
  try {
    await resend.emails.send({
      from: "RideX360 <onboarding@resend.dev>", // swap for your verified sending domain
      to: data.email,
      subject: "We've received your RideX360 demo request",
      html: `
        <p>Hi ${data.contactName},</p>
        <p>Thanks for requesting a demo of RideX360 for <strong>${data.orgName}</strong>.
        Our team will contact you shortly to schedule a walkthrough.</p>
        <p><strong>Request summary</strong><br/>
        Organization type: ${data.orgType}<br/>
        City: ${data.city}<br/>
        Vehicles: ${data.vehicles}<br/>
        Approx. passengers: ${data.passengers}</p>
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
      subject: `New demo request — ${data.orgName}`,
      html: `
        <p>New demo request submitted:</p>
        <ul>
          <li>Organization: ${data.orgName} (${data.orgType})</li>
          <li>Contact: ${data.contactName}</li>
          <li>Email: ${data.email}</li>
          <li>Phone: ${orgPhone}</li>
          <li>City: ${data.city}</li>
          <li>Vehicles: ${data.vehicles}</li>
          <li>Approx. passengers: ${data.passengers}</li>
          <li>Current system: ${data.currentSystem || "—"}</li>
          <li>Wants to improve: ${data.improve || "—"}</li>
        </ul>
      `,
    });
    outcome.teamNotified = true;
  } catch (err) {
    console.error("Team notification email failed:", err);
  }

  // 3. SMS confirmation to the organization + 4. SMS alert to the team
  if (twilioClient && process.env.TWILIO_FROM_NUMBER) {
    try {
      await twilioClient.messages.create({
        to: orgPhone,
        from: process.env.TWILIO_FROM_NUMBER,
        body: `RideX360: Thanks ${data.contactName}, we've received your demo request for ${data.orgName}. Our team will contact you shortly.`,
      });
      outcome.smsConfirmation = true;
    } catch (err) {
      logTwilioError("SMS confirmation failed", err);
    }

    try {
      await twilioClient.messages.create({
        to: TEAM_PHONE,
        from: process.env.TWILIO_FROM_NUMBER,
        body: `New RideX360 demo request: ${data.orgName} — ${data.contactName}, ${orgPhone}.`,
      });
    } catch (err) {
      logTwilioError("Team SMS alert failed", err);
    }
  } else {
    console.warn("Twilio not configured — skipping SMS.");
  }

  // Submission itself always succeeds if we got this far and it passed
  // validation — email/SMS delivery issues are logged, not fatal to the user.
  return NextResponse.json({ ok: true, ...outcome });
}