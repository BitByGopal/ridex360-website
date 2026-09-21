"use client";

import { useState } from "react";
import {
  Eye,
  UserCheck,
  Bell,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Siren,
  BadgeCheck,
  Bus,
  History,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";

const highlights = [
  { icon: Eye, label: "Live visibility" },
  { icon: BadgeCheck, label: "Driver monitoring" },
  { icon: UserCheck, label: "Passenger awareness" },
  { icon: Bell, label: "Real-time alerts" },
];

const fullItems = [
  { icon: Eye, label: "Live trip visibility" },
  { icon: CheckCircle2, label: "Boarding / drop-off verification" },
  { icon: AlertTriangle, label: "Route deviation awareness" },
  { icon: Siren, label: "Emergency / SOS workflows" },
  { icon: UserCheck, label: "Authorized child handover" },
  { icon: BadgeCheck, label: "Driver information" },
  { icon: Bus, label: "Vehicle information" },
  { icon: History, label: "Trip history" },
  { icon: ClipboardCheck, label: "End-of-route safety checks" },
];

export default function SafetySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section container-px bg-charcoal text-white">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-medium text-brand-light">Safety</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          Safety isn&apos;t a feature.
          <br />
          It&apos;s the foundation.
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-5 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-light">
              <Icon size={18} strokeWidth={1.75} />
            </span>
            <p className="text-sm font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-light"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Show less" : "Explore Safety"}
        </button>
      </div>

      {expanded && (
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fullItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm"
            >
              <Icon size={18} className="shrink-0 text-brand-light" strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>
      )}

      <p className="mx-auto mt-8 max-w-lg text-center text-sm text-white/60">
        For school use cases especially, RideX360 is built around verifiable,
        visible safety — not just tracking.
      </p>
    </section>
  );
}