import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail } from "lucide-react";
import wayangFemale from "@/assets/wayang/wayang-female.png";
import wayangMale from "@/assets/wayang/wayang-male.png";
import { Particles, Petals, GoldRule } from "@/components/FloralDecorations/FloralDecorations";
import cornerFloral from "@/assets/flowers/corner-1.png";
import { weddingConfig } from "@/data/weddingConfig";

const EASE = [0.16, 1, 0.3, 1] as const;

export function OpeningScreen({
  guestName,
  onOpen,
}: {
  guestName: string;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const { couple, event } = weddingConfig;

  const handleOpen = () => {
    if (leaving) return;
    setLeaving(true);
    // Let the cinematic exit play before the invitation is revealed.
    window.setTimeout(onOpen, reduced ? 200 : 1500);
  };

  const step = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.3 : 1, delay: reduced ? 0 : 1.1 + i * 0.28, ease: EASE },
  });

  return (
    <motion.section
      aria-label="Pembuka undangan"
      className="grain fixed inset-0 z-50 overflow-hidden"
      style={{ background: "var(--gradient-opening)" }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 1.1, delay: leaving && !reduced ? 0.45 : 0, ease: EASE }}
    >
      {/* soft light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--champagne) 26%, transparent), transparent 62%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      />

      <Particles count={24} />
      <Petals count={10} tone="warm" />

      {/* ── Signature wayang kulit: diagonal, rising bottom → top ── */}
      <WayangRise src={wayangMale} side="left" leaving={leaving} reduced={!!reduced} delay={0.5} />
      <WayangRise
        src={wayangFemale}
        side="right"
        leaving={leaving}
        reduced={!!reduced}
        delay={0.75}
      />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-12 text-center">
        <motion.p {...step(0)} className="eyebrow text-champagne/85">
          The Wedding Of
        </motion.p>

        <motion.h1
          {...step(1)}
          className="mt-6 font-serif text-[clamp(3rem,15vw,7rem)] leading-[0.95] text-cream"
        >
          {couple.groomName}
          <span className="mx-2 font-script text-champagne/90">&</span>
          {couple.brideName}
        </motion.h1>

        <motion.div {...step(2)} className="mt-6 w-full max-w-xs">
          <GoldRule />
          <p className="mt-5 font-sans text-sm tracking-[0.5em] text-beige/90">
            {event.weddingDateLabel}
          </p>
        </motion.div>

        <motion.div
          {...step(3)}
          className="glass-card mt-10 w-full max-w-sm rounded-2xl px-6 py-6"
          style={{
            background: "color-mix(in oklab, var(--espresso) 42%, transparent)",
            borderColor: "color-mix(in oklab, var(--champagne) 32%, transparent)",
          }}
        >
          <p className="text-[0.7rem] tracking-[0.3em] text-beige/70 uppercase">Kepada Yth.</p>
          <p className="mt-2 text-sm text-beige/85">Bapak/Ibu/Saudara/i</p>
          <p className="mt-3 font-serif text-2xl text-cream sm:text-3xl">
            {guestName || "Tamu Undangan"}
          </p>
        </motion.div>

        <motion.div {...step(4)} className="mt-9">
          <motion.button
            type="button"
            onClick={handleOpen}
            whileTap={{ scale: 0.94 }}
            whileHover={{ y: -2 }}
            className="group inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-champagne/10 px-8 py-3.5 text-[0.7rem] tracking-[0.35em] text-cream uppercase backdrop-blur-sm transition-colors hover:bg-champagne/20 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            Buka Undangan
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

/**
 * Wayang kulit silhouette that enters from below the viewport and travels
 * diagonally upward with a subtle rotation, slight overshoot, and settle.
 */
function WayangRise({
  src,
  side,
  leaving,
  reduced,
  delay,
}: {
  src: string;
  side: "left" | "right";
  leaving: boolean;
  reduced: boolean;
  delay: number;
}) {
  const dir = side === "left" ? 1 : -1;
  const baseRotate = side === "left" ? 22 : -19;

  const rest = {
    y: ["6%", "-2%", "0%"],
    x: [`${18 * dir}%`, `${-3 * dir}%`, "0%"],
    rotate: [baseRotate + 10 * dir, baseRotate - 3 * dir, baseRotate],
    scale: [0.86, 1.03, 1],
    opacity: [0, 0.85, 0.75],
  };

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      width={704}
      height={1408}
      className={`pointer-events-none absolute bottom-0 select-none ${
        side === "left" ? "-left-[18%] sm:-left-[10%]" : "-right-[18%] sm:-right-[8%]"
      } h-[62vh] w-auto origin-bottom opacity-0 sm:h-[85vh] lg:h-[95vh]`}
      style={{ filter: "drop-shadow(0 30px 50px oklch(0.18 0.03 50 / 0.55))" }}
      initial={{ y: "78%", x: `${34 * dir}%`, rotate: baseRotate + 16 * dir, scale: 0.8, opacity: 0 }}
      animate={
        reduced
          ? { opacity: leaving ? 0 : 0.6, y: "0%", x: "0%", rotate: baseRotate, scale: 1 }
          : leaving
            ? {
                y: "-115%",
                x: `${-26 * dir}%`,
                rotate: baseRotate - 12 * dir,
                scale: 1.1,
                opacity: 0,
              }
            : rest
      }
      transition={
        reduced
          ? { duration: 0.3 }
          : leaving
            ? { duration: 1.4, ease: [0.65, 0, 0.35, 1] }
            : { duration: 2.6, delay, ease: EASE, times: [0, 0.78, 1] }
      }
    />
  );
}
