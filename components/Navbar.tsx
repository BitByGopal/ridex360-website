"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solution" },
  { label: "Industries", href: "#industries" },
  { label: "Platform", href: "#platform" },
  { label: "Company", href: "#company" },
  { label: "Resources", href: "#resources" },
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
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-linen/90 backdrop-blur border-b border-taupe/60" : "bg-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between py-4">
        <a href="#home" className="flex flex-col leading-tight">
          <span className="font-display text-xl text-charcoal">RideX360</span>
          <span className="text-[11px] text-charcoal/60">
            Smart Mobility. Safer Journeys.
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-charcoal/80 transition-colors hover:text-apricot"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#login" className="text-sm text-charcoal/80 hover:text-apricot">
            Login
          </a>
          <a href="#demo" className="btn-primary">
            Request a Demo
          </a>
        </div>

        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-taupe/60 bg-linen md:hidden">
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
            <li className="mt-2 flex gap-3">
              <a href="#login" className="btn-secondary flex-1">
                Login
              </a>
              <a href="#demo" className="btn-primary flex-1">
                Request a Demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
