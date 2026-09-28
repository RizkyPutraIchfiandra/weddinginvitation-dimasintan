import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Copy, Download, FileSpreadsheet, Link2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { nameToSlug } from "@/lib/guestSlug";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Generator Link Undangan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LinkGenerator,
});

const PUBLISHED_URL = "https://dimas-intan.vercel.app";

function defaultBase() {
  if (typeof window === "undefined") return PUBLISHED_URL;
  const host = window.location.hostname;
  const isPreview =
    host.includes("lovableproject.com") ||
    host.includes("id-preview") ||
    host === "localhost";
  return isPreview ? PUBLISHED_URL : window.location.origin;
}

export type GuestItem = {
  no: number | string;
  name: string;
  related: string;
  bagian: string;
  mempelai: string;
};

const EXCEL_HEADERS = ["No", "Nama", "Related", "Bagian.", "Mempelai", "Link Undangan"] as const;

function LinkGenerator() {
  const [name, setName] = useState("");
  const [related, setRelated] = useState("");
  const [bagian, setBagian] = useState("");
  const [mempelai, setMempelai] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const [guests, setGuests] = useState<GuestItem[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [baseInput, setBaseInput] = useState(defaultBase);

  const baseUrl = useMemo(
    () => baseInput.trim().replace(/\/+$/, ""),
    [baseInput],
  );

  const buildLink = (guestName: string) => `${baseUrl}/${nameToSlug(guestName)}`;

  const [bulk, setBulk] = useState<{ wb: import("xlsx").WorkBook; fileName: string; count: number } | null>(null);

  const handleFile = async (file: File) => {
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(await file.arrayBuffer());
      const ws = wb.Sheets[wb.SheetNames[0] ?? ""];
      if (!ws) throw new Error("no sheet");
      const rows = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1, blankrows: false });
      if (!rows.length) {
        toast.error("File Excel kosong");
        return;
      }

      // Check header row (row 0)
      const row0 = (rows[0] ?? []).map((c) => String(c ?? "").trim());
      const row0Lower = row0.map((c) => c.toLowerCase());

      const hasHeader = row0Lower.some((c) =>
        ["no", "nomor", "nama", "name", "related", "bagian", "bagian.", "mempelai"].includes(c),
      );

      let noIdx = row0Lower.findIndex((c) => c === "no" || c === "nomor");
      let nameIdx = row0Lower.findIndex((c) => ["nama", "name", "nama tamu", "tamu"].includes(c));
      let relatedIdx = row0Lower.findIndex((c) => ["related", "hubungan", "relasi"].includes(c));
      let bagianIdx = row0Lower.findIndex((c) => c.startsWith("bagian"));
      let mempelaiIdx = row0Lower.findIndex((c) => c.includes("mempelai"));

      if (nameIdx === -1) {
        if (row0.length > 1 && !isNaN(Number(row0[0]))) {
          noIdx = 0;
          nameIdx = 1;
          relatedIdx = 2;
          bagianIdx = 3;
          mempelaiIdx = 4;
        } else {
          nameIdx = 0;
        }
      } else {
        if (noIdx === -1 && nameIdx === 1) noIdx = 0;
        if (relatedIdx === -1 && nameIdx === 1 && row0.length > 2) relatedIdx = 2;
        if (bagianIdx === -1 && nameIdx === 1 && row0.length > 3) bagianIdx = 3;
        if (mempelaiIdx === -1 && nameIdx === 1 && row0.length > 4) mempelaiIdx = 4;
      }

      const out: unknown[][] = [[...EXCEL_HEADERS]];
      const parsedGuests: GuestItem[] = [];
      let count = 0;

      const dataRows = rows.slice(hasHeader ? 1 : 0);
      dataRows.forEach((r, idx) => {
        const rawName = nameIdx !== -1 ? String(r?.[nameIdx] ?? "").trim() : "";
        if (!rawName || !nameToSlug(rawName)) return;

        const rawNo =
          noIdx !== -1 && r?.[noIdx] !== undefined && String(r[noIdx]).trim() !== ""
            ? r[noIdx]
            : count + 1;
        const rawRelated = relatedIdx !== -1 ? String(r?.[relatedIdx] ?? "").trim() : "";
        const rawBagian = bagianIdx !== -1 ? String(r?.[bagianIdx] ?? "").trim() : "";
        const rawMempelai = mempelaiIdx !== -1 ? String(r?.[mempelaiIdx] ?? "").trim() : "";

        const link = buildLink(rawName);

        out.push([rawNo, rawName, rawRelated, rawBagian, rawMempelai, link]);
        parsedGuests.push({
          no: rawNo as number | string,
          name: rawName,
          related: rawRelated,
          bagian: rawBagian,
          mempelai: rawMempelai,
        });
        count++;
      });

      if (!count) {
        toast.error("Tidak ada data nama tamu yang valid");
        return;
      }

      const newWb = XLSX.utils.book_new();
      const newWs = XLSX.utils.aoa_to_sheet(out);
      newWs["!cols"] = [
        { wch: 6 },
        { wch: 30 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 60 },
      ];
      XLSX.utils.book_append_sheet(newWb, newWs, "Link Undangan");
      setBulk({ wb: newWb, fileName: file.name.replace(/\.[^.]+$/, ""), count });

      // Merge into guest list without duplicates by name
      setGuests((prev) => {
        const existingNames = new Set(prev.map((g) => g.name.toLowerCase()));
        const toAdd = parsedGuests.filter((g) => !existingNames.has(g.name.toLowerCase()));
        return [...prev, ...toAdd];
      });

      toast.success(`${count} link undangan berhasil dibuat`);
    } catch {
      toast.error("File tidak bisa dibaca. Gunakan format .xlsx, .xls, atau .csv");
    }
  };

  const downloadBulk = async () => {
    if (!bulk) return;
    const XLSX = await import("xlsx");
    XLSX.writeFile(bulk.wb, `${bulk.fileName}-dengan-link.xlsx`);
  };

  const downloadAllGuestsExcel = async () => {
    if (!guests.length) return;
    const XLSX = await import("xlsx");
    const out: unknown[][] = [[...EXCEL_HEADERS]];
    guests.forEach((g, idx) => {
      out.push([
        g.no || idx + 1,
        g.name,
        g.related,
        g.bagian,
        g.mempelai,
        buildLink(g.name),
      ]);
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(out);
    ws["!cols"] = [
      { wch: 6 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 60 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, "Link Undangan");
    XLSX.writeFile(wb, "daftar-undangan-dengan-link.xlsx");
    toast.success("File Excel berhasil diunduh");
  };

  const downloadTemplate = async () => {
    const XLSX = await import("xlsx");
    const out: unknown[][] = [
      [...EXCEL_HEADERS],
      [1, "Bapak Budi & Keluarga", "Teman Kerja", "Divisi IT", "Dimas", ""],
      [2, "Siti Nurhaliza", "Sahabat", "Alumni SMA", "Intan", ""],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(out);
    ws["!cols"] = [
      { wch: 6 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 60 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "template-daftar-undangan.xlsx");
    toast.success("Template Excel berhasil diunduh");
  };

  const addGuest = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (guests.some((g) => g.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Nama sudah ada di daftar");
      return;
    }
    const newGuest: GuestItem = {
      no: guests.length + 1,
      name: trimmed,
      related: related.trim(),
      bagian: bagian.trim(),
      mempelai: mempelai.trim(),
    };
    setGuests((prev) => [...prev, newGuest]);
    setName("");
    setRelated("");
    setBagian("");
    setMempelai("");
  };

  const copyLink = async (guestName: string) => {
    try {
      await navigator.clipboard.writeText(buildLink(guestName));
      setCopied(guestName);
      toast.success(`Link untuk "${guestName}" tersalin`);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  return (
    <main className="paper relative flex min-h-[100svh] items-center justify-center px-6 py-16">
      <div className="glass-card w-full max-w-xl rounded-3xl p-8 sm:p-10">
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

        {/* Upload Excel / CSV Section */}
        <div className="mt-6 rounded-xl border border-dashed border-caramel/50 bg-ivory/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] tracking-[0.15em] text-mocha uppercase">
              Upload daftar tamu (Excel / CSV)
            </p>
            <button
              type="button"
              onClick={downloadTemplate}
              className="inline-flex items-center gap-1.5 text-[0.7rem] text-caramel hover:text-chocolate hover:underline"
            >
              <Download className="size-3.5" />
              Unduh Template
            </button>
          </div>

          <div className="mt-2 rounded-lg bg-cream/60 p-2.5 text-[0.7rem] text-mocha/80">
            <p className="font-medium text-chocolate">Format kolom:</p>
            <p className="mt-0.5 font-mono text-[0.68rem] text-caramel">
              No &nbsp;|&nbsp; Nama &nbsp;|&nbsp; Related &nbsp;|&nbsp; Bagian. &nbsp;|&nbsp; Mempelai &nbsp;|&nbsp; Link Undangan
            </p>
          </div>

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
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-caramel px-4 py-3 text-xs tracking-[0.15em] text-ivory uppercase hover:bg-chocolate"
            >
              <FileSpreadsheet className="size-4" />
              Download Excel Hasil Upload ({bulk.count} link)
            </button>
          )}
        </div>

        {/* Manual Input Form */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="text-[0.65rem] tracking-[0.15em] text-mocha uppercase">
              Tambah Tamu Manual
            </label>
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="text-[0.7rem] text-caramel hover:underline"
            >
              {showDetails ? "Sembunyikan detail" : "+ Rincian (Related, Bagian, Mempelai)"}
            </button>
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGuest()}
              placeholder="Nama tamu, mis. Bapak Hendra & Keluarga"
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

          {showDetails && (
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <div>
                <label className="text-[0.65rem] text-mocha">Related</label>
                <input
                  type="text"
                  value={related}
                  onChange={(e) => setRelated(e.target.value)}
                  placeholder="mis. Rekan Kerja"
                  className="mt-1 w-full rounded-lg border border-input bg-ivory px-3 py-2 text-xs text-espresso placeholder:text-mocha/40 focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[0.65rem] text-mocha">Bagian.</label>
                <input
                  type="text"
                  value={bagian}
                  onChange={(e) => setBagian(e.target.value)}
                  placeholder="mis. Divisi IT"
                  className="mt-1 w-full rounded-lg border border-input bg-ivory px-3 py-2 text-xs text-espresso placeholder:text-mocha/40 focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[0.65rem] text-mocha">Mempelai</label>
                <input
                  type="text"
                  value={mempelai}
                  onChange={(e) => setMempelai(e.target.value)}
                  placeholder="mis. Dimas / Intan"
                  className="mt-1 w-full rounded-lg border border-input bg-ivory px-3 py-2 text-xs text-espresso placeholder:text-mocha/40 focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Guest List Header & Download All */}
        {guests.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs font-medium text-chocolate">
              Daftar Tamu ({guests.length})
            </p>
            <button
              type="button"
              onClick={downloadAllGuestsExcel}
              className="inline-flex items-center gap-1.5 text-xs text-caramel hover:text-chocolate hover:underline"
            >
              <Download className="size-3.5" />
              Download Semua ke Excel
            </button>
          </div>
        )}
{/* Guest List Table for md+ screens */}
<div className="hidden md:block overflow-x-auto mt-4">
  <table className="min-w-full table-auto border-collapse">
    <thead className="bg-ivory">
      <tr>
        {EXCEL_HEADERS.map((header) => (
          <th key={header} className="px-4 py-2 text-left text-xs font-medium text-mocha border border-border">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {guests.map((g, idx) => (
        <tr key={`${g.name}-${idx}`} className="odd:bg-ivory/70">
          <td className="border border-border px-4 py-2 text-sm text-mocha">{g.no || idx + 1}</td>
          <td className="border border-border px-4 py-2 text-sm font-serif text-espresso">{g.name}</td>
          <td className="border border-border px-4 py-2 text-sm text-mocha">{g.related}</td>
          <td className="border border-border px-4 py-2 text-sm text-mocha">{g.bagian}</td>
          <td className="border border-border px-4 py-2 text-sm text-mocha">{g.mempelai}</td>
          <td className="border border-border px-4 py-2 text-xs text-mocha"><a href={buildLink(g.name)} target="_blank" rel="noopener noreferrer" className="text-chocolate underline">{buildLink(g.name)}</a></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        {/* Guest List Cards */}
        <ul className="mt-4 space-y-3 md:hidden">
          {guests.length === 0 && (
            <li className="rounded-xl border border-dashed border-caramel/40 px-4 py-6 text-center text-xs text-mocha/70">
              Belum ada tamu. Upload file Excel atau ketik nama lalu tekan Tambah.
            </li>
          )}
          {guests.map((g, idx) => (
            <li
              key={`${g.name}-${idx}`}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-ivory/70 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-caramel/20 text-[0.65rem] font-semibold text-chocolate">
                    {g.no || idx + 1}
                  </span>
                  <p className="truncate font-serif text-lg text-espresso">{g.name}</p>
                </div>

                {(g.related || g.bagian || g.mempelai) && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5 pl-7">
                    {g.related && (
                      <span className="rounded-full bg-champagne/40 px-2 py-0.5 text-[0.65rem] text-chocolate">
                        {g.related}
                      </span>
                    )}
                    {g.bagian && (
                      <span className="rounded-full bg-caramel/20 px-2 py-0.5 text-[0.65rem] text-chocolate">
                        {g.bagian}
                      </span>
                    )}
                    {g.mempelai && (
                      <span className="rounded-full border border-border bg-ivory px-2 py-0.5 text-[0.65rem] text-mocha">
                        {g.mempelai}
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-1 truncate pl-7 text-[0.65rem] text-mocha/70">
                  {buildLink(g.name)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => copyLink(g.name)}
                  aria-label={`Salin link untuk ${g.name}`}
                  className="grid size-9 place-items-center rounded-lg bg-champagne/40 text-chocolate transition-colors hover:bg-champagne/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {copied === g.name ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setGuests((prev) => prev.filter((item) => item !== g))}
                  aria-label={`Hapus ${g.name}`}
                  className="grid size-9 place-items-center rounded-lg text-mocha/60 transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-mocha/60">
          Link tanpa nama (beranda biasa) tetap menampilkan &quot;Tamu Undangan&quot;.
        </p>
      </div>
    </main>
  );
}
