import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import wayangFemale from "@/assets/wayang/wayang-female.png";
import { FloralCorner, GoldRule, Petals } from "@/components/FloralDecorations/FloralDecorations";
import { weddingConfig } from "@/data/weddingConfig";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { couple, event } = weddingConfig;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wayangY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-26%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="paper relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <FloralCorner position="top-left" opacity={0.55} />
      <FloralCorner position="top-right" opacity={0.55} />
      <FloralCorner position="bottom-left" opacity={0.35} />
      <FloralCorner position="bottom-right" opacity={0.35} />
      <Petals count={9} />

      <motion.img
        src={wayangFemale}
        alt=""
        aria-hidden="true"
        width={704}
        height={1408}
        style={{ y: wayangY, rotate: -17 }}
        className="pointer-events-none absolute -right-[22%] bottom-[-8%] h-[55vh] w-auto opacity-[0.09] select-none sm:-right-[10%] sm:h-[80vh] lg:opacity-[0.13]"
      />

      <motion.div style={{ y: textY }} className="relative z-10 text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          className="mt-6 font-serif text-[clamp(3.2rem,16vw,8rem)] leading-[0.9] text-chocolate"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <span className="block">{couple.groomName}</span>
          <span className="my-1 block font-script text-[0.5em] text-caramel">&</span>
          <span className="block">{couple.brideName}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-8"
        >
          <GoldRule />
          <p className="mt-6 text-xs tracking-[0.55em] text-mocha sm:text-sm">
            {event.weddingDateLabel}
          </p>
          <p className="mt-3 text-xs tracking-[0.2em] text-mocha/70 uppercase">
            {event.venueName} · Yogyakarta
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
