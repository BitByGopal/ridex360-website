"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { RotateCcw, Play, MapPin, School } from "lucide-react";

type Point = { x: number; y: number };

const VIEW_W = 800;
const VIEW_H = 440;
const MAX_POINTS = 4;
const SIM_DURATION_MS = 4200;
// Purely illustrative scale so the demo shows plausible-looking numbers.
const PX_TO_KM = 0.018;
const KMH_SPEED = 28;

function buildPathD(points: Point[]) {
  if (points.length < 2) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
}

export default function LiveRouteSandbox() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const [points, setPoints] = useState<Point[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [busPos, setBusPos] = useState<Point | null>(null);
  const [progress, setProgress] = useState(0);
  const [totalLengthPx, setTotalLengthPx] = useState(0);

  const canSimulate = points.length >= 2 && !isSimulating;

  const handleClick = useCallback(
    (e: ReactMouseEvent<SVGSVGElement>) => {
      if (isSimulating || points.length >= MAX_POINTS) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = VIEW_W / rect.width;
      const scaleY = VIEW_H / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      setPoints((pts) => [...pts, { x, y }]);
      setIsDone(false);
    },
    [isSimulating, points.length]
  );

  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPoints([]);
    setIsSimulating(false);
    setIsDone(false);
    setBusPos(null);
    setProgress(0);
    startRef.current = null;
  }

  function simulate() {
    const path = pathRef.current;
    if (!path || points.length < 2) return;
    const total = path.getTotalLength();
    setTotalLengthPx(total);
    setIsSimulating(true);
    setIsDone(false);
    startRef.current = null;

    function tick(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(elapsed / SIM_DURATION_MS, 1);
      setProgress(t);
      const point = path!.getPointAtLength(t * total);
      setBusPos({ x: point.x, y: point.y });

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsSimulating(false);
        setIsDone(true);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const totalKm = totalLengthPx * PX_TO_KM;
  const remainingKm = totalKm * (1 - progress);
  const remainingMin = Math.max(
    0,
    Math.round((remainingKm / KMH_SPEED) * 60)
  );

  const pathD = buildPathD(points);

  return (
    <section className="section container-px" aria-label="Live route sandbox">
      <div className="max-w-xl">
        <p className="eyebrow">Try it yourself</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
          See how a route comes together.
        </h2>
        <p className="mt-4 max-w-md text-charcoal/70">
          Click to place a depot, up to two stops, and a school. Then watch
          RideX360 simulate the route and calculate ETA as it drives.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-taupe/60 bg-white shadow-[0_4px_24px_rgba(46,37,33,0.08)]">
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            onClick={handleClick}
            className="aspect-[20/11] w-full cursor-crosshair bg-linen/60"
            role="img"
            aria-label="Interactive route builder canvas. Click to place points."
          >
            {/* faint grid dots for a "map" feel without real map tiles */}
            <defs>
              <pattern
                id="sandbox-grid"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.5" cy="1.5" r="1.5" fill="#D8C8BC" opacity="0.5" />
              </pattern>
            </defs>
            <rect width={VIEW_W} height={VIEW_H} fill="url(#sandbox-grid)" />

            {/* connecting path */}
            {pathD && (
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="#B7694A"
                strokeWidth={isSimulating || isDone ? 3 : 2}
                strokeDasharray={isSimulating || isDone ? undefined : "6 8"}
                strokeLinecap="round"
                opacity={isSimulating || isDone ? 0.9 : 0.5}
              />
            )}

            {/* point markers */}
            {points.map((p, i) => {
              const isLast = i === points.length - 1 && points.length === MAX_POINTS;
              const isSchool = i === points.length - 1 && isDone;
              return (
                <g key={`${p.x}-${p.y}-${i}`} transform={`translate(${p.x}, ${p.y})`}>
                  <circle
                    r="14"
                    fill={i === 0 ? "#2E2521" : "#B7694A"}
                    opacity="0.12"
                  />
                  <circle r="7" fill={i === 0 ? "#2E2521" : "#B7694A"} />
                  <text
                    y="1"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fill="#F0EAE2"
                    fontWeight="600"
                  >
                    {i === 0 ? "D" : i}
                  </text>
                </g>
              );
            })}

            {/* bus marker */}
            {busPos && (
              <g transform={`translate(${busPos.x}, ${busPos.y})`}>
                <circle r="11" fill="#2E2521" />
                <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#F0EAE2" />
              </g>
            )}
          </svg>

          {points.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
              <p className="text-sm text-charcoal/50">
                Click anywhere on the canvas to place your depot.
              </p>
            </div>
          )}

          {isDone && (
            <div className="absolute right-4 top-4 rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-linen shadow-sm">
              Arrived
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-taupe/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/70">
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-apricot" /> Depot &amp; up to 2 stops
            </span>
            <span className="flex items-center gap-1.5">
              <School size={15} className="text-apricot" /> School (final click)
            </span>
            {(isSimulating || isDone) && totalLengthPx > 0 && (
              <span className="font-medium text-charcoal">
                {isDone
                  ? `Trip complete — ${totalKm.toFixed(1)} km`
                  : `${remainingKm.toFixed(1)} km away · ${remainingMin} min`}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={reset}
              disabled={points.length === 0}
              aria-label="Reset the route sandbox"
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={16} className="mr-1.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={simulate}
              disabled={!canSimulate}
              aria-label="Simulate the route"
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Play size={16} className="mr-1.5" />
              {isSimulating ? "Simulating…" : "Simulate Route"}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-charcoal/45">
        Illustrative simulation for demonstration — not a live map or real
        routing data.
      </p>
    </section>
  );
}