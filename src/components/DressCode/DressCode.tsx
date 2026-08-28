import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { weddingConfig } from "@/data/weddingConfig";

export function DressCode() {
  const { dressCode } = weddingConfig;

  return (
    <section className="relative bg-cream/50 px-6 py-20">
      <SectionTitle eyebrow="Dress Code" title={dressCode.style} subtitle={dressCode.note} />
      <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-center gap-5">
        {dressCode.swatches.map((s) => (
          <div key={s.name} className="text-center">
            <span
              className={`block size-12 rounded-full ring-1 ring-caramel/30 ring-offset-2 ring-offset-background sm:size-14 ${s.token}`}
              aria-hidden="true"
            />
            <span className="mt-3 block text-[0.6rem] tracking-[0.22em] text-mocha uppercase">
              {s.name}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
