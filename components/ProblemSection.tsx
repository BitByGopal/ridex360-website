"use client";

import { useState, Fragment } from "react";
import {
  Eye,
  Clock,
  Link2,
  ShieldCheck,
  ChevronDown,
  Building2,
  Car,
  Users,
  UserRound,
} from "lucide-react";

const highlights = [
  { icon: Eye, problem: "No visibility", solution: "Real-time tracking" },
  { icon: Clock, problem: "Uncertain arrival times", solution: "Dynamic ETA" },
  { icon: Link2, problem: "Manual coordination", solution: "Connected platform" },
  { icon: ShieldCheck, problem: "Safety concerns", solution: "Live safety monitoring" },
];

const fullProblems = [
  "Limited visibility into active vehicles",
  "Parents and passengers unsure when transportation will arrive",
  "Drivers dealing with changing routes",
  "Manual communication between drivers and passengers",
  "Difficult handling of cancellations and no-shows",
  "Driver replacement challenges",
  "Route delays caused by traffic",
  "Fragmented transportation information",
];

const flowNodes = [
  { icon: Building2, label: "Organization" },
  { icon: Car, label: "Driver" },
  { icon: Users, label: "Passenger" },
  { icon: UserRound, label: "Parent" },
];

export default function ProblemSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section container-px">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-16">
        {/* Left: intro */}
        <div>
          <p className="eyebrow">Why RideX360</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Transportation shouldn&apos;t depend on phone calls and
            guesswork.
          </h2>
          <p className="mt-4 max-w-md text-charcoal/70">
            Many organizations run transportation through scattered phone
            calls and manual coordination. Here&apos;s how RideX360 changes
            that.
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-apricot"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
            {expanded ? "Show less" : "See how we solve it →"}
          </button>
        </div>

        {/* Right: compact problem → solution stack */}
        <div className="flex flex-col gap-3">
          {highlights.map(({ icon: Icon, problem, solution }) => (
            <div
              key={problem}
              className="flex items-center gap-4 rounded-xl border border-taupe bg-white p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-apricot">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div className="text-sm">
                <p className="text-charcoal/50 line-through decoration-charcoal/30">
                  {problem}
                </p>
                <p className="font-semibold text-charcoal">{solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expanded && (
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h3 className="font-display text-xl font-bold text-charcoal">
                Every connection, today, usually means a separate phone call.
              </h3>

              <div className="mt-6 rounded-2xl border border-taupe bg-white p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {flowNodes.map(({ icon: Icon, label }, i) => (
                    <Fragment key={label}>
                      <div className="flex items-center gap-2 rounded-full border border-taupe bg-brand-soft px-3 py-1.5 text-sm font-medium text-charcoal">
                        <Icon size={14} className="text-apricot" />
                        {label}
                      </div>
                      {i < flowNodes.length - 1 && (
                        <span className="text-sm text-apricot/50" aria-hidden="true">
                          {i === 0 ? "→" : "↔"}
                        </span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {fullProblems.map((p) => (
                <li
                  key={p}
                  className="rounded-xl border border-taupe bg-white p-4 text-sm text-charcoal/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-center font-display text-2xl font-bold text-apricot">
            RideX360 connects the entire journey.
          </p>
        </div>
      )}
    </section>
  );
}