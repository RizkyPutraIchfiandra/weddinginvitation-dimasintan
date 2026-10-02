import { CalendarPlus } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";
import { useLanguage } from "@/lib/i18n";

/** Format a Date as UTC basic format used by iCalendar / Google Calendar. */
function toICSDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildTimes() {
  const start = new Date(weddingConfig.event.weddingDate);
  // Akad 09.00 sampai akhir resepsi 16.00 (± 7 jam)
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
  return { start, end };
}

function googleCalendarUrl(title: string, description: string, location: string) {
  const { start, end } = buildTimes();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toICSDate(start)}/${toICSDate(end)}`,
    details: description,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsContent(title: string, description: string, location: string, alarms: [string, string]) {
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
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `GEO:${weddingConfig.event.latitude};${weddingConfig.event.longitude}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${alarms[0]}`,
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${alarms[1]}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function AddToCalendar() {
  const { t } = useLanguage();
  const title = `${t.event.calendarTitle} ${weddingConfig.couple.groomName} & ${weddingConfig.couple.brideName}`;
  const location = `${t.event.venue}, ${t.event.address}`;
  const handleAdd = () => {
    const ics = icsContent(
      title,
      t.event.calendarDescription,
      location,
      [t.event.alarmDay, t.event.alarmHours]
    );
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // iPhone/iPad: buka langsung agar Safari menampilkan sheet "Tambah ke Kalender" bawaan Apple
      window.open(url, "_blank");
    } else {
      // Samsung, Android lainnya, dan Desktop: download file .ics yang langsung membuka kalender bawaan HP (Samsung Calendar, Mi Calendar, Outlook, dll)
      const fileName = `wedding-${weddingConfig.couple.groomName.toLowerCase()}-${weddingConfig.couple.brideName.toLowerCase()}.ics`;
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  return (
    <div className="mt-10 text-center">
      <p className="text-xs leading-relaxed text-mocha/80">
        {t.event.calendarHelp}
      </p>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-cream/60 px-6 py-3 text-[0.7rem] tracking-[0.28em] text-chocolate uppercase transition-colors hover:bg-beige/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <CalendarPlus className="size-4" aria-hidden="true" />
        {t.event.calendarButton}
      </button>
    </div>
  );
}
