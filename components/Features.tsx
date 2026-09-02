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
} from "lucide-react";

const features = [
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
    icon: Bell,
    title: "Alerts & Notifications",
    body: "Keep relevant users informed about delays and changes.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    body: "Give organizations insight into transportation operations.",
  },
];

export default function Features() {
  return (
    <section className="section container-px">
      <div className="max-w-xl">
        <p className="eyebrow">Core capabilities</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          Everything you need to manage transportation.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card">
            <Icon size={20} className="text-apricot" strokeWidth={1.75} />
            <h3 className="mt-4 font-display text-lg text-charcoal">
              {title}
            </h3>
            <p className="mt-2 text-sm text-charcoal/65">{body}</p>
          </div>
        ))}
      </div>

      <ETAHighlight />
      <RouteChangeFlow />
    </section>
  );
}

function ETAHighlight() {
  return (
    <div className="mt-16 grid gap-10 rounded-2xl border border-taupe/60 bg-white p-8 lg:grid-cols-2 lg:items-center">
      <div>
        <h3 className="font-display text-2xl text-charcoal">
          ETA is calculated, not guessed.
        </h3>
        <p className="mt-3 text-sm text-charcoal/65">
          RideX360 calculates ETA using real-time vehicle location, the
          current route, remaining stops and traffic conditions — updating as
          the journey changes. Figures shown here are simulated for
          demonstration.
        </p>
      </div>
      <div className="w-full max-w-xs justify-self-start rounded-xl border border-taupe/60 bg-linen p-5 lg:justify-self-end">
        <p className="text-xs text-charcoal/50">Bus 12 · Route A</p>
        <p className="mt-1 text-sm text-charcoal/70">1.8 km away</p>
        <p className="mt-3 font-display text-2xl text-charcoal">7 min away</p>
        <p className="text-xs text-apricot">Arrives at 8:15 AM</p>
      </div>
    </div>
  );
}

const routeSteps = [
  "Passenger cancels",
  "Stop becomes unnecessary",
  "Route recalculated",
  "Driver receives updated route",
  "ETA recalculated",
  "Relevant passengers receive updated information",
];

function RouteChangeFlow() {
  return (
    <div className="mt-8">
      <h3 className="font-display text-2xl text-charcoal">
        Transportation changes in the real world. Your system should adapt.
      </h3>
      <p className="mt-2 max-w-lg text-sm text-charcoal/65">
        An intended platform workflow for handling change without breaking
        the journey.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {routeSteps.map((step, i) => (
          <li
            key={step}
            className="flex items-start gap-3 rounded-xl border border-taupe/60 bg-white/60 p-4 text-sm text-charcoal/80"
          >
            <span className="mt-0.5 shrink-0 text-apricot">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
