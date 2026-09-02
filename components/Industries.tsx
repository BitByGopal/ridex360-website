import {
  GraduationCap,
  Building2,
  Cross,
  Factory,
  Hotel,
  School,
  Warehouse,
} from "lucide-react";

const industries = [
  { icon: School, name: "Schools", line: "Safer student transportation." },
  { icon: GraduationCap, name: "Colleges", line: "Connected campus mobility." },
  { icon: Building2, name: "Companies", line: "Smarter employee transportation." },
  { icon: Cross, name: "Hospitals", line: "Reliable staff transportation." },
  { icon: Factory, name: "Factories", line: "Efficient workforce mobility." },
  { icon: Hotel, name: "Hotels", line: "Seamless employee transport." },
  { icon: Warehouse, name: "Industrial Campuses", line: "Connected workforce journeys." },
];

export default function Industries() {
  return (
    <section id="industries" className="section container-px">
      <div className="max-w-xl">
        <p className="eyebrow">Industries</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          Built for organizations that move people.
        </h2>
        <p className="mt-5 text-charcoal/70">
          Schools are an important use case — but RideX360 is built as a
          broader organizational transportation platform.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map(({ icon: Icon, name, line }) => (
          <a
            key={name}
            href="#demo"
            className="group card flex flex-col justify-between transition-shadow hover:shadow-[0_4px_16px_rgba(46,37,33,0.08)]"
          >
            <div>
              <Icon size={22} className="text-apricot" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-lg text-charcoal">
                {name}
              </h3>
              <p className="mt-2 text-sm text-charcoal/65">{line}</p>
            </div>
            <span className="mt-5 text-sm font-medium text-apricot group-hover:underline">
              Learn more
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
