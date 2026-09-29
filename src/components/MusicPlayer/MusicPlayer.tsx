import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Disc3, Pause, X } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";
import { useLanguage } from "@/lib/i18n";

/** Ubah link Spotify biasa menjadi URL embed player resmi. */
function toSpotifyEmbed(url: string) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("spotify.com")) return "";
    const path = u.pathname.replace(/^\/(intl-[a-z]+\/)?/, "/");
    return `https://open.spotify.com/embed${path}?utm_source=generator&theme=0`;
  } catch {
    return "";
  }
}

export function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const spotifyEmbed = toSpotifyEmbed(weddingConfig.media.spotifyUrl);
  const url = weddingConfig.media.musicUrl;

  useEffect(() => {
    if (spotifyEmbed || !autoStart || !ref.current) return;
    ref.current.volume = 0.55;
    ref.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart, spotifyEmbed]);

  const buttonClass =
    "glass-card fixed right-4 bottom-24 z-40 flex size-12 items-center justify-center rounded-full text-chocolate focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:top-24 md:bottom-auto";

  if (spotifyEmbed) {
    return (
      <>
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? t.music.close : t.music.open}
          aria-expanded={open}
          className={buttonClass}
        >
          {open ? (
            <X className="size-4" aria-hidden="true" />
          ) : (
            <Disc3 className="size-5 animate-spin-slow" aria-hidden="true" />
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="glass-card fixed right-4 bottom-40 z-40 w-[19rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl p-2 md:top-40 md:bottom-auto"
            >
              <iframe
                title={t.music.title}
                src={spotifyEmbed}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

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
        aria-label={playing ? t.music.pause : t.music.play}
        aria-pressed={playing}
        className={buttonClass}
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
