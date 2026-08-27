import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FloralDivider } from "@/components/FloralDecorations/FloralDecorations";
import { weddingConfig } from "@/data/weddingConfig";

function Profile({
  photo,
  fullName,
  nickname,
  parents,
  delay,
}: {
  photo: string;
  fullName: string;
  nickname: string;
  parents: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="text-center">
      <article>
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-2 rounded-[999px_999px_18px_18px] border border-caramel/30" />
          <img
            src={photo}
            alt={fullName}
            loading="lazy"
            width={912}
            height={1200}
            className="relative aspect-[3/4] w-full rounded-[999px_999px_18px_18px] object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
        <h3 className="mt-8 font-script text-4xl text-caramel">{nickname}</h3>
        <p className="mt-2 font-serif text-2xl text-chocolate">{fullName}</p>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-mocha">{parents}</p>
      </article>
    </Reveal>
  );
}

export function Couple() {
  const { couple } = weddingConfig;
  return (
    <section id="couple" className="paper relative px-6 py-24 sm:py-28">
      <SectionTitle
        eyebrow="Bismillahirrahmanirrahim"
        title="Meet The Couple"
        subtitle="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami."
      />

      <div className="mx-auto mt-16 grid max-w-4xl gap-16 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8">
        <Profile
          photo={couple.groomPhoto}
          fullName={couple.groomFullName}
          nickname={couple.groomNickname}
          parents={couple.groomParents}
          delay={0}
        />
        <Reveal delay={0.15} className="flex items-center justify-center md:h-full">
          <span className="font-script text-5xl text-caramel md:mt-32">&</span>
        </Reveal>
        <Profile
          photo={couple.bridePhoto}
          fullName={couple.brideFullName}
          nickname={couple.brideNickname}
          parents={couple.brideParents}
          delay={0.12}
        />
      </div>

      <Reveal delay={0.2}>
        <FloralDivider className="mt-16" />
      </Reveal>
    </section>
  );
}
