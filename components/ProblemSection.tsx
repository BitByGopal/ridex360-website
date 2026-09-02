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

export default function ProblemSection() {
  return (
    <section className="section container-px">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Transportation shouldn&apos;t depend on phone calls and guesswork.
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
              className="rounded-xl border border-taupe/60 bg-white/60 p-4 text-sm text-charcoal/80"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 font-display text-2xl text-apricot">
        RideX360 connects the entire journey.
      </p>
    </section>
  );
}

function FragmentedFlow() {
  return (
    <div className="mt-10 flex flex-col gap-2 text-sm text-charcoal/60">
      <FlowNode label="Organization" />
      <FlowArrow />
      <FlowNode label="Driver" />
      <FlowArrow bidirectional />
      <FlowNode label="Passenger" />
      <FlowArrow bidirectional />
      <FlowNode label="Parent" />
    </div>
  );
}

function FlowNode({ label }: { label: string }) {
  return (
    <div className="w-fit rounded-full border border-charcoal/15 bg-white px-4 py-1.5">
      {label}
    </div>
  );
}

function FlowArrow({ bidirectional }: { bidirectional?: boolean }) {
  return (
    <div className="pl-6 text-charcoal/30">{bidirectional ? "↕" : "↓"}</div>
  );
}
