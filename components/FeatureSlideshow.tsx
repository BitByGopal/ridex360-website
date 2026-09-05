"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Eye,
  Bell,
  Radar,
  Clock,
  ShieldCheck,
  Route,
  MapPin,
  Activity,
  Bus,
  BarChart3,
  Sparkles,
  ClipboardList,
  type LucideProps,
} from "lucide-react";

type Feature = {
  icon: ComponentType<LucideProps>;
  label: string;
};

type Slide = {
  eyebrow: string;
  heading: string;
  description: string;
  features: Feature[];
  cta: string;
  image: string;
  alt: string;
  imageSide: "left" | "right";
};

const slides: Slide[] = [
  {
    eyebrow: "Student Safety",
    heading: "Every boarding, accounted for.",
    description:
      "See every boarding and drop-off in real time, so staff and families always know a child is safe and accounted for.",
    features: [
      { icon: CheckCircle2, label: "Verified boarding" },
      { icon: Eye, label: "Student journey visibility" },
      { icon: Bell, label: "Instant status updates" },
    ],
    cta: "Explore for Schools",
    image: "/images/feature-boarding.png",
    alt: "Students safely boarding a RideX360 school bus with a staff member supervising",
    imageSide: "right",
  },
  {
    eyebrow: "Real-Time Visibility",
    heading: "Parents stay connected to every journey.",
    description:
      "Parents can follow their child's ride from pickup to drop-off, with live location and timely updates along the way.",
    features: [
      { icon: Radar, label: "Live vehicle tracking" },
      { icon: Clock, label: "Real-time ETA" },
      { icon: ShieldCheck, label: "Safety notifications" },
    ],
    cta: "Explore for Parents",
    image: "/images/feature-parents.png",
    alt: "Parents viewing live bus tracking and ETA in the RideX360 app on their phone",
    imageSide: "left",
  },
  {
    eyebrow: "Driver Experience",
    heading: "Everything a driver needs, in one view.",
    description:
      "Drivers get clear route guidance, stop details and live trip updates — all in a single, distraction-free view.",
    features: [
      { icon: Route, label: "Smart route guidance" },
      { icon: MapPin, label: "Stop-by-stop information" },
      { icon: Activity, label: "Real-time trip updates" },
    ],
    cta: "Explore for Drivers",
    image: "/images/feature-driver.png",
    alt: "A driver viewing the RideX360 route and trip dashboard on an in-vehicle tablet",
    imageSide: "right",
  },
  {
    eyebrow: "Operations",
    heading: "One view of the entire operation.",
    description:
      "Organizations get a single dashboard to oversee vehicles, routes and daily operations across their entire fleet.",
    features: [
      { icon: Bus, label: "Fleet visibility" },
      { icon: Route, label: "Route management" },
      { icon: BarChart3, label: "Operational insights" },
    ],
    cta: "Explore for Organizations",
    image: "/images/feature-org.png",
    alt: "An organization admin presenting the RideX360 fleet dashboard on a large screen",
    imageSide: "left",
  },
  {
    eyebrow: "Platform Intelligence",
    heading: "Built for safer, smarter journeys.",
    description:
      "Beyond day-to-day operations, RideX360 brings intelligence to transportation — from route optimization to compliance.",
    features: [
      { icon: Sparkles, label: "AI-powered route optimization" },
      { icon: ClipboardList, label: "Automated reports" },
      { icon: ShieldCheck, label: "Safety & compliance insights" },
    ],
    cta: "Explore the Platform",
    image: "/images/feature-overview.png",
    alt: "Overview of RideX360 platform capabilities including alerts, routing and analytics",
    imageSide: "right",
  },
];

const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD = 40;

export default function FeatureSlideshow() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isHovering]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  }

  const slide = slides[index];
  const imageOnRight = false;

  return (
    <section
      className="section container-px"
      aria-label="RideX360 product showcase"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
    >
      <div
        key={index}
        className="grid animate-[feature-fade-slide_0.6s_ease-out] grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14"
      >
        {/* Image */}
        <div
          className={`relative order-1 ${imageOnRight ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] border border-taupe/60 bg-white shadow-[0_4px_24px_rgba(46,37,33,0.08)]">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 700px, 100vw"
              priority={index === 0}
            />
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-taupe/60 bg-white/90 text-charcoal shadow-sm transition-colors hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-taupe/60 bg-white/90 text-charcoal shadow-sm transition-colors hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={`order-2 ${imageOnRight ? "lg:order-1" : "lg:order-2"}`}>
          <p className="text-xs font-medium uppercase tracking-wide text-apricot">
            {slide.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            {slide.heading}
          </h3>
          <p className="mt-4 max-w-md text-charcoal/70">{slide.description}</p>

          <ul className="mt-6 space-y-3">
            {slide.features.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-charcoal/80"
              >
                <Icon size={18} className="shrink-0 text-apricot" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>

          <a
            href="#demo"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-apricot transition-colors hover:text-apricot-dark"
          >
            {slide.cta}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <span className="text-xs font-medium tabular-nums text-charcoal/50">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.heading}`}
              aria-current={i === index}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-apricot" : "bg-taupe/70 hover:bg-taupe"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}