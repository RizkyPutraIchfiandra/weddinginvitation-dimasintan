import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Disc3, Pause } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";

export function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const url = weddingConfig.media.musicUrl;

  useEffect(() => {
    if (!autoStart || !ref.current) return;
    ref.current.volume = 0.55;
    ref.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart]);

  if (!url) return null;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={url} loop preload="none" />
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        aria-pressed={playing}
        className="glass-card fixed right-4 bottom-24 z-40 flex size-12 items-center justify-center rounded-full text-chocolate focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:top-24 md:bottom-auto"
      >
        {playing ? (
          <Pause className="size-4" aria-hidden="true" />
        ) : (
          <Disc3 className="size-5 animate-spin-slow" aria-hidden="true" />
        )}
      </motion.button>
    </>
  );
}
