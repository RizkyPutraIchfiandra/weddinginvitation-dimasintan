import { useEffect, useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { weddingConfig } from "@/data/weddingConfig";
import { useLanguage } from "@/lib/i18n";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const { t } = useLanguage();
  const target = new Date(weddingConfig.event.weddingDate).getTime();
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { label: t.countdown.days, value: time.days, live: false },
    { label: t.countdown.hours, value: time.hours, live: false },
    { label: t.countdown.minutes, value: time.minutes, live: false },
    { label: t.countdown.seconds, value: time.seconds, live: true },
  ];

  return (
    <section className="relative px-6 py-24 sm:py-28">
      <SectionTitle eyebrow={t.countdown.eyebrow} title={t.countdown.title} />

      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {cells.map((cell, i) => (
          <Reveal key={cell.label} delay={i * 0.08}>
            <div className="glass-card rounded-2xl px-2 py-6 text-center">
              <p
                className="font-serif text-4xl text-chocolate tabular-nums sm:text-5xl"
                aria-live={cell.live ? "off" : undefined}
              >
                {String(cell.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[0.6rem] tracking-[0.28em] text-mocha uppercase">
                {cell.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="mt-8 text-center text-xs tracking-[0.25em] text-mocha/80 uppercase">
          {t.event.day}
        </p>
      </Reveal>
    </section>
  );
}
