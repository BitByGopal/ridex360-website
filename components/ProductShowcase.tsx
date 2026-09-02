const stats = [
  { label: "Total Vehicles", value: "128" },
  { label: "Active Vehicles", value: "112" },
  { label: "Passengers", value: "2,450" },
  { label: "Today's Trips", value: "325" },
  { label: "Active Alerts", value: "3" },
];

export default function ProductShowcase() {
  return (
    <section className="section container-px bg-white/50">
      <div className="max-w-xl">
        <p className="eyebrow">Product</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          A dashboard built for daily operations.
        </h2>
        <p className="mt-4 text-sm text-charcoal/55">
          Demonstration data shown for illustration.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-taupe/60 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-linen p-4">
              <p className="font-display text-2xl text-charcoal">{s.value}</p>
              <p className="mt-1 text-xs text-charcoal/55">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-4 h-64 overflow-hidden rounded-xl bg-taupe/30 sm:h-80">
          <svg viewBox="0 0 600 300" className="h-full w-full" aria-hidden="true">
            <path
              d="M20 220 Q150 160 260 200 T580 180"
              stroke="#B7694A"
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            />
            <circle cx="260" cy="200" r="6" fill="#B7694A" />
            <circle cx="420" cy="150" r="6" fill="#2E2521" />
          </svg>
          <div className="absolute left-4 top-4 rounded-lg border border-taupe/60 bg-white/95 px-4 py-2.5 text-xs shadow-sm">
            <p className="font-medium text-charcoal">Bus 12 — Route A</p>
            <p className="mt-0.5 text-apricot">Arriving in 7 min</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Driver App", body: "Assigned route and stop status." },
          { title: "Parent App", body: "Live location and ETA for a child's ride." },
          { title: "Passenger App", body: "Assigned stop and journey notifications." },
        ].map((m) => (
          <div key={m.title} className="card">
            <h3 className="font-display text-lg text-charcoal">{m.title}</h3>
            <p className="mt-2 text-sm text-charcoal/65">{m.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
