import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Copy, Link2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/buat-link")({
  head: () => ({
    meta: [
      { title: "Generator Link Undangan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LinkGenerator,
});

function LinkGenerator() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = useMemo(
    () => (typeof window !== "undefined" ? window.location.origin : ""),
    [],
  );

  const buildLink = (guest: string) =>
    `${baseUrl}/?to=${encodeURIComponent(guest.trim())}`;

  const addGuest = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (guests.some((g) => g.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Nama sudah ada di daftar");
      return;
    }
    setGuests((prev) => [...prev, trimmed]);
    setName("");
  };

  const copyLink = async (guest: string) => {
    try {
      await navigator.clipboard.writeText(buildLink(guest));
      setCopied(guest);
      toast.success(`Link untuk "${guest}" tersalin`);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  return (
    <main className="paper relative flex min-h-[100svh] items-center justify-center px-6 py-16">
      <div className="glass-card w-full max-w-lg rounded-3xl p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-chocolate/10 text-chocolate">
            <Link2 className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 className="font-serif text-2xl text-chocolate">Generator Link Undangan</h1>
            <p className="mt-1 text-xs text-mocha">
              Halaman khusus pemilik — tidak tampil di navigasi tamu.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGuest()}
            placeholder="Nama tamu, mis. Keluarga Besar Sastro"
            className="min-w-0 flex-1 rounded-xl border border-input bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-mocha/50 focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <button
            type="button"
            onClick={addGuest}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-chocolate px-4 py-3 text-xs tracking-[0.15em] text-ivory uppercase transition-colors hover:bg-espresso focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tambah
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {guests.length === 0 && (
            <li className="rounded-xl border border-dashed border-caramel/40 px-4 py-6 text-center text-xs text-mocha/70">
              Belum ada tamu. Ketik nama lalu tekan Tambah atau Enter.
            </li>
          )}
          {guests.map((guest) => (
            <li
              key={guest}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-ivory/70 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-serif text-lg text-espresso">{guest}</p>
                <p className="truncate text-[0.65rem] text-mocha/70">{buildLink(guest)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => copyLink(guest)}
                  aria-label={`Salin link untuk ${guest}`}
                  className="grid size-9 place-items-center rounded-lg bg-champagne/40 text-chocolate transition-colors hover:bg-champagne/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {copied === guest ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setGuests((prev) => prev.filter((g) => g !== guest))}
                  aria-label={`Hapus ${guest}`}
                  className="grid size-9 place-items-center rounded-lg text-mocha/60 transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-mocha/60">
          Link tanpa nama (beranda biasa) tetap menampilkan "Tamu Undangan".
        </p>
      </div>
    </main>
  );
}
