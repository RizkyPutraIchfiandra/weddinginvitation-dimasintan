import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "id" | "en";

const copy = {
  id: {
    opening: {
      wedding: "The Wedding Of",
      addressed: "Kepada Yth. Bapak/Ibu/Saudara/i",
      guest: "Tamu Undangan",
      open: "Buka Undangan",
      note: "Mohon maaf jika ada kesalahan penulisan nama atau gelar",
      aria: "Pembuka undangan",
    },
    navigation: {
      aria: "Navigasi undangan",
      home: "Beranda",
      couple: "Mempelai",
      story: "Kisah",
      event: "Acara",
      gallery: "Galeri",
      gift: "Hadiah",
      rsvp: "RSVP",
    },
    couple: {
      eyebrow: "Bismillahirrahmanirrahim",
      title: "Mempelai",
      subtitle:
        "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
      groomParents: "Putra dari Bapak Ichsananto & Almh. Ibu Fitri Ariana",
      brideParents: "Putri dari Bapak Suwanta & Ibu Neng Mumun",
    },
    story: {
      eyebrow: "Perjalanan Kami",
      title: "Kisah Kami",
      chapters: [
        { year: "JANUARI", title: "Sapaan Pertama", text: "Semuanya bermula dari sebuah pesan sederhana di bulan Januari, dan segelas es kopi yang manis sekaligus pahit. Awal yang sederhana, namun menjadi awal dari sesuatu yang indah." },
        { year: "FEBRUARI", title: "Sebuah Janji", text: "Di bulan Februari, sebuah pertemuan di bandara berubah menjadi janji untuk melangkah sedikit lebih dekat, bersama-sama." },
        { year: "16 AGUSTUS", title: "Jawaban \u201cIya\u201d", text: "Pada 16 Agustus, kedua keluarga akhirnya dipertemukan, dan Dimas mengajukan pertanyaan paling manis kepada Intan. Jawabannya: \u201cIya.\u201d" },
        { year: "6 DESEMBER 2026", title: "Selamanya Dimulai", text: "Dua hati, satu janji, satu perjalanan yang indah — dan seumur hidup untuk dijalani bersama." },
      ],
    },
    quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    countdown: {
      eyebrow: "Hitung Mundur",
      title: "Menuju Hari Bahagia",
      days: "Hari",
      hours: "Jam",
      minutes: "Menit",
      seconds: "Detik",
    },
    event: {
      eyebrow: "Waktu & Tempat",
      title: "Rangkaian Acara",
      subtitle: "Dengan penuh sukacita, kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami.",
      ceremony: "Akad Nikah",
      reception: "Resepsi",
      day: "Minggu, 6 Desember 2026",
      ceremonyTime: "09.00 – selesai WIB",
      receptionTime: "10.00 – 16.00 WIB",
      venue: "Kediaman Mempelai Wanita",
      address: "Desa Pangulah Baru RT/RW 02/03, Kp. Kaliasin, Kota Baru, Karawang, Jawa Barat (Depan Balai Desa Pangulah Baru)",
      mapTitle: "Peta lokasi",
      directions: "Petunjuk Arah",
      addressButton: "Lihat Alamat",
      calendarHelp: "Satu klik membuka kalender dengan acara yang sudah terisi. Pada iPhone/iPad muncul dialog ‘Tambah ke Kalender’; pada Android atau desktop file .ics akan diunduh dan otomatis terbuka di aplikasi kalender. Pengingat otomatis muncul sehari dan 2 jam sebelum acara.",
      calendarButton: "Simpan ke Kalender",
      calendarTitle: "Pernikahan",
      calendarDescription: "Akad Nikah 09.00 WIB · Resepsi 10.00–16.00 WIB. Kami menantikan kehadiran Anda.",
      alarmDay: "Besok hari pernikahan — jangan lupa hadir!",
      alarmHours: "Acara pernikahan dimulai 2 jam lagi",
    },
    gallery: {
      eyebrow: "Momen Kami",
      title: "Galeri",
      subtitle: "Sekeping cerita yang kami rangkai sebelum hari bahagia tiba.",
      enlarge: "Perbesar foto",
      preview: "Pratinjau foto",
      close: "Tutup",
      previous: "Foto sebelumnya",
      next: "Foto berikutnya",
      photo: "Momen Dimas & Intan",
      qris: "Kode QRIS untuk hadiah pernikahan",
    },
    gift: {
      eyebrow: "Tanda Kasih",
      title: "Hadiah Pernikahan",
      note: "Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila ingin memberikan tanda kasih, kami menyediakan rekening berikut.",
      accountFor: "a.n.",
      copy: "Salin Nomor",
      copied: "Tersalin",
      copySuccess: "Nomor rekening disalin",
      copyError: "Gagal menyalin, silakan salin manual",
    },
    rsvp: {
      eyebrow: "Konfirmasi Kehadiran",
      title: "RSVP & Ucapan",
      subtitle: "Kehadiran dan doa restu Anda sangat berarti bagi kami.",
      name: "Nama",
      namePlaceholder: "Nama Anda",
      attendance: "Kehadiran",
      attending: "Hadir",
      notAttending: "Tidak Hadir",
      guests: "Jumlah Tamu",
      person: "orang",
      wishes: "Ucapan & Doa",
      wishesPlaceholder: "Tuliskan ucapan terbaik Anda...",
      sending: "Mengirim...",
      send: "Kirim Ucapan",
      wishCount: "Ucapan",
      required: "Mohon lengkapi nama dan ucapan Anda",
      success: "Terima kasih, ucapan Anda telah terkirim",
      error: "Gagal mengirim, coba lagi sebentar lagi",
    },
    closing: {
      text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.",
      happy: "Kami yang berbahagia",
    },
    music: { open: "Buka pemutar musik", close: "Tutup pemutar musik", play: "Putar musik", pause: "Jeda musik", title: "Pemutar musik pernikahan" },
    language: { button: "Change Language", aria: "Change language to English" },
  },
  en: {
    opening: {
      wedding: "The Wedding Of",
      addressed: "Dear Mr./Mrs./Family and Friends",
      guest: "Honored Guest",
      open: "Open Invitation",
      note: "Please accept our apologies for any misspelling of names or titles",
      aria: "Wedding invitation opening",
    },
    navigation: {
      aria: "Invitation navigation",
      home: "Home",
      couple: "Couple",
      story: "Story",
      event: "Event",
      gallery: "Gallery",
      gift: "Gift",
      rsvp: "RSVP",
    },
    couple: {
      eyebrow: "In the name of Allah, the Most Gracious, the Most Merciful",
      title: "Meet the Couple",
      subtitle: "By the grace and blessing of Allah SWT, we joyfully invite you to celebrate the marriage of our beloved children.",
      groomParents: "Son of Mr. Ichsananto & the late Mrs. Fitri Ariana",
      brideParents: "Daughter of Mr. Suwanta & Mrs. Neng Mumun",
    },
    story: {
      eyebrow: "Our Journey",
      title: "Our Story",
      chapters: [
        { year: "JANUARY", title: "The First Hello", text: "It began with a little message in January, and a cup of sweet and bitter iced coffee. A simple beginning, yet the start of something beautiful." },
        { year: "FEBRUARY", title: "The Promise", text: "In February, a meeting at the airport turned into a promise to walk a little closer, together." },
        { year: "AUGUST 16", title: "The Yes", text: "On August 16, our families came together, and Dimas asked Intan the sweetest question. Her answer was, \u201cYes.\u201d" },
        { year: "DECEMBER 6, 2026", title: "Forever Begins", text: "Two hearts, one promise, one beautiful journey — and a lifetime to go." },
      ],
    },
    quote: "And among His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you affection and mercy. Surely in this are signs for people who reflect.",
    countdown: {
      eyebrow: "Countdown",
      title: "Until Our Happy Day",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    event: {
      eyebrow: "Time & Place",
      title: "The Celebration",
      subtitle: "With joyful hearts, we invite you to join us and share the happiness of our special day.",
      ceremony: "Wedding Ceremony",
      reception: "Reception",
      day: "Sunday, 6 December 2026",
      ceremonyTime: "9:00 AM – finish (WIB)",
      receptionTime: "10:00 AM – 4:00 PM (WIB)",
      venue: "Bride's Family Residence",
      address: "Pangulah Baru Village, RT/RW 02/03, Kaliasin, Kota Baru, Karawang, West Java (in front of Pangulah Baru Village Hall)",
      mapTitle: "Location map",
      directions: "Directions",
      addressButton: "View Address",
      calendarHelp: "One click opens your calendar with the event pre‑filled. On iPhone/iPad a ‘Add to Calendar’ dialog appears; on Android or desktop the .ics file is downloaded and automatically opened in the calendar app. Reminders are set for one day and two hours before the event.",
      calendarButton: "Add to Calendar",
      calendarTitle: "Wedding of",
      calendarDescription: "Wedding ceremony at 9:00 AM · Reception from 10:00 AM–4:00 PM (WIB). We look forward to celebrating with you.",
      alarmDay: "The wedding is tomorrow — we look forward to seeing you!",
      alarmHours: "The wedding celebration begins in 2 hours",
    },
    gallery: {
      eyebrow: "Our Moments",
      title: "Gallery",
      subtitle: "A collection of memories woven together before our happy day.",
      enlarge: "Enlarge photo",
      preview: "Photo preview",
      close: "Close",
      previous: "Previous photo",
      next: "Next photo",
      photo: "Dimas & Intan moment",
      qris: "QRIS code for the wedding gift",
    },
    gift: {
      eyebrow: "A Token of Love",
      title: "Wedding Gift",
      note: "Your prayers and blessings are the greatest gift to us. Should you wish to send another token of love, our account is provided below.",
      accountFor: "Account holder",
      copy: "Copy Number",
      copied: "Copied",
      copySuccess: "Account number copied",
      copyError: "Unable to copy. Please copy it manually",
    },
    rsvp: {
      eyebrow: "Attendance Confirmation",
      title: "RSVP & Wishes",
      subtitle: "Your presence and blessings mean so much to us.",
      name: "Name",
      namePlaceholder: "Your name",
      attendance: "Attendance",
      attending: "Attending",
      notAttending: "Unable to Attend",
      guests: "Number of Guests",
      person: "guest(s)",
      wishes: "Wishes & Prayers",
      wishesPlaceholder: "Write your warmest wishes...",
      sending: "Sending...",
      send: "Send Wishes",
      wishCount: "Wishes",
      required: "Please enter your name and wishes",
      success: "Thank you, your wishes have been sent",
      error: "Unable to send. Please try again shortly",
    },
    closing: {
      text: "It would be our honor and joy to have you join us and share your blessings on our special day.",
      happy: "With love and gratitude",
    },
    music: { open: "Open music player", close: "Close music player", play: "Play music", pause: "Pause music", title: "Wedding music player" },
    language: { button: "Ganti Bahasa", aria: "Ganti bahasa ke Bahasa Indonesia" },
  },
} as const;

type Copy = (typeof copy)[Language];
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; toggleLanguage: () => void; t: Copy };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  useEffect(() => {
    const saved = window.localStorage.getItem("wedding-language");
    if (saved === "id" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("wedding-language", language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage: () => setLanguage((current) => current === "id" ? "en" : "id"), t: copy[language] }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}