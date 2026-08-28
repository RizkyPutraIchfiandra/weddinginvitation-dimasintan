import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/common/Reveal";
import { SectionTitle } from "@/components/common/SectionTitle";
import {
  formatWishTime,
  guestbookStore,
  type Attendance,
  type WishEntry,
} from "@/lib/guestbook";

export function RSVP({ guestName }: { guestName: string }) {
  const [entries, setEntries] = useState<WishEntry[]>([]);
  const [name, setName] = useState(guestName);
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    guestbookStore.list().then(setEntries);
  }, []);

  useEffect(() => {
    if (guestName) setName(guestName);
  }, [guestName]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Mohon lengkapi nama dan ucapan Anda");
      return;
    }
    setSending(true);
    try {
      const created = await guestbookStore.add({
        name: name.trim(),
        attendance,
        guests: attendance === "hadir" ? guests : 0,
        message: message.trim(),
      });
      setEntries((prev) => [created, ...prev]);
      setMessage("");
      toast.success("Terima kasih, ucapan Anda telah terkirim");
    } catch {
      toast.error("Gagal mengirim, coba lagi sebentar lagi");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-caramel/30 bg-ivory/70 px-4 py-3 text-sm text-chocolate placeholder:text-mocha/50 focus:border-caramel focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

  return (
    <section id="rsvp" className="paper relative overflow-hidden px-6 py-24 sm:py-28">
      <SectionTitle
        eyebrow="Konfirmasi Kehadiran"
        title="RSVP & Wishes"
        subtitle="Kehadiran dan doa restu Anda sangat berarti bagi kami."
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2">
        <Reveal className="glass-card rounded-3xl p-7 sm:p-9">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="rsvp-name" className="eyebrow block">
                Nama
              </label>
              <input
                id="rsvp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className={`mt-3 ${field}`}
              />
            </div>

            <div>
              <span className="eyebrow block">Kehadiran</span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(
                  [
                    { key: "hadir", label: "Hadir", Icon: UserCheck },
                    { key: "tidak-hadir", label: "Tidak Hadir", Icon: UserX },
                  ] as const
                ).map((opt) => {
                  const active = attendance === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setAttendance(opt.key)}
                      aria-pressed={active}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[0.65rem] tracking-[0.22em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                        active
                          ? "border-caramel bg-beige/70 text-chocolate"
                          : "border-caramel/30 text-mocha hover:bg-cream/70"
                      }`}
                    >
                      <opt.Icon className="size-4" aria-hidden="true" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {attendance === "hadir" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label htmlFor="rsvp-guests" className="eyebrow block">
                    Jumlah Tamu
                  </label>
                  <select
                    id="rsvp-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={`mt-3 ${field}`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} orang
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="rsvp-message" className="eyebrow block">
                Ucapan & Doa
              </label>
              <textarea
                id="rsvp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tuliskan ucapan terbaik Anda..."
                className={`mt-3 resize-none ${field}`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-chocolate px-8 py-3.5 text-[0.68rem] tracking-[0.3em] text-ivory uppercase transition-colors hover:bg-espresso focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
            >
              <Send className="size-4" aria-hidden="true" />
              {sending ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col">
          <p className="eyebrow text-center lg:text-left">
            {entries.length} Ucapan
          </p>
          <ul className="mt-5 max-h-[30rem] space-y-4 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {entries.map((w) => (
                <motion.li
                  key={w.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-caramel/20 bg-ivory/70 px-5 py-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-serif text-lg text-chocolate">{w.name}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-[0.55rem] tracking-[0.2em] uppercase ${
                        w.attendance === "hadir"
                          ? "bg-beige/80 text-chocolate"
                          : "bg-cream text-mocha/80"
                      }`}
                    >
                      {w.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mocha">{w.message}</p>
                  <p className="mt-3 text-[0.6rem] tracking-[0.2em] text-mocha/60 uppercase">
                    {formatWishTime(w.createdAt)}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
