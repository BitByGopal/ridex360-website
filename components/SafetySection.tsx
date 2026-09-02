import {
  Eye,
  CheckCircle2,
  AlertTriangle,
  Siren,
  UserCheck,
  BadgeCheck,
  Bus,
  History,
  ClipboardCheck,
} from "lucide-react";

const items = [
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
  return (
    <section className="section container-px bg-charcoal text-linen">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-apricot">Safety</p>
        <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          Safety shouldn&apos;t stop at the bus door.
        </h2>
        <p className="mt-5 text-linen/70">
          For school use cases especially, RideX360 is built around
          verifiable, visible safety — not just tracking.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-linen/15 bg-linen/5 p-4 text-sm"
          >
            <Icon size={18} className="shrink-0 text-apricot" strokeWidth={1.75} />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
