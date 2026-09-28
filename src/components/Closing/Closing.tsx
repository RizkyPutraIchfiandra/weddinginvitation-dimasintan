import { Reveal } from "@/components/common/Reveal";
import { GoldRule } from "@/components/FloralDecorations/FloralDecorations";
import { weddingConfig } from "@/data/weddingConfig";

export function Closing() {
  const { closing, couple, event } = weddingConfig;

  return (
    <footer className="relative overflow-hidden bg-beige px-6 py-24 text-center sm:py-28">
      <Reveal className="mx-auto max-w-xl">
        <p className="text-sm leading-relaxed text-mocha">{closing.text}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <GoldRule className="mt-8" />
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-8 text-[0.65rem] tracking-[0.4em] text-mocha uppercase">
          Kami yang berbahagia
        </p>
        <h2 className="mt-4 font-serif text-[clamp(2.4rem,10vw,4.5rem)] leading-[1] text-chocolate">
          {couple.groomName}
          <span className="mx-2 font-script text-caramel">&</span>
          {couple.brideName}
        </h2>
        <p className="mt-4 text-xs tracking-[0.35em] text-mocha">{event.weddingDateLabel}</p>
      </Reveal>
    </footer>
  );
}
