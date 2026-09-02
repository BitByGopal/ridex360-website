import { Users, UserRound, Car, Building2 } from "lucide-react";

const roles = [
  {
    icon: UserRound,
    title: "Parent",
    body: "Track a child's journey and receive important updates.",
  },
  {
    icon: Users,
    title: "Employee / Passenger",
    body: "Track assigned transportation and receive live ETA updates.",
  },
  {
    icon: Car,
    title: "Driver",
    body: "Navigate routes, manage stops and operate assigned journeys.",
  },
  {
    icon: Building2,
    title: "Organization",
    body: "Manage vehicles, routes, drivers, passengers and trips.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="section container-px bg-white/50">
      <div className="max-w-xl">
        <p className="eyebrow">Solution</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          One connected platform for every journey.
        </h2>
        <p className="mt-5 text-charcoal/70">
          RideX360 connects transportation operations into a single
          ecosystem, giving every role the information they need, when they
          need it.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card">
            <Icon size={22} className="text-apricot" strokeWidth={1.75} />
            <h3 className="mt-4 font-display text-lg text-charcoal">
              {title}
            </h3>
            <p className="mt-2 text-sm text-charcoal/65">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
