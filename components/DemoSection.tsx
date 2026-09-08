import DemoForm from "./DemoForm";

const steps = [
  { n: "1", label: "We reply within 24 hours" },
  { n: "2", label: "A short call about your fleet" },
  { n: "3", label: "A live, personalized walkthrough" },
];

export default function DemoSection() {
  return (
    <section id="demo" className="section container-px">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Request a demo</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          Tell us about your organization.
        </h2>
        <p className="mt-4 text-charcoal/70">
          We&apos;ll reach out to set up a walkthrough tailored to your
          transportation needs.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {steps.map((s) => (
          <div key={s.n} className="flex items-center gap-2 text-sm text-charcoal/70">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-taupe/60 bg-white text-xs font-semibold text-apricot">
              {s.n}
            </span>
            {s.label}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <DemoForm />
      </div>
    </section>
  );
}