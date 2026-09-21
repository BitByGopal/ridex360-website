const stops = [
  { label: "START", sub: "Depot" },
  { label: "STOP 01", sub: "Maple Apartments" },
  { label: "STOP 02", sub: "Riverside Colony" },
  { label: "STOP 03", sub: "Lakeside Residency" },
  { label: "DESTINATION", sub: "Green Valley School" },
];

export default function SmartRoutingSection() {
  return (
    <section className="section container-px bg-brand-soft/40">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Smart Routing</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          Routes That Adapt to Reality.
        </h2>
        <p className="mt-4 text-charcoal/70">
          RideX360 helps organizations manage changing routes, stops,
          passengers and vehicle movement as the day unfolds.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-md sm:max-w-2xl">
        {/* Mobile: vertical flow */}
        <ol className="flex flex-col gap-0 sm:hidden">
          {stops.map((s, i) => (
            <li key={s.label} className="relative flex gap-4 pb-8 last:pb-0">
              {i < stops.length - 1 && (
                <span
                  className="absolute left-[15px] top-8 h-full w-0.5 bg-apricot/30"
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  i === 0 || i === stops.length - 1
                    ? "border-apricot bg-apricot text-white"
                    : "border-apricot bg-white text-apricot"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-apricot">
                  {s.label}
                </p>
                <p className="text-sm text-charcoal/70">{s.sub}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: horizontal flow */}
        <div className="relative hidden sm:flex sm:items-start sm:justify-between">
          <span
            className="absolute left-0 right-0 top-[15px] h-0.5 bg-apricot/30"
            aria-hidden="true"
          />
          {stops.map((s, i) => (
            <div key={s.label} className="relative z-10 flex flex-col items-center text-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  i === 0 || i === stops.length - 1
                    ? "border-apricot bg-apricot text-white"
                    : "border-apricot bg-white text-apricot"
                }`}
              >
                {i + 1}
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-apricot">
                {s.label}
              </p>
              <p className="mt-1 max-w-[7rem] text-xs text-charcoal/60">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}