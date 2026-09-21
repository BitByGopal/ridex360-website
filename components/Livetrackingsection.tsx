import { Circle, Navigation } from "lucide-react";

export default function LiveTrackingSection() {
  return (
    <section id="tracking" className="section container-px">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Live Tracking</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          Know Where Every Vehicle Is.
        </h2>
        <p className="mt-4 text-charcoal/70">
          A real-time view of every route, stop and vehicle — built into the
          organization dashboard, not bolted on as an afterthought.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-taupe bg-white shadow-[0_8px_40px_rgba(16,32,39,0.08)]">
        <svg
          viewBox="0 0 900 460"
          className="h-auto w-full"
          role="img"
          aria-label="Map showing a live route with stops, current vehicle location and destination"
        >
          <defs>
            <pattern id="tracking-grid" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.4" cy="1.4" r="1.4" fill="#DDEBE4" />
            </pattern>
          </defs>
          <rect width="900" height="460" fill="#F7FBF9" />
          <rect width="900" height="460" fill="url(#tracking-grid)" />

          <path
            d="M60 380 C 200 380 220 260 340 240 S 480 160 460 100 S 620 60 700 120 S 800 260 820 340"
            stroke="#DDEBE4"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M60 380 C 200 380 220 260 340 240 S 480 160 460 100"
            stroke="#087F5B"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* stop markers */}
          <circle cx="60" cy="380" r="8" fill="#102027" />
          <circle cx="340" cy="240" r="7" fill="#087F5B" />
          <circle cx="700" cy="120" r="7" fill="#DDEBE4" stroke="#087F5B" strokeWidth="2" />
          <circle cx="820" cy="340" r="8" fill="#DDEBE4" stroke="#102027" strokeWidth="2" />

          {/* current vehicle position */}
          <g transform="translate(460, 100)">
            <circle r="16" fill="#087F5B" opacity="0.15" />
            <circle r="10" fill="#087F5B" />
            <rect x="-5" y="-4" width="10" height="8" rx="2" fill="#FFFFFF" />
          </g>
        </svg>

        {/* floating info card */}
        <div className="absolute left-4 top-4 rounded-xl border border-taupe bg-white/95 px-4 py-3 shadow-md sm:left-8 sm:top-8">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-charcoal">Bus 13</p>
            <span className="flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-apricot">
              <Circle size={6} className="fill-apricot text-apricot" /> On Route
            </span>
          </div>
          <div className="mt-2 flex gap-6 text-xs">
            <div>
              <p className="text-charcoal/50">Next Stop</p>
              <p className="font-medium text-charcoal">Green Park</p>
            </div>
            <div>
              <p className="text-charcoal/50">ETA</p>
              <p className="font-medium text-apricot">5 min</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-charcoal shadow-sm sm:bottom-8 sm:right-8">
          <Navigation size={13} className="text-apricot" /> Destination · Green Valley School
        </div>
      </div>
    </section>
  );
}