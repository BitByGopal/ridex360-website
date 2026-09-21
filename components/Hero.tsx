import Image from "next/image";
import { Radar, Route, Bell } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[640px] overflow-hidden bg-white sm:min-h-[680px] lg:min-h-[740px]"
    >
      {/* Full-bleed visual, extends to the right edge of the viewport — not a boxed card */}
      <div className="absolute right-0 top-0 z-0 hidden h-[640px] w-[64%] sm:h-[680px] lg:block lg:h-[740px]">
        <Image
          src="/images/hero-visual.png"
          alt="RideX360 bus on the road with a phone showing live bus tracking — Bus 13, on route, next stop Green Park, ETA 5 minutes"
          fill
          priority
          sizes="64vw"
          className="object-cover object-[30%_center]"
        />
        {/* Soft white-to-transparent fade so the visual blends into the text area rather than ending in a hard edge */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      {/* Translucent green 360°/route arcs, echoing the logo's motif */}
      <svg
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[520px] w-[520px] lg:block"
        viewBox="0 0 500 500"
        aria-hidden="true"
      >
        <circle
          cx="250"
          cy="250"
          r="230"
          fill="none"
          stroke="#087F5B"
          strokeOpacity="0.12"
          strokeWidth="26"
          strokeDasharray="720 1500"
        />
        <circle
          cx="250"
          cy="250"
          r="180"
          fill="none"
          stroke="#3FAF70"
          strokeOpacity="0.14"
          strokeWidth="18"
          strokeDasharray="520 1200"
          transform="rotate(40 250 250)"
        />
      </svg>

      <div className="container-px relative z-10 grid gap-10 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:pb-32">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-apricot">
            Track &middot; Connect &middot; Move Safer
          </p>

          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-charcoal sm:text-5xl lg:text-[3.4rem]">
            Smarter Transportation
            <br />
            for a{" "}
            <span className="text-apricot">Safer Tomorrow</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-charcoal/70">
            Real-time tracking, smart route management and seamless
            communication — all in one platform. RideX360 keeps people,
            vehicles and places always connected.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#demo" className="btn-primary">
              Get Started →
            </a>
            <a href="#platform" className="btn-secondary">
              Explore RideX360 →
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-charcoal/70">
            <li className="flex items-center gap-2">
              <Radar size={16} className="text-apricot" /> Live Tracking
            </li>
            <li className="flex items-center gap-2">
              <Route size={16} className="text-apricot" /> Smart Routes
            </li>
            <li className="flex items-center gap-2">
              <Bell size={16} className="text-apricot" /> Real-Time Alerts
            </li>
          </ul>
        </div>

        {/* Mobile/tablet: the visual moves below the text as a normal contained image,
            since the edge-bleed treatment only makes sense at full desktop width */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:hidden">
          <Image
            src="/images/hero-visual.png"
            alt="RideX360 bus on the road with a phone showing live bus tracking — Bus 13, on route, next stop Green Park, ETA 5 minutes"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}