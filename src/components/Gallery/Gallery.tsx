import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { weddingConfig } from "@/data/weddingConfig";

const spanFor = (o: string) =>
  o === "portrait" ? "row-span-2" : o === "landscape" ? "sm:col-span-2" : "";

export function Gallery() {
  const images = weddingConfig.media.galleryImages;
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setOpen((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length]);

  return (
    <section id="gallery" className="relative bg-cream/50 px-6 py-24 sm:py-28">
      <SectionTitle
        eyebrow="Momen Kami"
        title="Gallery"
        subtitle="Sekeping cerita yang kami rangkai sebelum hari bahagia tiba."
      />

      <div className="mx-auto mt-14 grid max-w-5xl auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:grid-cols-4 sm:gap-4">
        {images.map((img, i) => (
          <Reveal
            key={img.src}
            delay={(i % 4) * 0.07}
            scale={0.97}
            className={`group relative overflow-hidden rounded-2xl ${spanFor(img.orientation)}`}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="h-full w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label={`Perbesar foto: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Pratinjau foto"
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Tutup"
              className="absolute top-5 right-5 rounded-full border border-champagne/40 p-2 text-cream transition-colors hover:bg-cream/10"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => ((i ?? 0) - 1 + images.length) % images.length);
              }}
              className="absolute left-3 rounded-full border border-champagne/40 p-2 text-cream transition-colors hover:bg-cream/10 sm:left-8"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => ((i ?? 0) + 1) % images.length);
              }}
              className="absolute right-3 rounded-full border border-champagne/40 p-2 text-cream transition-colors hover:bg-cream/10 sm:right-8"
            >
              <ChevronRight className="size-5" />
            </button>
            <motion.img
              key={images[open].src}
              src={images[open].src}
              alt={images[open].alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
