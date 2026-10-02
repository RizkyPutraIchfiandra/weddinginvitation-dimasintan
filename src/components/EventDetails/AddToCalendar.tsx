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
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // Prepare .ics content for fallback
    const ics = icsContent(
      title,
      t.event.calendarDescription,
      location,
      [t.event.alarmDay, t.event.alarmHours]
    );
    if (isIOS) {
      // iOS Safari blocks data: URIs via window.location.href
      // Use a hidden <a> with download attribute instead
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      return;
    }
    // Android & desktop: try intent scheme first, fallback to .ics download
    const intentUrl = `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event;S.title=${encodeURIComponent(
      title
    )};S.eventLocation=${encodeURIComponent(
      location
    )};S.description=${encodeURIComponent(
      t.event.calendarDescription
    )};S.beginTime=${new Date(weddingConfig.event.weddingDate).getTime()};S.endTime=${new Date(weddingConfig.event.weddingDate).getTime() + 7 * 60 * 60 * 1000};end`;
    try {
      // Attempt to navigate via intent
      window.location.href = intentUrl;
      // If blocked, fallback after short delay
      setTimeout(() => {
        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.ics`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      }, 500);
    } catch (e) {
      // Fallback download
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.ics`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
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
