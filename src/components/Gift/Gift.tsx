import { useState } from "react";
import { Check, Copy, Gift as GiftIcon } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { weddingConfig } from "@/data/weddingConfig";
import { useLanguage } from "@/lib/i18n";

export function Gift() {
  const { gift } = weddingConfig;
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      toast.success(t.gift.copySuccess);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error(t.gift.copyError);
    }
  };

  return (
    <section id="gift" className="paper relative overflow-hidden px-6 py-24 sm:py-28">
      <SectionTitle eyebrow={t.gift.eyebrow} title={t.gift.title} subtitle={t.gift.note} />

      <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
        {gift.banks.map((b, i) => (
          <Reveal key={b.number} delay={i * 0.1} className="glass-card rounded-3xl px-7 py-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-beige/70 text-chocolate">
                <GiftIcon className="size-4" aria-hidden="true" />
              </span>
              <p className="font-serif text-xl text-chocolate">{b.bank}</p>
            </div>
            <p className="mt-6 font-sans text-lg tracking-[0.18em] text-mocha">{b.number}</p>
            <p className="mt-1 text-xs tracking-[0.2em] text-mocha/70 uppercase">{t.gift.accountFor} {b.holder}</p>
            <button
              type="button"
              onClick={() => copy(b.number)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-caramel/40 px-5 py-2.5 text-[0.65rem] tracking-[0.28em] text-chocolate uppercase transition-colors hover:bg-beige/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {copied === b.number ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
              {copied === b.number ? t.gift.copied : t.gift.copy}
            </button>
          </Reveal>
        ))}
      </div>

      {gift.qris ? (
        <Reveal delay={0.15} className="mx-auto mt-8 max-w-xs text-center">
          <img src={gift.qris} alt="Kode QRIS untuk hadiah pernikahan" className="rounded-2xl" />
        </Reveal>
      ) : null}
    </section>
  );
}
