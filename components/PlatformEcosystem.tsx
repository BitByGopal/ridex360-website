const layers = [
  {
    title: "Organization Dashboard",
    body: "Vehicles, drivers, passengers, routes, stops, trips, alerts and reports.",
  },
  {
    title: "RideX360 Backend",
    body: "The connected core that keeps every role in sync in real time.",
  },
  {
    title: "Driver Application",
    body: "Assigned routes, navigation, stops, passenger status and safety actions.",
  },
  {
    title: "Parent / Passenger Application",
    body: "Live location, ETA, trip status, notifications and assigned stop.",
  },
];

export default function PlatformEcosystem() {
  return (
    <section id="platform" className="section container-px bg-white/50">
      <div className="max-w-xl">
        <p className="eyebrow">Platform</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          One ecosystem. Four experiences.
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-4 lg:mx-auto lg:max-w-2xl">
        {layers.map((layer, i) => (
          <div key={layer.title}>
            <div className="card">
              <h3 className="font-display text-lg text-charcoal">
                {layer.title}
              </h3>
              <p className="mt-1.5 text-sm text-charcoal/65">{layer.body}</p>
            </div>
            {i < layers.length - 1 && (
              <div className="py-2 pl-6 text-charcoal/25">↓</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
