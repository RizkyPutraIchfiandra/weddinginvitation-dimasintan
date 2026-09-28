import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Copy, Link2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { nameToSlug } from "@/lib/guestSlug";

export const Route = createFileRoute("/buat-link")({
  head: () => ({
    meta: [
      { title: "Generator Link Undangan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LinkGenerator,
});

const PUBLISHED_URL = "https://weddinginvitation-dimasintan.lovable.app";

function defaultBase() {
  if (typeof window === "undefined") return PUBLISHED_URL;
  const host = window.location.hostname;
  const isPreview =
    host.includes("lovableproject.com") ||
    host.includes("id-preview") ||
    host === "localhost";
  return isPreview ? PUBLISHED_URL : window.location.origin;
}

function LinkGenerator() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [baseInput, setBaseInput] = useState(defaultBase);

  const baseUrl = useMemo(
    () => baseInput.trim().replace(/\/+$/, ""),
    [baseInput],
  );

  const buildLink = (guest: string) => `${baseUrl}/${nameToSlug(guest)}`;

  const [bulk, setBulk] = useState<{ wb: import("xlsx").WorkBook; fileName: string; count: number } | null>(null);

  const handleFile = async (file: File) => {
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(await file.arrayBuffer());
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1, blankrows: false });
      const first = String(rows[0]?.[0] ?? "").trim().toLowerCase();
      const hasHeader = ["nama", "name", "nama tamu", "tamu"].includes(first);
      const out: unknown[][] = [["Nama", "Link Undangan"]];
      let count = 0;
      rows.slice(hasHeader ? 1 : 0).forEach((r) => {
        const n = String(r?.[0] ?? "").trim();
        if (!n || !nameToSlug(n)) return;
        out.push([n, buildLink(n)]);
        count++;
      });
      if (!count) {
        toast.error("Tidak ada nama di kolom pertama");
        return;
      }
      const newWb = XLSX.utils.book_new();
      const newWs = XLSX.utils.aoa_to_sheet(out);
      newWs["!cols"] = [{ wch: 32 }, { wch: 60 }];
      XLSX.utils.book_append_sheet(newWb, newWs, "Link Undangan");
      setBulk({ wb: newWb, fileName: file.name.replace(/\.[^.]+$/, ""), count });
      setGuests((prev) => [
        ...prev,
        ...out.slice(1).map((r) => String(r[0])).filter((n) => !prev.includes(n)),
      ]);
      toast.success(`${count} link berhasil dibuat`);
    } catch {
      toast.error("File tidak bisa dibaca. Gunakan .xlsx, .xls, atau .csv");
    }
  };

  const downloadBulk = async () => {
    if (!bulk) return;
    const XLSX = await import("xlsx");
    XLSX.writeFile(bulk.wb, `${bulk.fileName}-dengan-link.xlsx`);
  };



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

        <div className="mt-6">
          <label className="text-[0.65rem] tracking-[0.15em] text-mocha uppercase">
            Domain undangan
          </label>
          <input
            type="text"
            value={baseInput}
            onChange={(e) => setBaseInput(e.target.value)}
            placeholder="https://domain-kamu.com"
            className="mt-2 w-full rounded-xl border border-input bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-mocha/50 focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <p className="mt-2 text-[0.65rem] text-mocha/60">
            Ganti ke domain final kalau nanti pakai domain sendiri.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-caramel/50 bg-ivory/60 p-4">
          <p className="text-[0.65rem] tracking-[0.15em] text-mocha uppercase">
            Upload daftar tamu (Excel / CSV)
          </p>
          <p className="mt-1 text-[0.7rem] text-mocha/70">
            Tulis nama tamu di kolom pertama. Hasilnya file Excel dengan link di kolom sebelahnya.
          </p>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
            className="mt-3 block w-full text-xs text-mocha file:mr-3 file:rounded-lg file:border-0 file:bg-chocolate file:px-3 file:py-2 file:text-ivory"
          />
          {bulk && (
            <button
              type="button"
              onClick={downloadBulk}
              className="mt-3 w-full rounded-xl bg-caramel px-4 py-3 text-xs tracking-[0.15em] text-ivory uppercase hover:bg-chocolate"
            >
              Download Excel ({bulk.count} link)
            </button>
          )}
        </div>

        <div className="mt-4 flex gap-2">

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
