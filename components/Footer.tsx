const columns = [
  {
    title: "Solutions",
    links: ["Live Tracking", "Fleet Management", "Route Management", "Safety", "Analytics"],
  },
  {
    title: "Industries",
    links: ["Schools", "Colleges", "Companies", "Hospitals", "Factories", "Hotels", "Industrial Campuses"],
  },
  {
    title: "Platform",
    links: ["Overview", "Features", "Technology", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Mission", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "FAQs", "Support"],
  },
];

const social = ["LinkedIn", "Instagram", "X / Twitter", "YouTube"];

export default function Footer() {
  return (
    <footer className="border-t border-taupe/60 bg-linen">
      <div className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-display text-xl text-charcoal">RideX360</p>
            <p className="mt-1 text-sm text-charcoal/60">
              Smart Mobility. Safer Journeys.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-charcoal">{col.title}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-charcoal/60 hover:text-apricot">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-taupe/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal/50">
            © {new Date().getFullYear()} RideX360. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-charcoal/60">
            <a href="#" className="hover:text-apricot">Privacy Policy</a>
            <a href="#" className="hover:text-apricot">Terms of Service</a>
          </div>
          <div className="flex gap-4 text-xs text-charcoal/60">
            {social.map((s) => (
              <a key={s} href="#" className="hover:text-apricot">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
