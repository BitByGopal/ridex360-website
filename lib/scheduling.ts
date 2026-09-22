// Scheduling abstraction layer.
//
// There is no live calendar backend yet, so isDateAvailable/getAvailableTimes
// use simple, clearly-labeled placeholder rules (weekdays only, fixed
// business-hour slots). When a real provider (Google Calendar, Cal.com,
// etc.) is connected, replace the internals of these functions — nothing
// in the booking UI needs to change, since it only calls this interface.

export type TimeSlot = string; // e.g. "10:00 AM"

const SLOT_TEMPLATE: TimeSlot[] = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * PLACEHOLDER RULE: weekdays only, starting tomorrow, for the next ~45 days.
 * Swap this for a real calendar/availability lookup later.
 */
export function isDateAvailable(date: Date, today: Date = new Date()): boolean {
  const d = stripTime(date);
  const t = stripTime(today);
  if (d <= t) return false;
  if (isWeekend(d)) return false;
  const windowEnd = new Date(t);
  windowEnd.setDate(windowEnd.getDate() + 45);
  return d <= windowEnd;
}

export function getAvailableTimes(date: Date): TimeSlot[] {
  if (!isDateAvailable(date)) return [];
  return SLOT_TEMPLATE;
}

export type BookingPayload = {
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
  demoDate: string; // e.g. "2026-09-29"
  demoTime: string; // e.g. "10:30 AM"
  timezone: string;
};

export async function createDemoBooking(data: BookingPayload) {
  const res = await fetch("/api/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong. Please try again.");
  }
  return res.json();
}

// --- Calendar deep links (genuinely functional, no backend needed) ---
// Both compute the correct UTC instant assuming the demo time is India
// Standard Time (UTC+5:30), matching the default/primary timezone this
// business operates in. If the timezone selector is later wired to real
// per-zone slot math, update the offset calculation here accordingly.

const IST_OFFSET_MINUTES = 5.5 * 60;

function slotTo24Hour(slot: TimeSlot): { hour: number; minute: number } {
  const [time, meridiem] = slot.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

function toUTCInstant(date: Date, slot: TimeSlot): Date {
  const { hour, minute } = slotTo24Hour(slot);
  const utcMillis =
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute) -
    IST_OFFSET_MINUTES * 60 * 1000;
  return new Date(utcMillis);
}

function toGCalUTCString(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarLink(date: Date, slot: TimeSlot, durationMin = 30) {
  const start = toUTCInstant(date, slot);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "RideX360 Product Demo",
    dates: `${toGCalUTCString(start)}/${toGCalUTCString(end)}`,
    details:
      "A walkthrough of RideX360's live tracking, smart routing and safety tools.",
    location: "Online",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookCalendarLink(date: Date, slot: TimeSlot, durationMin = 30) {
  const start = toUTCInstant(date, slot);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const params = new URLSearchParams({
    subject: "RideX360 Product Demo",
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    body: "A walkthrough of RideX360's live tracking, smart routing and safety tools.",
    location: "Online",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}