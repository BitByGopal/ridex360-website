import DemoForm from "./DemoForm";
import { CheckCircle2, Radar, Gauge } from "lucide-react";

const benefits = [
  "See live tracking in action",
  "Explore smart routing and safety tools",
  "Understand how RideX360 fits your organization",
];

export default function DemoSection() {
  return (
    <section id="demo" className="section container-px">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        {/* Left: pitch + benefits + visual */}
        <div>
          <p className="eyebrow">Request a demo</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Let&apos;s make transportation smarter.
          </h2>
          <p className="mt-4 max-w-md text-charcoal/70">
            Tell us about your organization and we&apos;ll show you how
            RideX360 can transform your transportation operations.
          </p>

          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-charcoal/75">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-apricot" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-sm rounded-2xl border border-taupe bg-brand-soft/40 p-5">
            <p className="text-xs text-charcoal/50">Organization Dashboard</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-charcoal shadow-sm">
              <Radar size={14} className="text-apricot" />
              112 active vehicles
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-charcoal shadow-sm">
              <Gauge size={14} className="text-apricot" />
              Bus 13 · Arrives in 5 min
            </div>
          </div>
        </div>

        {/* Right: existing form, untouched */}
        <div>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}