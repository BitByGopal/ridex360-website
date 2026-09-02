const steps = [
  {
    n: "01",
    title: "Connect",
    body: "Connect your organization, vehicles, drivers and passengers.",
  },
  {
    n: "02",
    title: "Configure",
    body: "Set up routes, stops, schedules and transportation rules.",
  },
  {
    n: "03",
    title: "Operate",
    body: "Drivers operate trips while passengers receive live updates.",
  },
  {
    n: "04",
    title: "Monitor & Optimize",
    body: "Respond to changes and use transportation data to improve operations.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section container-px">
      <div className="max-w-xl">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          From setup to daily operation.
        </h2>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s) => (
          <div key={s.n} className="border-t border-charcoal/15 pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            <span className="font-display text-sm text-apricot">{s.n}</span>
            <h3 className="mt-2 font-display text-xl text-charcoal">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-charcoal/65">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
