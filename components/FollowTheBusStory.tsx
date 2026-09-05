"use client";

import { useEffect, useRef, useState } from "react";
import { Bus, UserCheck, RefreshCw, Clock, ShieldCheck } from "lucide-react";

type Step = {
  time: string;
  title: string;
  description: string;
  t: number; // 0-1 position along the path
  icon: typeof Bus;
};

const steps: Step[] = [
  {
    time: "7:40 AM",
    title: "Bus leaves the depot",
    description: "Route A begins its morning run, right on schedule.",
    t: 0,
    icon: Bus,
  },
  {
    time: "7:52 AM",
    title: "First stop, first boarding",
    description: "A student boards — their parent gets notified instantly.",
    t: 0.28,
    icon: UserCheck,
  },
  {
    time: "8:01 AM",
    title: "Route adjusts in real time",
    description: "A road closure is detected; the route recalculates automatically.",
    t: 0.52,
    icon: RefreshCw,
  },
  {
    time: "8:08 AM",
    title: "ETA updates live",
    description: "Families and staff see the new arrival time as it changes.",
    t: 0.75,
    icon: Clock,
  },
  {
    time: "8:15 AM",
    title: "Safe arrival at school",
    description: "Boarding is confirmed and the safety check completes.",
    t: 1,
    icon: ShieldCheck,
  },
];

const VIEW_W = 520;
const VIEW_H = 520;
const PATH_D =
  "M 60 460 C 160 460 120 340 220 320 S 340 220 300 140 S 420 40 460 60";

export default function FollowTheBusStory() {
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [busPos, setBusPos] = useState<{ x: number; y: number } | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const point = path.getPointAtLength(steps[activeStep].t * total);
    setBusPos({ x: point.x, y: point.y });
  }, [activeStep]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"));
            if (!Number.isNaN(idx)) setActiveStep(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section container-px bg-white/50" aria-label="Follow one bus, start to finish">
      <div className="max-w-xl">
        <p className="eyebrow">A morning, in real time</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          Follow one bus, start to finish.
        </h2>
        <p className="mt-4 max-w-md text-charcoal/70">
          Scroll to follow Bus 12's actual morning route — and see what
          RideX360 shows each person along the way.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Sticky visual */}
        <div className="order-1 lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-taupe/60 bg-linen/60 shadow-[0_4px_24px_rgba(46,37,33,0.08)]">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="h-full w-full"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="#D8C8BC"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={PATH_D}
                fill="none"
                stroke="#B7694A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 - steps[activeStep].t * 1000}
                style={{ transition: "stroke-dashoffset 0.7s ease-in-out" }}
              />

              {steps.map((step, i) => {
                const path = pathRef.current;
                if (!path) return null;
                const total = path.getTotalLength();
                const point = path.getPointAtLength(step.t * total);
                return (
                  <circle
                    key={step.title}
                    cx={point.x}
                    cy={point.y}
                    r={i === activeStep ? 7 : 5}
                    fill={i <= activeStep ? "#B7694A" : "#D8C8BC"}
                    style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
                  />
                );
              })}

              {busPos && (
                <g
                  transform={`translate(${busPos.x}, ${busPos.y})`}
                  style={{ transition: "transform 0.7s ease-in-out" }}
                >
                  <circle r="14" fill="#2E2521" />
                  <rect x="-7" y="-5" width="14" height="10" rx="2" fill="#F0EAE2" />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-taupe/60 bg-white px-4 py-3">
            {(() => {
              const ActiveIcon = steps[activeStep].icon;
              return <ActiveIcon size={18} className="shrink-0 text-apricot" />;
            })()}
            <div>
              <p className="text-xs text-charcoal/50">{steps[activeStep].time}</p>
              <p className="text-sm font-medium text-charcoal">
                {steps[activeStep].title}
              </p>
            </div>
          </div>
        </div>

        {/* Scrolling steps */}
        <div className="order-2 flex flex-col gap-[18vh] py-[8vh]">
          {steps.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-step-index={i}
              className={`flex min-h-[30vh] flex-col justify-center transition-opacity duration-500 ${
                i === activeStep ? "opacity-100" : "opacity-40"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-apricot">
                {step.time}
              </p>
              <h3 className="mt-2 font-display text-2xl text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-charcoal/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}