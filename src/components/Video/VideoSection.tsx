import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { weddingConfig } from "@/data/weddingConfig";

function youtubeId(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m?.[1] ?? null;
}

export function VideoSection() {
  const { videoUrl, videoPoster } = weddingConfig.media;
  const [play, setPlay] = useState(false);
  if (!videoUrl) return null;
  const id = youtubeId(videoUrl);

  return (
    <section className="relative px-6 py-24 sm:py-28">
      <SectionTitle eyebrow="Prewedding Film" title="Our Moment" />
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
        <div className="glass-card overflow-hidden rounded-3xl p-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-espresso">
            {play ? (
              id ? (
                <iframe
                  title="Video prewedding"
                  src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <video src={videoUrl} controls autoPlay className="h-full w-full object-cover" />
              )
            ) : (
              <button
                type="button"
                onClick={() => setPlay(true)}
                aria-label="Putar video prewedding"
                className="group h-full w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <img
                  src={videoPoster}
                  alt="Cuplikan video prewedding"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-16 items-center justify-center rounded-full border border-champagne/60 bg-espresso/40 text-cream backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <Play className="size-6" aria-hidden="true" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
