"use client";

import { useState } from "react";
import {
  GraduationCap,
  Building2,
  Cross,
  Factory,
  Hotel,
  School,
  Warehouse,
  ChevronDown,
} from "lucide-react";

const industries = [
  { icon: School, name: "Schools", line: "Ensure students' safety every mile." },
  { icon: Building2, name: "Companies", line: "Track employee transportation." },
  { icon: GraduationCap, name: "Colleges", line: "Connected campus mobility." },
  { icon: Cross, name: "Hospitals", line: "Reliable staff & patient transport." },
  { icon: Factory, name: "Factories", line: "Efficient workforce transport." },
  { icon: Hotel, name: "Hotels", line: "Seamless guest transportation." },
  { icon: Warehouse, name: "Industrial Campuses", line: "Connected workforce journeys." },
];

const INITIAL_COUNT = 4;

export default function Industries() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? industries : industries.slice(0, INITIAL_COUNT);

  return (
    <section className="section container-px bg-brand-soft/50">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/45">
            Built for every organization
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Reliable Transport Solutions
            <br />
            <span className="text-apricot">Across Industries</span>
          </h2>
          <p className="mt-4 max-w-sm text-charcoal/70">
            From schools to companies, RideX360 adapts to your transportation
            needs with powerful tools and real-time insights.
          </p>
          <a href="#solution" className="btn-primary mt-6 inline-flex">
            Explore Solutions →
          </a>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map(({ icon: Icon, name, line }) => (
              <div
                key={name}
                className="group flex flex-col justify-between rounded-2xl border border-taupe bg-white p-5 shadow-[0_1px_2px_rgba(16,32,39,0.04)] transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-apricot">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-charcoal">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/60">{line}</p>
                </div>
                <span className="mt-4 flex h-7 w-7 items-center justify-center self-end rounded-full border border-taupe text-apricot transition-colors group-hover:border-apricot group-hover:bg-apricot group-hover:text-white">
                  →
                </span>
              </div>
            ))}
          </div>

          {industries.length > INITIAL_COUNT && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="mx-auto mt-6 flex items-center gap-1.5 text-sm font-medium text-apricot"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${showAll ? "rotate-180" : ""}`}
              />
              {showAll ? "Show fewer industries" : "View all industries"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}