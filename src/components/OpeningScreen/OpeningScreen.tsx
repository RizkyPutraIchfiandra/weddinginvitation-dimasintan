import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import wayangFemaleAsset from "@/assets/wayang/wayang-female.png.asset.json";
const wayangFemale = wayangFemaleAsset.url;
import wayangMaleAsset from "@/assets/wayang/wayang-male.png.asset.json";
const wayangMale = wayangMaleAsset.url;
import { weddingConfig } from "@/data/weddingConfig";

const EASE = [0.16, 1, 0.3, 1] as const;
const MotionButton = motion.create(Button);

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
    window.setTimeout(onOpen, reduced ? 100 : 420);
  };

  const step = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.1 : 0.3, delay: reduced ? 0 : i * 0.035, ease: EASE },
  });

  return (
    <motion.section
      aria-label="Pembuka undangan"
      className="grain fixed inset-0 z-50 overflow-hidden bg-paper text-ink"
      style={{ background: "var(--gradient-opening)" }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-antique-gold/20 sm:inset-5"
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-7 right-7 flex gap-2 sm:top-10 sm:right-10">
        <span className="size-1 rounded-full bg-antique-gold" />
        <span className="size-1 rounded-full bg-paper-muted" />
        <span className="size-1 rounded-full bg-ink" />
      </div>

      <WayangRise src={wayangMale} side="left" leaving={leaving} reduced={!!reduced} delay={0.04} />
      <WayangRise
        src={wayangFemale}
        side="right"
        leaving={leaving}
        reduced={!!reduced}
        delay={0}
      />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-5xl content-center gap-8 px-8 py-16 sm:px-14 md:grid-cols-[1fr_21rem] md:items-end md:gap-16 lg:px-20">
        <div className="flex flex-col items-start text-left">
          <motion.p
            {...step(0)}
            className="font-opening-sans text-[0.65rem] font-medium tracking-[0.4em] text-antique-gold uppercase sm:text-xs"
          >
            The Wedding Of
          </motion.p>

          <motion.h1
            {...step(1)}
            className="mt-5 font-opening-serif text-[clamp(3.15rem,13vw,6.8rem)] leading-[1.04] text-ink md:mt-7"
          >
            <span className="block">{couple.groomName}</span>
            <span className="ml-8 block font-normal italic text-antique-gold sm:ml-14 md:ml-20">
              &
            </span>
            <span className="block">{couple.brideName}</span>
          </motion.h1>

          <motion.div {...step(2)} className="mt-5 flex items-center gap-4 sm:mt-7 sm:gap-6">
            <span className="h-px w-10 bg-antique-gold sm:w-12" aria-hidden="true" />
            <p className="font-opening-sans text-sm font-light tracking-[0.24em] text-ink sm:text-base">
              {event.weddingDateLabel}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          {...step(3)}
          className="w-full max-w-sm justify-self-center md:justify-self-end"
        >
          <div className="border border-antique-gold/25 bg-paper-muted/65 px-6 py-6 text-center shadow-[0_24px_70px_-45px_var(--ink)] backdrop-blur-sm sm:px-8 sm:py-8 md:text-right">
            <p className="font-opening-sans text-[0.6rem] tracking-[0.2em] text-ink/55 uppercase sm:text-[0.65rem]">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p className="mt-4 break-words font-opening-serif text-xl italic leading-snug text-ink sm:text-2xl">
              {guestName || "Tamu Undangan"}
            </p>

            <MotionButton
              type="button"
              onClick={handleOpen}
              disabled={leaving}
              whileTap={{ scale: 0.97 }}
              className="mt-6 h-auto w-full rounded-none bg-ink px-6 py-4 font-opening-sans text-[0.65rem] font-medium tracking-[0.2em] text-paper uppercase shadow-lg hover:bg-antique-gold sm:w-auto"
            >
              <Mail className="size-4" aria-hidden="true" />
              Buka Undangan
            </MotionButton>
          </div>
          <p className="mt-3 text-center font-opening-sans text-[0.55rem] tracking-[0.08em] text-antique-gold/75 uppercase md:text-right">
            Mohon maaf jika ada kesalahan penulisan nama atau gelar
          </p>
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
  const baseRotate = side === "left" ? 12 : -12;

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      width={704}
      height={1408}
      className={`pointer-events-none absolute bottom-0 select-none ${
        side === "left"
          ? "-left-[38%] opacity-[0.13] sm:-left-[22%] md:-left-[12%] md:opacity-[0.11]"
          : "-right-[34%] opacity-[0.16] sm:-right-[18%] md:-right-[9%] md:opacity-[0.14]"
      } h-[48vh] w-auto origin-bottom mix-blend-multiply sm:h-[62vh] md:h-[80vh]`}
      initial={
        reduced
          ? { opacity: side === "left" ? 0.11 : 0.14 }
          : { y: "12%", x: `${12 * dir}%`, rotate: baseRotate + 4 * dir, opacity: 0 }
      }
      animate={
        reduced
          ? { opacity: leaving ? 0 : side === "left" ? 0.11 : 0.14 }
          : leaving
            ? { y: "-16%", x: `${-8 * dir}%`, opacity: 0 }
            : { y: "0%", x: "0%", rotate: baseRotate, opacity: side === "left" ? 0.11 : 0.14 }
      }
      transition={
        reduced
          ? { duration: 0.15 }
          : leaving
            ? { duration: 0.5, ease: EASE }
            : { duration: 0.7, delay, ease: EASE }
      }
    />
  );
}
