import bridePhotoAsset from "@/assets/photos/bride.jpg.asset.json";
const bridePhoto = bridePhotoAsset.url;
import groomPhotoAsset from "@/assets/photos/groom.jpg.asset.json";
const groomPhoto = groomPhotoAsset.url;
import g1Asset from "@/assets/photos/g1.jpg.asset.json";
const g1 = g1Asset.url;
import g2Asset from "@/assets/photos/g2.jpg.asset.json";
const g2 = g2Asset.url;
import g3Asset from "@/assets/photos/g3.jpg.asset.json";
const g3 = g3Asset.url;
import g4Asset from "@/assets/photos/g4.jpg.asset.json";
const g4 = g4Asset.url;
import g5Asset from "@/assets/photos/g5.jpg.asset.json";
const g5 = g5Asset.url;
import g6Asset from "@/assets/photos/g6.jpg.asset.json";
const g6 = g6Asset.url;
import weddingSong from "@/assets/audio/wedding-song.mp3.asset.json";

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
    brideFullName: "Intan",
    brideNickname: "Intan",
    brideParents: "Putri kedua dari Bapak Hendra Maheswara & Ibu Retno Wulandari",
    bridePhoto,
    groomName: "Dimas",
    groomFullName: "Dimas",
    groomNickname: "Dimas",
    groomParents: "Putra pertama dari Bapak Budi Adiwijaya & Ibu Sri Handayani",
    groomPhoto,
  },
  event: {
    /* ISO local time of the ceremony — countdown targets this */
    weddingDate: "2026-12-06T08:00:00+07:00",
    weddingDateLabel: "06 . 12 . 2026",
    weddingDayLabel: "Sunday, 6 December 2026",
    akadTime: "08.00 – 10.00 WIB",
    receptionTime: "11.00 – 14.00 WIB",
    venueName: "Pendopo Agung Kusuma",
    venueAddress: "Jl. Melati Raya No. 12, Kotagede, Yogyakarta 55172, Indonesia",
    latitude: -7.8236,
    longitude: 110.3986,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=-7.8236,110.3986",
  },
  media: {
    galleryImages: [
      { src: g1, alt: "Pasangan berjalan di padang saat matahari terbenam", orientation: "landscape" },
      { src: g3, alt: "Pasangan berpelukan di halaman rumah Jawa", orientation: "portrait" },
      { src: g2, alt: "Genggaman tangan pasangan dengan kain batik", orientation: "square" },
      { src: g5, alt: "Mempelai wanita memegang buket bunga kering", orientation: "portrait" },
      { src: g4, alt: "Cincin pernikahan di atas kain sutra krem", orientation: "landscape" },
      { src: g6, alt: "Siluet pasangan saat senja", orientation: "landscape" },
    ] as GalleryImage[],
    /* YouTube URL, MP4 URL, or empty string */
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    videoPoster: g1,
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
      year: "2021",
      title: "First Meet",
      text: "Sebuah pertemuan sederhana di sebuah pameran seni di Yogyakarta, diawali dengan percakapan tentang wayang.",
    },
    {
      year: "2022",
      title: "First Date",
      text: "Kopi sore yang berubah menjadi obrolan panjang sampai lampu jalan menyala satu per satu.",
    },
    {
      year: "2023",
      title: "Growing Together",
      text: "Belajar mendengar, belajar bersabar, dan menemukan rumah pada satu sama lain.",
    },
    {
      year: "2025",
      title: "The Proposal",
      text: "Di bawah langit senja Kotagede, sebuah pertanyaan diajukan dan dijawab dengan air mata bahagia.",
    },
    {
      year: "2026",
      title: "Our Wedding",
      text: "Hari yang kami nantikan, dan kami ingin Anda ada di dalamnya.",
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
    banks: [
      { bank: "Bank Mandiri", holder: "Raka Pratama", number: "1234567890" },
      { bank: "BCA", holder: "Alya Putri", number: "0987654321" },
    ] as BankAccount[],
    /* Replace with your QRIS image URL, or set to "" to hide */
    qris: "",
  },
  dressCode: {
    style: "Formal · Earth Tone",
    note: "Kami mengundang Anda mengenakan nuansa hangat bumi agar hari kami terasa selaras.",
    swatches: [
      { name: "Chocolate", token: "bg-chocolate" },
      { name: "Mocha", token: "bg-mocha" },
      { name: "Caramel", token: "bg-caramel" },
      { name: "Beige", token: "bg-beige" },
      { name: "Cream", token: "bg-cream" },
    ],
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
