import { CalendarPlus } from "lucide-react";
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

function googleCalendarUrl() {
  const { start, end } = buildTimes();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${toICSDate(start)}/${toICSDate(end)}`,
    details: DESCRIPTION,
    location: LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

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
  const handleAdd = () => {
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // iPhone/iPad: buka file acara langsung — Safari menampilkan layar
      // "Tambah ke Kalender" bawaan tanpa perlu mengunduh manual.
      const blob = new Blob([icsContent()], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } else {
      // Android & desktop: buka langsung aplikasi/situs Google Calendar
      // dengan acara yang sudah terisi — tinggal tekan "Simpan".
      window.open(googleCalendarUrl(), "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="mt-10 text-center">
      <p className="text-xs leading-relaxed text-mocha/80">
        Satu klik langsung membuka kalender HP Anda dengan acara yang sudah terisi — tinggal tekan
        "Simpan". Pengingat otomatis muncul sehari sebelum dan 2 jam sebelum acara dimulai.
      </p>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-cream/60 px-6 py-3 text-[0.7rem] tracking-[0.28em] text-chocolate uppercase transition-colors hover:bg-beige/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <CalendarPlus className="size-4" aria-hidden="true" />
        Simpan ke Kalender
      </button>
    </div>
  );
}
