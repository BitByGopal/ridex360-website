"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Globe,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import {
  isDateAvailable,
  getAvailableTimes,
  createDemoBooking,
  buildGoogleCalendarLink,
  buildOutlookCalendarLink,
  type TimeSlot,
} from "@/lib/scheduling";

type Step = "date" | "time" | "details" | "review" | "confirmed";

const TIMEZONES = [
  "India Standard Time (IST)",
  "Gulf Standard Time (GST)",
  "British Summer Time (BST)",
  "Eastern Time (ET)",
  "Pacific Time (PT)",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const orgTypes = [
  "School", "College", "Company", "Hospital", "Factory", "Hotel",
  "Industrial Campus", "Other",
];

type FormState = {
  orgName: string;
  orgType: string;
  contactName: string;
  email: string;
  phone: string;
  vehicles: string;
  improve: string;
};

const initialForm: FormState = {
  orgName: "",
  orgType: "",
  contactName: "",
  email: "",
  phone: "",
  vehicles: "",
  improve: "",
};

function getMonthGrid(viewMonth: Date): (Date | null)[] {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1);
  const leading = (firstDay.getDay() + 6) % 7; // Monday = 0
  const cells: (Date | null)[] = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateLong(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingFlow() {
  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const grid = useMemo(() => getMonthGrid(viewMonth), [viewMonth]);
  const availableTimes = selectedDate ? getAvailableTimes(selectedDate) : [];

  const isPrevDisabled =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() === today.getMonth();

  function changeMonth(delta: number) {
    setViewMonth((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  }

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.orgName.trim()) next.orgName = "Organization name is required.";
    if (!form.orgType) next.orgType = "Select an organization type.";
    if (!form.contactName.trim()) next.contactName = "Your name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid work email.";
    if (!/^\+?[0-9]{10,15}$/.test(form.phone.replace(/[\s\-()]/g, "")))
      next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      await createDemoBooking({
        orgName: form.orgName,
        orgType: form.orgType,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        vehicles: form.vehicles,
        improve: form.improve,
        demoDate: toISODate(selectedDate),
        demoTime: selectedTime,
        timezone,
      });
      setStep("confirmed");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setForm(initialForm);
    setErrors({});
    setSubmitError(null);
  }

  // ---------- Confirmed screen ----------
  if (step === "confirmed" && selectedDate && selectedTime) {
    return (
      <div className="rounded-2xl border border-taupe bg-white p-6 text-center sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-apricot">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-charcoal">
          Demo booked successfully!
        </h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Your RideX360 demo has been scheduled.
        </p>
        <p className="mt-4 font-medium text-charcoal">
          {formatDateLong(selectedDate)}
          <br />
          {selectedTime} · {timezone}
        </p>
        <p className="mt-4 text-sm text-charcoal/60">
          We&apos;ll send the meeting details to <strong>{form.email}</strong>.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={buildGoogleCalendarLink(selectedDate, selectedTime)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Add to Google Calendar
          </a>
          <a
            href={buildOutlookCalendarLink(selectedDate, selectedTime)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Add to Outlook
          </a>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-medium text-apricot"
        >
          Back to RideX360
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-taupe bg-white p-5 sm:p-6">
      {step !== "date" && (
        <button
          type="button"
          onClick={() => {
            if (step === "time") setStep("date");
            else if (step === "details") setStep("time");
            else if (step === "review") setStep("details");
          }}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-charcoal/60 hover:text-apricot"
        >
          <ArrowLeft size={15} /> Back
        </button>
      )}

      {/* Step: date */}
      {step === "date" && (
        <div>
          <h3 className="font-display text-lg font-bold text-charcoal">
            Choose a date &amp; time
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={isPrevDisabled}
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-taupe text-charcoal disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-semibold text-charcoal">
              {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
            </p>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-taupe text-charcoal"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-charcoal/50">
            {WEEKDAY_LABELS.map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {grid.map((date, i) => {
              if (!date) return <div key={`blank-${i}`} />;
              const available = isDateAvailable(date, today);
              const selected = isSameDay(date, selectedDate);
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                    setStep("time");
                  }}
                  className={`aspect-square rounded-full text-sm transition-colors ${
                    selected
                      ? "bg-apricot text-white font-semibold"
                      : available
                      ? "text-charcoal hover:bg-brand-soft"
                      : "cursor-not-allowed text-charcoal/25"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-charcoal/60">
            <Globe size={14} />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-transparent font-medium text-charcoal outline-none"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step: time */}
      {step === "time" && selectedDate && (
        <div>
          <h3 className="font-display text-lg font-bold text-charcoal">
            Available times
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-charcoal/60">
            <CalendarDays size={14} /> {formatDateLong(selectedDate)}
          </p>

          {availableTimes.length === 0 ? (
            <p className="mt-6 text-sm text-charcoal/60">
              No available times on this date. Please choose another date.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableTimes.map((t) => {
                const selected = t === selectedTime;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setSelectedTime(t);
                      setStep("details");
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      selected
                        ? "border-apricot bg-apricot text-white"
                        : "border-taupe text-charcoal hover:border-apricot hover:text-apricot"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}

          <p className="mt-5 flex items-center gap-1.5 text-xs text-charcoal/50">
            <Globe size={13} /> {timezone}
          </p>
        </div>
      )}

      {/* Step: details */}
      {step === "details" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) setStep("review");
          }}
        >
          <h3 className="font-display text-lg font-bold text-charcoal">
            Your details
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <BookingField
              label="Full Name"
              value={form.contactName}
              onChange={(v) => update("contactName", v)}
              error={errors.contactName}
            />
            <BookingField
              label="Work Email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
            />
            <BookingField
              label="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              error={errors.phone}
            />
            <BookingField
              label="Organization Name"
              value={form.orgName}
              onChange={(v) => update("orgName", v)}
              error={errors.orgName}
            />
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-charcoal/80">Organization Type</span>
              <select
                value={form.orgType}
                onChange={(e) => update("orgType", e.target.value)}
                className={`rounded-lg border bg-white px-3.5 py-2.5 text-charcoal outline-none focus:border-apricot ${
                  errors.orgType ? "border-red-400" : "border-taupe"
                }`}
              >
                <option value="">Select one</option>
                {orgTypes.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.orgType && (
                <span className="text-xs text-red-500">{errors.orgType}</span>
              )}
            </label>
            <BookingField
              label="Number of Vehicles (optional)"
              type="number"
              value={form.vehicles}
              onChange={(v) => update("vehicles", v)}
            />
          </div>

          <label className="mt-4 flex flex-col gap-1.5 text-sm">
            <span className="text-charcoal/80">Message (optional)</span>
            <textarea
              value={form.improve}
              onChange={(e) => update("improve", e.target.value)}
              rows={3}
              className="rounded-lg border border-taupe bg-white px-3.5 py-2.5 text-charcoal outline-none focus:border-apricot"
            />
          </label>

          <button type="submit" className="btn-primary mt-5">
            Continue to review
          </button>
        </form>
      )}

      {/* Step: review */}
      {step === "review" && selectedDate && selectedTime && (
        <form onSubmit={handleConfirm}>
          <h3 className="font-display text-lg font-bold text-charcoal">
            Review your booking
          </h3>

          <div className="mt-4 space-y-2 rounded-xl border border-taupe bg-brand-soft/40 p-4 text-sm">
            <p className="font-semibold text-charcoal">RideX360 Product Demo</p>
            <p className="text-charcoal/70">{formatDateLong(selectedDate)}</p>
            <p className="text-charcoal/70">
              {selectedTime} · 30 minutes · {timezone}
            </p>
            <p className="text-charcoal/70">{form.contactName} · {form.orgName}</p>
          </div>

          {submitError && (
            <p className="mt-4 text-sm text-red-500">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Booking…" : "Confirm Demo Booking"}
          </button>
          <p className="mt-3 text-center text-xs text-charcoal/50">
            No commitment — just a conversation.
          </p>
        </form>
      )}
    </div>
  );
}

function BookingField({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-charcoal/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-lg border bg-white px-3.5 py-2.5 text-charcoal outline-none focus:border-apricot ${
          error ? "border-red-400" : "border-taupe"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}