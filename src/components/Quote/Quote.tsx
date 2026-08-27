import { Reveal } from "@/components/common/Reveal";
import { FloralDivider } from "@/components/FloralDecorations/FloralDecorations";
import { weddingConfig } from "@/data/weddingConfig";

export function Quote() {
  const { quote } = weddingConfig;
  return (
    <section className="relative bg-cream/60 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <FloralDivider />
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-10">
            <p className="font-serif text-[clamp(1.35rem,3.6vw,2rem)] leading-[1.55] text-chocolate italic">
              “{quote.text}”
            </p>
            <footer className="mt-8 text-[0.7rem] tracking-[0.35em] text-mocha uppercase">
              — {quote.source}
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
