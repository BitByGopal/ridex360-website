export default function AboutCompany() {
  return (
    <section id="company" className="section container-px">
      <div className="grid gap-10 lg:grid-cols-2">
        <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          Moving people is more than transportation.
        </h2>
        <div className="max-w-md text-charcoal/70">
          <p>
            RideX360 is being built to make organizational transportation
            more connected, visible and dependable.
          </p>
          <p className="mt-5 font-display text-xl text-charcoal">
            Mission
          </p>
          <p className="mt-2">
            To make everyday transportation safer, smarter and easier to
            manage.
          </p>

          <div className="mt-6 rounded-xl border-l-2 border-apricot bg-linen/60 py-3 pl-4 text-sm italic text-charcoal/70">
            &quot;We&apos;re building RideX360 because we&apos;ve seen
            firsthand how much manual effort goes into keeping transportation
            safe and visible — this platform is our answer to that.&quot;
            <span className="mt-2 block not-italic font-medium text-charcoal">
              — Founder, RideX360
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}