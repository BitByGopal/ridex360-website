import { Radar, Route, Bell, LayoutDashboard, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Radar,
    title: "Live Tracking",
    body: "Real-time vehicle location",
  },
  {
    icon: Route,
    title: "Smart Routes",
    body: "Dynamic routing & ETA updates",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    body: "Notifications for parents, drivers and organizations",
  },
  {
    icon: LayoutDashboard,
    title: "Multiple Dashboards",
    body: "Parent, Driver & Organization portals",
  },
  {
    icon: ShieldCheck,
    title: "Enhanced Safety",
    body: "Safer and more accountable journeys",
  },
];

export default function FeatureStrip() {
  return (
    <div className="container-px relative z-20 -mt-4 sm:-mt-6">
      <div className="mx-auto grid grid-cols-1 divide-y divide-taupe rounded-2xl border border-taupe bg-white shadow-[0_8px_30px_rgba(16,32,39,0.06)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:max-w-6xl lg:grid-cols-5">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-apricot">
              <Icon size={19} strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-charcoal">
                {title}
              </p>
              <p className="mt-1 text-xs text-charcoal/60">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}