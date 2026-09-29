/**
 * Guestbook data layer (RSVP + Wishes).
 *
 * The UI only talks to `guestbookStore`. Swap the implementation below for
 * Lovable Cloud / Supabase / Firebase / Google Sheets / a REST API without
 * touching any component.
 */

import { weddingConfig } from "@/data/weddingConfig";

export type Attendance = "hadir" | "tidak-hadir";

export type WishEntry = {
  id: string;
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
  createdAt: string;
};

export type NewWishEntry = Omit<WishEntry, "id" | "createdAt">;

export interface GuestbookStore {
  list(): Promise<WishEntry[]>;
  add(entry: NewWishEntry): Promise<WishEntry>;
}

const STORAGE_KEY = "wedding-guestbook-v1";

const seed: WishEntry[] = [
  {
    id: "seed-1",
    name: "Dimas & Sari",
    attendance: "hadir",
    guests: 2,
    message:
      "Selamat menempuh hidup baru Raka & Alya. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    createdAt: "2026-06-02T09:12:00.000Z",
  },
  {
    id: "seed-2",
    name: "Nadia Puspita",
    attendance: "hadir",
    guests: 1,
    message: "Bahagia selalu untuk kalian berdua. Sampai jumpa di hari bahagia!",
    createdAt: "2026-06-04T14:40:00.000Z",
  },
  {
    id: "seed-3",
    name: "Bagas Herlambang",
    attendance: "tidak-hadir",
    guests: 0,
    message:
      "Maaf belum bisa hadir, namun doa terbaik selalu menyertai perjalanan kalian. Barakallahu lakuma.",
    createdAt: "2026-06-08T03:05:00.000Z",
  },
];

function read(): WishEntry[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as WishEntry[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

function write(entries: WishEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* storage unavailable — keep working in memory */
  }
}

const localStore: GuestbookStore = {
  async list() {
    return read();
  },
  async add(entry) {
    const created: WishEntry = {
      ...entry,
      id: `w-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    const next = [created, ...read()];
    write(next);
    return created;
  },
};

/** Google Apps Script Web App backed store (Google Spreadsheet). */
function sheetsStore(endpoint: string): GuestbookStore {
  return {
    async list() {
      try {
        const res = await fetch(endpoint, { method: "GET" });
        const data = (await res.json()) as { entries?: WishEntry[] };
        return Array.isArray(data.entries) ? data.entries : [];
      } catch {
        return [];
      }
    },
    async add(entry) {
      const created: WishEntry = {
        ...entry,
        id: `w-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
      };
      // text/plain menghindari CORS preflight ke Apps Script
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(created),
      });
      if (!res.ok) throw new Error("Gagal menyimpan ke spreadsheet");
      return created;
    },
  };
}

const endpoint = weddingConfig.integrations.sheetsWebAppUrl;

export const guestbookStore: GuestbookStore = endpoint
  ? sheetsStore(endpoint)
  : localStore;

export function formatWishTime(iso: string, language: "id" | "en" = "id") {
  try {
    return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
