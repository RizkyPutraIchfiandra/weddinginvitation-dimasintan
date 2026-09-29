import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { weddingConfig } from "@/data/weddingConfig";
import { useLanguage } from "@/lib/i18n";

export function LoveStory() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="story" className="relative bg-cream/50 px-6 py-24 sm:py-28">
      <SectionTitle eyebrow={t.story.eyebrow} title={t.story.title} />

      <div ref={ref} className="relative mx-auto mt-16 max-w-2xl pl-10 sm:pl-0">
        {/* timeline rail */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[7px] w-px bg-caramel/20 sm:left-1/2 sm:-translate-x-1/2"
        >
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="h-full w-px bg-gradient-to-b from-caramel to-champagne"
          />
        </div>

        <ol className="space-y-14">
          {t.story.chapters.map((chapter, i) => (
            <Reveal as="li" key={chapter.year} delay={0.05} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-10 size-[15px] rotate-45 border border-caramel/60 bg-ivory sm:left-1/2 sm:-translate-x-1/2"
              />
              <div
                className={`sm:w-[calc(50%-2.5rem)] ${
                  i % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                }`}
              >
                <p className="text-[0.7rem] tracking-[0.4em] text-caramel">{chapter.year}</p>
                <h3 className="mt-2 font-serif text-2xl text-chocolate">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mocha">{chapter.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
