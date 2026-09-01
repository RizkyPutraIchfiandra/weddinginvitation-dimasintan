import { CalendarDays, Clock, MapPin, Navigation2 } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FloralCorner, GoldRule } from "@/components/FloralDecorations/FloralDecorations";
import { AddToCalendar } from "@/components/EventDetails/AddToCalendar";
import { weddingConfig } from "@/data/weddingConfig";

function EventCard({
  title,
  time,
  delay,
}: {
  title: string;
  time: string;
  delay: number;
}) {
  const { event } = weddingConfig;
  return (
    <Reveal delay={delay} className="glass-card rounded-3xl px-7 py-9 text-center">
      <p className="eyebrow">{title}</p>
      <GoldRule className="mt-4" />
      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-mocha">
        <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
        {event.weddingDayLabel}
      </p>
      <p className="mt-2 flex items-center justify-center gap-2 text-sm text-mocha">
        <Clock className="size-4 shrink-0" aria-hidden="true" />
        {time}
      </p>
      <p className="mt-6 font-serif text-2xl text-chocolate">{event.venueName}</p>
      <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-mocha/80">
        {event.venueAddress}
      </p>
    </Reveal>
  );
}

export function EventDetails() {
  const { event } = weddingConfig;
  const embed = `https://www.google.com/maps?q=${event.latitude},${event.longitude}&z=15&output=embed`;

  return (
    <section id="event" className="paper relative overflow-hidden px-6 py-24 sm:py-28">
      <FloralCorner position="top-right" opacity={0.28} />
      <FloralCorner position="bottom-left" opacity={0.22} />

      <SectionTitle
        eyebrow="Waktu & Tempat"
        title="The Celebration"
        subtitle="Dengan penuh sukacita, kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami."
      />

      <div className="relative mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        <EventCard title="Akad Nikah" time={event.akadTime} delay={0} />
        <EventCard title="Resepsi" time={event.receptionTime} delay={0.12} />
      </div>

      <Reveal delay={0.1} className="relative mx-auto mt-10 max-w-4xl">
        <div className="glass-card overflow-hidden rounded-3xl p-2">
          <iframe
            title={`Peta lokasi ${event.venueName}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full rounded-2xl border-0 sm:h-96"
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-cream/60 px-6 py-3 text-[0.7rem] tracking-[0.28em] text-chocolate uppercase transition-colors hover:bg-beige/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Navigation2 className="size-4" aria-hidden="true" />
            Petunjuk Arah
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venueAddress)}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-caramel/40 px-6 py-3 text-[0.7rem] tracking-[0.28em] text-mocha uppercase transition-colors hover:text-chocolate focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Lihat Alamat
          </a>
        </div>
        <AddToCalendar />
      </Reveal>
    </section>
  );
}
