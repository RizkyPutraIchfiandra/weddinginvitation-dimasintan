import { Reveal } from "./Reveal";
import { GoldRule } from "@/components/FloralDecorations/FloralDecorations";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] leading-[1.08] text-chocolate">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <GoldRule className="mt-5" />
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.22}>
          <p className="mt-5 text-sm leading-relaxed text-mocha sm:text-base">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
