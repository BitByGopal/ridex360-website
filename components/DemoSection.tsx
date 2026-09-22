import BookingFlow from "./BookingFlow";
import { CheckCircle2, Clock, Video } from "lucide-react";

const benefits = [
  "Live tracking walkthrough",
  "Smart routing & ETA",
  "Safety & management tools",
];

export default function DemoSection() {
  return (
    <section id="demo" className="section container-px">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        {/* Left: meeting info */}
        <div>
          <p className="eyebrow">Request a demo</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-charcoal sm:text-3xl">
            RideX360 Product Demo
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-charcoal/60">
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> 30 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Video size={15} /> Online meeting
            </span>
          </div>

          <p className="mt-5 max-w-md text-charcoal/70">
            See how RideX360 helps organizations manage vehicles, routes,
            drivers, passengers and real-time transportation visibility from
            one connected platform.
          </p>

          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-charcoal/75">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-apricot" />
                {b}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 hidden aspect-[4/3] max-w-sm overflow-hidden rounded-2xl border border-taupe bg-brand-soft/40 sm:block">
            <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden="true">
              <circle
                cx="160"
                cy="120"
                r="100"
                fill="none"
                stroke="#087F5B"
                strokeOpacity="0.15"
                strokeWidth="18"
                strokeDasharray="260 400"
              />
              <path
                d="M40 190 C 100 180 120 120 180 110 S 260 70 280 40"
                stroke="#087F5B"
                strokeOpacity="0.4"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="180" cy="110" r="6" fill="#087F5B" />
            </svg>
            <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-xs font-medium text-charcoal shadow-sm">
              Bus 13 · Arrives in 5 min
            </div>
          </div>
        </div>

        {/* Right: booking flow */}
        <div>
          <BookingFlow />
        </div>
      </div>
    </section>
  );
}