export default function CTA() {
  return (
    <section className="container-px py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center sm:px-16">
        <svg
          viewBox="0 0 800 300"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          aria-hidden="true"
        >
          <path
            d="M-20 220 Q200 140 400 200 T820 160"
            stroke="#B7694A"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <div className="relative">
          <h2 className="font-display text-3xl text-linen sm:text-4xl">
            Ready to move transportation forward?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-linen/70">
            See how RideX360 can help your organization manage transportation
            with greater visibility, safety and efficiency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#demo" className="btn-primary">
              Request a Demo
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-linen/30 px-6 py-3 text-sm font-medium text-linen transition-colors hover:bg-linen/10"
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
