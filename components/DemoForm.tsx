"use client";

import { useState, FormEvent } from "react";

type FormState = {
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

const initial: FormState = {
  orgName: "",
  orgType: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  vehicles: "",
  passengers: "",
  currentSystem: "",
  improve: "",
};

const orgTypes = [
  "School",
  "College",
  "Company",
  "Hospital",
  "Factory",
  "Hotel",
  "Industrial Campus",
  "Other",
];

export default function DemoForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.orgName.trim()) next.orgName = "Organization name is required.";
    if (!form.orgType) next.orgType = "Select an organization type.";
    if (!form.contactName.trim()) next.contactName = "Contact person is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid organization email address.";
    if (!/^\+?[0-9]{10,15}$/.test(form.phone.replace(/[\s\-()]/g, "")))
      next.phone = "Enter a valid mobile number (10-15 digits).";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.vehicles || Number(form.vehicles) <= 0)
      next.vehicles = "Enter the number of vehicles.";
    if (!form.passengers || Number(form.passengers) <= 0)
      next.passengers = "Enter the approximate number of passengers.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setForm(initial);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <h3 className="font-display text-xl text-charcoal">
          Thank you! Your demo request has been received.
        </h3>
        <p className="mt-2 text-sm text-charcoal/65">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2"
    >
      <Field
        label="Organization Name"
        value={form.orgName}
        onChange={(v) => update("orgName", v)}
        error={errors.orgName}
      />

      <SelectField
        label="Organization Type"
        value={form.orgType}
        options={orgTypes}
        onChange={(v) => update("orgType", v)}
        error={errors.orgType}
      />

      <Field
        label="Contact Person"
        value={form.contactName}
        onChange={(v) => update("contactName", v)}
        error={errors.contactName}
      />

      <Field
        label="Organization Email"
        type="email"
        value={form.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
      />

      <Field
        label="Organization Mobile Number"
        type="tel"
        value={form.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
      />

      <Field
        label="City"
        value={form.city}
        onChange={(v) => update("city", v)}
        error={errors.city}
      />

      <Field
        label="Number of Vehicles"
        type="number"
        value={form.vehicles}
        onChange={(v) => update("vehicles", v)}
        error={errors.vehicles}
      />

      <Field
        label="Approx. Number of Passengers"
        type="number"
        value={form.passengers}
        onChange={(v) => update("passengers", v)}
        error={errors.passengers}
      />

      <Field
        label="Current Transportation System"
        value={form.currentSystem}
        onChange={(v) => update("currentSystem", v)}
        className="sm:col-span-2"
      />

      <TextAreaField
        label="What would you like to improve?"
        value={form.improve}
        onChange={(v) => update("improve", v)}
        className="sm:col-span-2"
      />

      {submitError && (
        <p className="text-sm text-red-500 sm:col-span-2">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Request a Demo"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className}`}>
      <span className="text-charcoal/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-lg border bg-white px-3.5 py-2.5 text-charcoal outline-none transition-colors focus:border-apricot ${
          error ? "border-red-400" : "border-taupe/70"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  error,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-charcoal/80">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-lg border bg-white px-3.5 py-2.5 text-charcoal outline-none transition-colors focus:border-apricot ${
          error ? "border-red-400" : "border-taupe/70"
        }`}
      >
        <option value="">Select one</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className}`}>
      <span className="text-charcoal/80">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="rounded-lg border border-taupe/70 bg-white px-3.5 py-2.5 text-charcoal outline-none transition-colors focus:border-apricot"
      />
    </label>
  );
}
