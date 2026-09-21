"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#company" },
  { label: "Contact", href: "#demo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "border-b border-taupe shadow-sm" : "border-b border-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between py-3">
        <a href="#home" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="RideX360 — Smart Mobility. Safer Journeys."
            width={160}
            height={160}
            priority
            className="h-12 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-charcoal/80 transition-colors hover:text-apricot"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#demo" className="btn-primary">
            Get Started →
          </a>
        </div>

        <button
          className="text-charcoal md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-taupe bg-white md:hidden">
          <ul className="container-px flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-charcoal/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a href="#demo" className="btn-primary block text-center">
                Get Started →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}