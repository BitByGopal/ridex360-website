"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most organizations can be onboarded within a few days once vehicles, drivers and routes are added to the platform.",
  },
  {
    q: "Is our data secure?",
    a: "Data is handled with encryption in transit and at rest, and access is restricted to authorized organization staff.",
  },
  {
    q: "Does RideX360 work with our existing systems?",
    a: "RideX360 is built to fit alongside your current operations — you don't need to replace existing hardware to get started.",
  },
  {
    q: "What does the demo actually involve?",
    a: "A short call to understand your fleet, followed by a live walkthrough of the organization dashboard, driver app and parent/passenger experience.",
  },
  {
    q: "Is there a minimum fleet size?",
    a: "No — RideX360 works for small operations just getting organized as well as larger, multi-vehicle fleets.",
  },
  {
    q: "What's the pricing model?",
    a: "Pricing depends on fleet size and the features you need. Request a demo and we'll walk you through options for your organization.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section container-px" aria-label="Frequently asked questions">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        {/* Left: heading + small visual */}
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Questions organizations ask us.
          </h2>
          <p className="mt-4 max-w-sm text-charcoal/70">
            Everything you need to know before bringing RideX360 to your
            organization.
          </p>

          <div className="relative mt-8 hidden aspect-[4/3] max-w-xs overflow-hidden rounded-2xl border border-taupe bg-brand-soft/40 sm:block">
            <svg
              viewBox="0 0 320 240"
              className="h-full w-full"
              aria-hidden="true"
            >
              <circle
                cx="160"
                cy="120"
                r="100"
                fill="none"
                stroke="#087F5B"
                strokeOpacity="0.15"
                strokeWidth="18"
                strokeDasharray="260 400"
              />
              <path
                d="M60 170 C 110 160 120 110 170 100 S 240 70 250 40"
                stroke="#087F5B"
                strokeOpacity="0.4"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-apricot shadow-sm">
              <MapPin size={22} strokeWidth={1.75} />
            </span>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="divide-y divide-taupe rounded-2xl border border-taupe bg-white">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-charcoal">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-apricot transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-charcoal/70">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}