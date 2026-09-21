"use client";

import { useState, type ComponentType } from "react";
import {
  Building2,
  Car,
  UserRound,
  Users,
  MapPin,
  Gauge,
  Bell,
  ShieldCheck,
  Route,
  ClipboardList,
  BarChart3,
  Navigation,
  type LucideProps,
} from "lucide-react";

type Feature = { icon: ComponentType<LucideProps>; label: string };
type Tab = {
  key: string;
  label: string;
  icon: ComponentType<LucideProps>;
  tagline: string;
  features: Feature[];
};

const tabs: Tab[] = [
  {
    key: "organization",
    label: "Organization",
    icon: Building2,
    tagline: "The full operation, at a glance.",
    features: [
      { icon: Route, label: "Fleet visibility" },
      { icon: ClipboardList, label: "Trip management" },
      { icon: Users, label: "Driver management" },
      { icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    key: "driver",
    label: "Driver",
    icon: Car,
    tagline: "Everything needed for the route ahead.",
    features: [
      { icon: Navigation, label: "Navigation" },
      { icon: ClipboardList, label: "Trip management" },
      { icon: Users, label: "Passenger information" },
      { icon: ShieldCheck, label: "Safety tools" },
    ],
  },
  {
    key: "parent",
    label: "Parent",
    icon: UserRound,
    tagline: "Peace of mind, in your pocket.",
    features: [
      { icon: MapPin, label: "Live bus tracking" },
      { icon: Gauge, label: "ETA" },
      { icon: Bell, label: "Notifications" },
      { icon: ShieldCheck, label: "Student safety" },
    ],
  },
  {
    key: "passenger",
    label: "Passenger",
    icon: Users,
    tagline: "Know exactly where you stand.",
    features: [
      { icon: Gauge, label: "Trip status" },
      { icon: MapPin, label: "Location" },
      { icon: Bell, label: "Notifications" },
      { icon: Route, label: "Journey information" },
    ],
  },
];

export default function PlatformTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const Icon = tab.icon;

  return (
    <section id="platform" className="section container-px">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Platform</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          One connected platform for every journey.
        </h2>
      </div>

      <div
        className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Platform experiences"
      >
        {tabs.map((t, i) => {
          const TabIcon = t.icon;
          const isActive = i === active;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-apricot bg-apricot text-white"
                  : "border-taupe bg-white text-charcoal/70 hover:border-apricot hover:text-apricot"
              }`}
            >
              <TabIcon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="mx-auto mt-10 grid max-w-4xl gap-8 rounded-2xl border border-taupe bg-white p-6 shadow-[0_1px_2px_rgba(16,32,39,0.04)] sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center"
      >
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-apricot">
            <Icon size={22} strokeWidth={1.75} />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-charcoal">
            {tab.tagline}
          </h3>
          <ul className="mt-5 space-y-3">
            {tab.features.map(({ icon: FeatureIcon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-charcoal/75"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-apricot">
                  <FeatureIcon size={15} strokeWidth={1.75} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Compact preview panel standing in for a product screenshot */}
        <div className="rounded-xl border border-taupe bg-brand-soft/40 p-5">
          <p className="text-xs font-medium text-charcoal/50">
            {tab.label} view
          </p>
          <div className="mt-3 space-y-2">
            {tab.features.map(({ icon: FeatureIcon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-charcoal shadow-sm"
              >
                <FeatureIcon size={13} className="text-apricot" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}