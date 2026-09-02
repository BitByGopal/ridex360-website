import { ShieldCheck, Radar, Gauge } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-px grid gap-16 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-28">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl">
            Intelligent transport.
            <br />
            Safer journeys.
            <br />
            Complete visibility.
          </h1>

          <p className="mt-6 max-w-md text-lg text-charcoal/70">
            RideX360 brings organizations, drivers and passengers together
            through one connected transportation platform — helping teams
            manage journeys with greater visibility, safety and efficiency.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#demo" className="btn-primary">
              Request a Demo
            </a>
            <a href="#platform" className="btn-secondary">
              Explore Platform
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-charcoal/70">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-apricot" /> Built for Safety
            </li>
            <li className="flex items-center gap-2">
              <Radar size={16} className="text-apricot" /> Real-time Visibility
            </li>
            <li className="flex items-center gap-2">
              <Gauge size={16} className="text-apricot" /> Designed for Efficiency
            </li>
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Road / city backdrop */}
      <div className="absolute inset-0 rounded-[2rem] bg-taupe/40" />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M0 300 Q120 260 200 300 T400 290"
          stroke="#B7694A"
          strokeOpacity="0.25"
          strokeWidth="18"
          fill="none"
        />
        <rect x="30" y="40" width="60" height="90" rx="6" fill="#FFFFFF" opacity="0.6" />
        <rect x="110" y="70" width="45" height="60" rx="6" fill="#FFFFFF" opacity="0.5" />
        <rect x="300" y="50" width="55" height="80" rx="6" fill="#FFFFFF" opacity="0.5" />

        {/* Bus */}
        <g transform="translate(120,220)">
          <rect x="0" y="0" width="150" height="60" rx="14" fill="#2E2521" />
          <rect x="10" y="10" width="30" height="20" rx="3" fill="#F0EAE2" />
          <rect x="48" y="10" width="30" height="20" rx="3" fill="#F0EAE2" />
          <rect x="86" y="10" width="30" height="20" rx="3" fill="#F0EAE2" />
          <circle cx="30" cy="65" r="12" fill="#2E2521" />
          <circle cx="120" cy="65" r="12" fill="#2E2521" />
          <circle cx="30" cy="65" r="5" fill="#F0EAE2" />
          <circle cx="120" cy="65" r="5" fill="#F0EAE2" />
        </g>
      </svg>

      {/* Dashboard card */}
      <div className="absolute -left-4 bottom-6 w-56 rounded-xl border border-taupe/60 bg-white p-4 shadow-lg sm:-left-8">
        <p className="text-xs text-charcoal/50">Organization Dashboard</p>
        <p className="mt-1 font-display text-2xl text-charcoal">112</p>
        <p className="text-xs text-charcoal/50">Active vehicles</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-taupe/50">
          <div className="h-full w-4/5 rounded-full bg-apricot" />
        </div>
      </div>

      {/* Phone / live tracking card */}
      <div className="absolute -right-2 top-6 w-40 rounded-xl border border-taupe/60 bg-white p-3 shadow-lg sm:-right-6">
        <p className="text-[11px] text-charcoal/50">Bus 12 — Route A</p>
        <p className="mt-1 font-display text-lg text-charcoal">7 min away</p>
        <p className="text-[11px] text-apricot">Arrives 8:15 AM</p>
      </div>
    </div>
  );
}
