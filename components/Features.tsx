"use client";

import { useState } from "react";
import {
  Radar,
  Clock,
  Route,
  ShieldCheck,
  ClipboardList,
  BadgeCheck,
  Bus,
  UsersRound,
  Bell,
  BarChart3,
  ChevronDown,
} from "lucide-react";

const primaryFeatures = [
  { icon: Radar, title: "Live Tracking", body: "Track active vehicles in real time." },
  {
    icon: Clock,
    title: "Real-time ETA",
    body: "Estimated arrival time and time remaining, calculated continuously.",
  },
  {
    icon: Route,
    title: "Smart Routing",
    body: "Routes adapt to operational changes and traffic conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    body: "Journey monitoring, alerts and safety workflows.",
  },
  {
    icon: ClipboardList,
    title: "Trip Management",
    body: "Manage scheduled and active trips from one place.",
  },
  {
    icon: Bell,
    title: "Alerts & Notifications",
    body: "Keep relevant users informed about delays and changes.",
  },
];

const moreFeatures = [
  {
    icon: BadgeCheck,
    title: "Driver Management",
    body: "Manage drivers, assignments and operational information.",
  },
  {
    icon: Bus,
    title: "Vehicle Management",
    body: "Track vehicles and their operational status.",
  },
  {
    icon: UsersRound,
    title: "Passenger Management",
    body: "Manage passenger assignments and journey information.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    body: "Give organizations insight into transportation operations.",
  },
];

const routeSteps = [
  "Passenger cancels",
  "Stop becomes unnecessary",
  "Route recalculated",
  "Driver receives updated route",
  "ETA recalculated",
  "Relevant passengers receive updated information",
];

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Radar;
  title: string;
  body: string;
}) {
  return (
    <div className="card">
      <Icon size={20} className="text-apricot" strokeWidth={1.75} />
      <h3 className="mt-4 font-display text-lg font-bold text-charcoal">{title}</h3>
      <p className="mt-2 text-sm text-charcoal/65">{body}</p>
    </div>
  );
}

export default function Features() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="features" className="section container-px">
      <div className="max-w-xl">
        <p className="eyebrow">Core capabilities</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          Everything you need to manage transportation.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {primaryFeatures.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-apricot"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Show fewer features" : "View all features"}
        </button>
      </div>

      {expanded && (
        <div className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {moreFeatures.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          <div className="mt-10 grid gap-10 rounded-2xl border border-taupe bg-white p-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-charcoal">
                ETA is calculated, not guessed.
              </h3>
              <p className="mt-3 text-sm text-charcoal/65">
                RideX360 calculates ETA using real-time vehicle location, the
                current route, remaining stops and traffic conditions —
                updating as the journey changes. Figures shown here are
                simulated for demonstration.
              </p>
            </div>
            <div className="w-full max-w-xs justify-self-start rounded-xl border border-taupe bg-brand-soft/40 p-5 lg:justify-self-end">
              <p className="text-xs text-charcoal/50">Bus 12 · Route A</p>
              <p className="mt-1 text-sm text-charcoal/70">1.8 km away</p>
              <p className="mt-3 font-display text-2xl font-bold text-charcoal">
                7 min away
              </p>
              <p className="text-xs text-apricot">Arrives at 8:15 AM</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-2xl font-bold text-charcoal">
              Transportation changes in the real world. Your system should
              adapt.
            </h3>
            <p className="mt-2 max-w-lg text-sm text-charcoal/65">
              An intended platform workflow for handling change without
              breaking the journey.
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {routeSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-taupe bg-white p-4 text-sm text-charcoal/80"
                >
                  <span className="mt-0.5 shrink-0 text-apricot">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}