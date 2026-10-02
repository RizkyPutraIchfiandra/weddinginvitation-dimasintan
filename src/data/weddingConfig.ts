import bridePhotoAsset from "@/assets/photos/Solo1.jpg.asset.json";
import groomPhotoAsset from "@/assets/photos/Solo2.jpg.asset.json";
import bareng1Asset from "@/assets/photos/Bareng1.jpg.asset.json";
import bareng2Asset from "@/assets/photos/Bareng2.jpg.asset.json";
import bareng3Asset from "@/assets/photos/Bareng3.jpg.asset.json";
import bareng4Asset from "@/assets/photos/Bareng4.jpg.asset.json";
import weddingSong from "@/assets/audio/sampai-jadi-debu-piano.mp3";

const bridePhoto = bridePhotoAsset.url;
const groomPhoto = groomPhotoAsset.url;
const bareng1 = bareng1Asset.url;
const bareng2 = bareng2Asset.url;
const bareng3 = bareng3Asset.url;
const bareng4 = bareng4Asset.url;

export type GalleryImage = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape" | "square";
};

export type StoryChapter = { year: string; title: string; text: string; image?: string };

export type BankAccount = { bank: string; holder: string; number: string };

export const weddingConfig = {
  couple: {
    brideName: "Intan",
    brideFullName: "Ai Intan Sunarsih",
    brideNickname: "Intan",
    brideParents: "Putri dari Bapak Suwanta & Ibu Neng Mumun",
    bridePhoto,
    groomName: "Dimas",
    groomFullName: "Dimas Ichfianto",
    groomNickname: "Dimas",
    groomParents: "Putra dari Bapak Ichsananto & Almh. Ibu Fitri Ariana",
    groomPhoto,
  },
  event: {
    /* ISO local time of the ceremony — countdown targets this */
    weddingDate: "2026-12-06T09:00:00+07:00",
    weddingDateLabel: "06 . 12 . 2026",
    weddingDayLabel: "Sunday, 6 December 2026",
    akadTime: "09.00 – selesai WIB",
    receptionTime: "10.00 – 16.00 WIB",
    venueName: "Kediaman Mempelai Wanita",
    venueAddress:
      "Desa Pangulah Baru RT/RW 02/03, Kp. Kaliasin, Kota Baru, Karawang, Jawa Barat (Depan Balai Desa Pangulah Baru)",
    latitude: -6.385077,
    longitude: 107.498802,
    mapsUrl: "https://maps.app.goo.gl/nRW52SoLKEcYsKUv5",
  },
  media: {
    galleryImages: [
      { src: bareng1, alt: "Momen Dimas & Intan 1", orientation: "portrait" },
      { src: bareng2, alt: "Momen Dimas & Intan 2", orientation: "portrait" },
      { src: bareng3, alt: "Momen Dimas & Intan 3", orientation: "portrait" },
      { src: bareng4, alt: "Momen Dimas & Intan 4", orientation: "portrait" },
    ] as GalleryImage[],
    /* Lagu pernikahan (MP3). Dipakai jika spotifyUrl kosong. */
    musicUrl: weddingSong.url,
    /**
     * Link Spotify (track/playlist/album). Contoh:
     * "https://open.spotify.com/track/xxxxxxxxxxxxxxxxxxxxxx"
     * Jika diisi, player Spotify resmi dipakai (tanpa download lagu).
     * Catatan: tanpa login Spotify hanya preview 30 detik, dan tidak bisa autoplay.
     */
    spotifyUrl: "",
  },
  integrations: {
    /**
     * URL Web App Google Apps Script (berakhiran /exec) untuk menyimpan RSVP
     * ke Google Spreadsheet. Kosongkan untuk memakai penyimpanan lokal.
     * Panduan: docs/GOOGLE-SHEETS-RSVP.md
     */
    sheetsWebAppUrl:
      "https://script.google.com/macros/s/AKfycbwT4ZhAIg5zc9wCI2fkw_Gsi_6nUuk6A7jrLrBIrM2CcOsc4LFZzmz7rGLz4tHFIFWwSQ/exec",
  },
  story: [
    {
      year: "JANUARI",
      title: "Sapaan Pertama",
      text: "Semuanya bermula dari sebuah pesan sederhana di bulan Januari, dan segelas es kopi yang manis sekaligus pahit. Awal yang sederhana, namun menjadi awal dari sesuatu yang indah.",
    },
    {
      year: "FEBRUARI",
      title: "Sebuah Janji",
      text: "Di bulan Februari, sebuah pertemuan di bandara berubah menjadi janji untuk melangkah sedikit lebih dekat, bersama-sama.",
    },
    {
      year: "16 AGUSTUS",
      title: "Jawaban \u201cIya\u201d",
      text: "Pada 16 Agustus, kedua keluarga akhirnya dipertemukan, dan Dimas mengajukan pertanyaan paling manis kepada Intan. Jawabannya: \u201cIya.\u201d",
    },
    {
      year: "6 DESEMBER 2026",
      title: "Selamanya Dimulai",
      text: "Dua hati, satu janji, satu perjalanan yang indah — dan seumur hidup untuk dijalani bersama.",
    },
  ] as StoryChapter[],
  quote: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  gift: {
    note: "Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila ingin memberikan tanda kasih, kami menyediakan fitur Wedding Gift.",
    banks: [{ bank: "Bank Mandiri", holder: "Dimas Ichfianto", number: "1330012957650" }] as BankAccount[],
    /* Replace with your QRIS image URL, or set to "" to hide */
    qris: "",
  },
  closing: {
    text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.",
  },
  guest: {
    /* Fallback when ?to= is not present in the URL */
    guestName: "",
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
