import { Reveal } from "@/components/common/Reveal";
import { FloralDivider, GoldRule } from "@/components/FloralDecorations/FloralDecorations";
import { weddingConfig } from "@/data/weddingConfig";

export function Closing() {
  const { closing, couple, event } = weddingConfig;

  return (
    <footer className="grain relative overflow-hidden bg-ink px-6 py-24 text-center sm:py-28">
      <Reveal className="mx-auto max-w-xl">
        <p className="text-sm leading-relaxed text-beige/85">{closing.text}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <GoldRule className="mt-8" />
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-8 text-[0.65rem] tracking-[0.4em] text-champagne/80 uppercase">
          Kami yang berbahagia
        </p>
        <h2 className="mt-4 font-serif text-[clamp(2.4rem,10vw,4.5rem)] leading-[1] text-cream">
          {couple.groomName}
          <span className="mx-2 font-script text-champagne/90">&</span>
          {couple.brideName}
        </h2>
        <p className="mt-4 text-xs tracking-[0.35em] text-beige/70">{event.weddingDateLabel}</p>
      </Reveal>
      <Reveal delay={0.22}>
        <FloralDivider className="mt-10 opacity-70" />
      </Reveal>
    </footer>
  );
}
