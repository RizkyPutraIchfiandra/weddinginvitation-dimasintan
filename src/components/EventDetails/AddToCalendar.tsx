import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { weddingConfig } from "@/data/weddingConfig";

/** Format a Date as UTC basic format used by iCalendar / Google Calendar. */
function toICSDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildTimes() {
  const start = new Date(weddingConfig.event.weddingDate);
  // Akad pagi sampai selesai resepsi (± 6 jam)
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  return { start, end };
}

const TITLE = `Pernikahan ${weddingConfig.couple.groomName} & ${weddingConfig.couple.brideName}`;
const DESCRIPTION = `Akad Nikah ${weddingConfig.event.akadTime} · Resepsi ${weddingConfig.event.receptionTime}. Kami menantikan kehadiran Anda.`;
const LOCATION = `${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`;


function icsContent() {
  const { start, end } = buildTimes();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@wedding-invitation`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${DESCRIPTION}`,
    `LOCATION:${LOCATION}`,
    `GEO:${weddingConfig.event.latitude};${weddingConfig.event.longitude}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Besok hari pernikahan — jangan lupa hadir!",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Acara pernikahan dimulai 2 jam lagi",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function AddToCalendar() {
  const handleDownload = () => {
    const blob = new Blob([icsContent()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "undangan-pernikahan.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("File kalender diunduh", {
      description: "Buka file-nya untuk menyimpan acara beserta pengingatnya.",
    });
  };

  return (
    <div className="mt-10 text-center">
      <p className="text-xs leading-relaxed text-mocha/80">
        Simpan tanggalnya di kalender Anda — pengingat otomatis akan muncul sehari sebelum dan 2 jam
        sebelum acara dimulai.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-cream/60 px-6 py-3 text-[0.7rem] tracking-[0.28em] text-chocolate uppercase transition-colors hover:bg-beige/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <CalendarPlus className="size-4" aria-hidden="true" />
          Google Calendar
        </a>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-full border border-caramel/40 px-6 py-3 text-[0.7rem] tracking-[0.28em] text-mocha uppercase transition-colors hover:text-chocolate focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Download className="size-4" aria-hidden="true" />
          Apple / Outlook (.ics)
        </button>
      </div>
    </div>
  );
}
