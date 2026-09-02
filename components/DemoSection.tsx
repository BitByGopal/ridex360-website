import DemoForm from "./DemoForm";

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

      <div className="mt-12">
        <DemoForm />
      </div>
    </section>
  );
}
