const columns = [
  {
    title: "Platform",
    links: ["Live Tracking", "Smart Routes", "Alerts", "Dashboards"],
  },
  {
    title: "Solutions",
    links: ["Schools", "Companies", "Colleges", "Hospitals", "Factories", "Hotels"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-taupe bg-white">
      <div className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-display text-xl font-extrabold text-charcoal">
              RideX360
            </p>
            <p className="mt-2 max-w-xs text-sm text-charcoal/60">
              Smart mobility technology connecting people, vehicles and
              places.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-charcoal">
                  {col.title}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-charcoal/60 hover:text-apricot"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-taupe pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal/50">
            © {new Date().getFullYear()} RideX360. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-charcoal/60">
            <a href="#" className="hover:text-apricot">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-apricot">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}