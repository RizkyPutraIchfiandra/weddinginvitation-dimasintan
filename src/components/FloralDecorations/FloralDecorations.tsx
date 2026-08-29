import { motion, useReducedMotion } from "motion/react";
import cornerFloral from "@/assets/flowers/corner-1.png";
import dividerFloral from "@/assets/flowers/divider.png";

export function FloralCorner({
  position = "top-left",
  className = "",
  opacity = 0.5,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  opacity?: number;
}) {
  const map: Record<string, string> = {
    "top-left": "top-0 left-0 -scale-x-100",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0 rotate-180",
    "bottom-right": "bottom-0 right-0 -scale-y-100",
  };

  return (
    <img
      src={cornerFloral}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={1024}
      height={1024}
      style={{ opacity }}
      className={`pointer-events-none absolute w-40 select-none sm:w-64 lg:w-80 ${map[position]} ${className}`}
    />
  );
}

export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <img
        src={dividerFloral}
        alt=""
        loading="lazy"
        width={1200}
        height={512}
        className="w-56 opacity-80 sm:w-72"
      />
    </div>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="gold-rule w-16 sm:w-24" />
      <span className="size-1.5 rotate-45 bg-caramel/70" />
      <span className="gold-rule w-16 sm:w-24" />
    </div>
  );
}

/** Slow falling petals layer. Purely decorative. */
export function Petals({
  count = 10,
  tone = "light",
}: {
  count?: number;
  tone?: "light" | "dark" | "warm";
}) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const petals = Array.from({ length: count }, (_, i) => {
    const left = (i * 97) % 100;
    const delay = (i * 1.7) % 12;
    const duration = 16 + ((i * 3) % 11);
    const size = 8 + ((i * 5) % 10);
    const drift = i % 2 === 0 ? 70 : -60;
    return { left, delay, duration, size, drift, i };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.i}
          className={`absolute top-0 rounded-[100%_0_100%_0] ${
            tone === "dark" ? "bg-champagne/35" : "bg-caramel/25"
          }`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.5,
            ["--drift" as string]: `${p.drift}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Tiny floating light particles used on the opening screen. */
export function Particles({ count = 22 }: { count?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 41) % 100;
        const top = (i * 67) % 100;
        const size = 2 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-champagne/60"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -34, 0], opacity: [0.15, 0.75, 0.15] }}
            transition={{
              duration: 7 + (i % 6),
              delay: (i % 9) * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
