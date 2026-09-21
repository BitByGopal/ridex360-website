import { Fragment } from "react";
import { Building2, Car, Users, UserRound } from "lucide-react";

const problems = [
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
  return (
    <section className="section container-px">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Transportation shouldn&apos;t depend on phone calls and
            guesswork.
          </h2>
          <p className="mt-5 max-w-md text-charcoal/70">
            Many organizations run transportation through scattered phone
            calls and manual coordination. These are some of the common
            challenges teams face — not every organization experiences all
            of them.
          </p>

          <FragmentedFlow />
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {problems.map((p) => (
            <li
              key={p}
              className="rounded-xl border border-taupe bg-white p-4 text-sm text-charcoal/80"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 font-display text-2xl font-bold text-apricot">
        RideX360 connects the entire journey.
      </p>
    </section>
  );
}

function FragmentedFlow() {
  return (
    <div className="mt-8 rounded-2xl border border-taupe bg-white p-5">
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
      <p className="mt-3 text-xs text-charcoal/50">
        Today, each connection usually means a separate phone call.
      </p>
    </div>
  );
}