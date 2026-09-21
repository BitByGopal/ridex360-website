import { Users, Bus, MapPin } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "People",
    body: "Parents, passengers, employees and students stay informed.",
  },
  {
    icon: Bus,
    title: "Vehicles",
    body: "Organizations know where vehicles are and what is happening.",
  },
  {
    icon: MapPin,
    title: "Places",
    body: "Routes, stops and destinations stay connected.",
  },
];

export default function WhyRideX360Section() {
  return (
    <section className="section container-px bg-brand-soft/40">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Why RideX360</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          Built Around the Journey.
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-3xl">
        <svg
          viewBox="0 0 700 60"
          className="absolute left-0 right-0 top-9 hidden w-full sm:block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 90 10 Q 250 60 350 10 T 610 10"
            stroke="#087F5B"
            strokeOpacity="0.35"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-taupe bg-white text-apricot shadow-sm">
                <Icon size={26} strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-charcoal">
                {title}
              </h3>
              <p className="mt-2 max-w-[16rem] text-sm text-charcoal/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}