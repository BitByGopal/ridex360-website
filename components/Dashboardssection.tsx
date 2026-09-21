import { MapPin, Bell, UserCheck, Route, Users, Gauge, Bus, AlertTriangle, BarChart3 } from "lucide-react";

const dashboards = [
  {
    role: "Parent",
    tagline: "Peace of mind, in your pocket.",
    items: [
      { icon: MapPin, label: "Bus location" },
      { icon: Gauge, label: "ETA" },
      { icon: UserCheck, label: "Child / passenger status" },
      { icon: Bell, label: "Notifications" },
    ],
  },
  {
    role: "Driver",
    tagline: "Everything needed for the route ahead.",
    items: [
      { icon: Route, label: "Current route" },
      { icon: MapPin, label: "Next stop" },
      { icon: Users, label: "Passenger count" },
      { icon: Gauge, label: "Route status" },
    ],
  },
  {
    role: "Organization",
    tagline: "The full operation, at a glance.",
    items: [
      { icon: Bus, label: "Fleet overview" },
      { icon: Route, label: "Active vehicles & routes" },
      { icon: AlertTriangle, label: "Alerts" },
      { icon: BarChart3, label: "Analytics" },
    ],
  },
];

export default function DashboardsSection() {
  return (
    <section className="section container-px">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Dashboards</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          One Platform. Three Connected Experiences.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {dashboards.map((d) => (
          <div
            key={d.role}
            className="rounded-2xl border border-taupe bg-white p-6 shadow-[0_1px_2px_rgba(16,32,39,0.04)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-apricot">
              {d.role}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-charcoal">
              {d.tagline}
            </h3>
            <ul className="mt-5 space-y-3">
              {d.items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-charcoal/75">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-apricot">
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}