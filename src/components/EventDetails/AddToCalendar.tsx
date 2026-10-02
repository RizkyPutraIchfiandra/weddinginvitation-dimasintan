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
    const { start, end } = buildTimes();
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      // iOS / Apple: buka langsung agar Safari memunculkan sheet "Tambah ke Kalender" bawaan Apple
      const ics = icsContent(
        title,
        t.event.calendarDescription,
        location,
        [t.event.alarmDay, t.event.alarmHours]
      );
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } else if (isAndroid) {
      // Android (Samsung, Xiaomi, Oppo, Vivo, dll): langsung buka aplikasi kalender bawaan via Intent (tanpa download file)
      const startMillis = start.getTime();
      const endMillis = end.getTime();
      const intentUrl = `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/event;S.title=${encodeURIComponent(title)};l.beginTime=${startMillis};l.endTime=${endMillis};S.eventLocation=${encodeURIComponent(location)};S.description=${encodeURIComponent(t.event.calendarDescription)};end`;

      try {
        window.location.href = intentUrl;
      } catch {
        window.open(
          googleCalendarUrl(title, t.event.calendarDescription, location),
          "_blank",
          "noopener,noreferrer"
        );
      }
    } else {
      // Desktop / Laptop: langsung buka Google Calendar di tab baru
      window.open(
        googleCalendarUrl(title, t.event.calendarDescription, location),
        "_blank",
        "noopener,noreferrer"
      );
    }
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
