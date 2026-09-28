# Javanese Shadow Tale

Siap. Ini versi full prompt final yang sudah gue gabungkan semuanya, termasuk revisi wayang miring + bergerak diagonal dari bawah ke atas, supaya bisa langsung lu kasih ke AI coding tool.

Buat sebuah website undangan pernikahan digital premium yang elegan, romantis, cinematic, modern, dan memiliki sentuhan budaya Indonesia/Jawa.

Website harus terasa seperti luxury wedding invitation, bukan seperti template undangan generik atau dashboard.

Gunakan React + TypeScript + Vite + Tailwind CSS + Framer Motion dan buat seluruh website benar-benar responsive serta interactive.

---

1. CREATIVE DIRECTION

Tema

Konsep utama:

Modern Luxury Javanese Wedding

Gabungkan:

- Elegant modern wedding

- Traditional Indonesian/Javanese aesthetic

- Wayang kulit

- Floral ornaments

- Warm luxury

- Minimalist editorial design

- Cinematic animation

Website harus terasa:

- romantic

- warm

- elegant

- intimate

- luxurious

- sophisticated

- premium

Jangan membuatnya terlalu ramai.

---

2. COLOR PALETTE

Gunakan warna utama:

- Dark Chocolate Brown

- Chocolate Brown

- Medium Brown

- Light Brown

- Beige

- Cream

- Ivory

- White

Gunakan gradient lembut seperti:

Dark Brown → Chocolate → Beige → Cream → White

Tambahkan sedikit aksen:

- champagne

- muted gold

Gold hanya digunakan sebagai accent tipis, jangan terlalu mencolok.

Hindari:

- neon

- warna terlalu saturated

- gradient berlebihan

- warna pink terang

- UI yang terlihat seperti website SaaS.

---

3. TYPOGRAPHY

Gunakan kombinasi typography:

Wedding Names

Elegant serif / luxury editorial font.

Body

Clean modern sans-serif.

Accent

Optional handwritten/calligraphy font.

Nama pasangan harus menjadi typography paling dominan.

Gunakan hierarchy yang jelas.

---

4. OVERALL VISUAL STYLE

Gunakan:

- lots of whitespace

- soft shadows

- thin borders

- subtle glassmorphism

- elegant rounded corners

- floral ornaments

- organic shapes

- subtle grain texture

- paper texture

- soft light effects

Tambahkan decorative floral elements di beberapa section.

Bunga harus:

- elegant

- thin

- botanical

- subtle

- tidak terlalu ramai.

---

5. OPENING / ONBOARDING

Ini adalah bagian paling penting dan harus menjadi signature visual website.

Saat website pertama kali dibuka, tampilkan full-screen cinematic opening.

Jangan langsung menampilkan seluruh website.

---

BACKGROUND

Gunakan full-screen background:

dark chocolate brown → warm brown → cream gradient

Tambahkan:

- subtle paper texture

- subtle film grain

- soft light

- floral ornaments

- tiny floating particles

- beberapa petals.

---

6. SIGNATURE WAYANG KULIT

Gunakan siluet wayang kulit Jawa tradisional.

Wayang bukan sekadar gambar dekorasi.

Wayang harus menjadi bagian dari animation experience.

Posisi Wayang

Wayang harus berada dalam posisi:

MIRING / DIAGONAL

Jangan berdiri lurus.

Gunakan rotation sekitar:

15–30 degrees

Wayang dapat ditempatkan sedikit:

- ke kiri

  atau

- ke kanan.

Jangan selalu tepat di tengah.

Sebagian tubuh wayang boleh berada di luar viewport.

---

7. INITIAL WAYANG POSITION

Ketika opening pertama kali muncul:

Wayang berada di:

bagian bawah layar

Sebagian besar tubuhnya masih berada di luar viewport.

Contoh visual:

┌──────────────────────────────┐

│                              │

│       THE WEDDING OF         │

│                              │

│         RAKA & ALYA          │

│                              │

│                              │

│                         ╱    │

│                      ╱       │

│                   ╱          │

│                ╱             │

│             ╱                │

└──────────╱───────────────────┘

           WAYANG

Wayang harus terasa seperti baru muncul dari bawah layar.

---

8. WAYANG MOTION

Animasi utama:

BOTTOM → TOP

Tetapi jangan sekadar menggunakan:

"translateY(-100%)"

Gerakannya harus terasa cinematic.

Gunakan kombinasi:

- translateY

- translateX

- rotate

- scale

- opacity

Motion path:

bottom → diagonal upward → upper area

Contohnya:

START

             │

             │

             │

             │

             │

          ╱  │

       ╱     │

    ╱        │

 ╱           │

WAYANG       │

─────────────┘

             ↓

             ╱

           ╱

         ╱

       ╱

     ╱

   ╱

 ╱

Wayang bergerak perlahan dari bawah menuju atas.

---

9. WAYANG ANIMATION FEEL

Gerakan harus terasa seperti:

graceful + slow + cinematic + traditional + luxurious

Gunakan easing seperti:

- easeOutCubic

- easeOutQuint

- custom cubic-bezier

Durasi:

2–3 seconds

Jangan gunakan:

- bounce

- cartoon movement

- elastic berlebihan

- rotation ekstrem.

Saat mencapai posisi akhir, berikan sedikit overshoot lalu settle dengan lembut.

---

10. OPENING ANIMATION SEQUENCE

Urutan opening:

Step 1

Background muncul.

Step 2

Floral ornaments fade-in.

Step 3

Subtle particles/petals mulai bergerak.

Step 4

Wayang muncul dari bawah.

Step 5

Wayang bergerak diagonal dari bawah ke atas.

Step 6

Typography muncul perlahan:

THE WEDDING OF

Step 7

Nama pasangan muncul:

Raka & Alya

Step 8

Tanggal muncul:

12 . 12 . 2026

Step 9

Guest card muncul:

Kepada Yth.

Bapak/Ibu/Saudara/i

[Nama Tamu]

Step 10

Button muncul:

BUKA UNDANGAN

Gunakan staggered animation.

---

11. GUEST PERSONALIZATION

Support URL parameter:

?to=Andi%20Pratama

Jika URL:

?to=Andi%20Pratama

tampilkan:

Kepada Yth.

Bapak/Ibu/Saudara/i

Andi Pratama

Jika tidak ada parameter:

Kepada Yth.

Bapak/Ibu/Saudara/i

Jangan menyebabkan error jika parameter kosong.

---

12. OPEN INVITATION TRANSITION

Ketika user menekan:

BUKA UNDANGAN

Jangan langsung mengganti halaman.

Buat cinematic transition.

Urutan:

1. Button melakukan subtle press animation.

2. Wayang kembali bergerak ke atas.

3. Wayang keluar dari viewport.

4. Floral ornaments fade.

5. Background dark brown berubah perlahan menjadi cream/ivory.

6. Main hero muncul dari bawah dengan smooth reveal.

7. Music mulai dimainkan setelah user interaction.

8. Opening screen menghilang.

Transition harus terasa seperti:

Wayang naik → layar terbuka → wedding invitation revealed.

---

13. HERO SECTION

Hero harus langsung terlihat premium.

Background:

cream / ivory / white.

Gunakan:

brown → cream → white gradient

Tambahkan floral ornaments di:

- top-left

- top-right

- bottom corners.

Isi:

THE WEDDING OF

RAKA & ALYA

12 . 12 . 2026

Tambahkan decorative divider.

Gunakan subtle floating petals.

---

14. COUNTDOWN

Section:

Menuju Hari Bahagia

Realtime countdown:

- DAYS

- HOURS

- MINUTES

- SECONDS

Countdown otomatis menuju tanggal wedding.

Gunakan elegant cards.

Card:

- cream translucent

- subtle border

- soft shadow

- rounded corners.

---

15. QUOTE / VERSE

Buat section minimalis.

Contoh:

«"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."»

— QS. Ar-Rum: 21

Typography elegant.

Tambahkan floral ornament kecil.

---

16. COUPLE SECTION

Title:

Meet The Couple

Tampilkan dua profile:

Bride

- Photo

- Full name

- Nickname

- Parents

Groom

- Photo

- Full name

- Nickname

- Parents

Desktop:

dua profile berdampingan.

Mobile:

stack vertical.

Tambahkan elegant floral divider.

---

17. LOVE STORY

Title:

Our Story

Buat vertical timeline.

Contoh:

2021

First Meet

2022

First Date

2023

Growing Together

2025

The Proposal

2026

Our Wedding

Animation ketika scrolling:

- line reveal

- fade

- slide-up

- image reveal.

---

18. WEDDING EVENT

Title:

Wedding Celebration

Buat dua card.

Akad Nikah

Tanggal:

Saturday, 12 December 2026

Waktu:

08.00 – 10.00 WIB

Resepsi

Tanggal:

Saturday, 12 December 2026

Waktu:

11.00 – 14.00 WIB

Gunakan icon:

- calendar

- clock

- location.

Tambahkan:

Add to Calendar

---

19. LOCATION

Title:

Where To Find Us

Tampilkan:

- Venue Name

- Full Address

- OpenStreetMap

- marker location.

Gunakan:

Leaflet + OpenStreetMap

Map harus:

- interactive

- zoomable

- responsive

- memiliki marker

- popup nama venue.

Tambahkan button:

Open Maps

Gunakan configuration:

VENUE_NAME

VENUE_ADDRESS

LATITUDE

LONGITUDE

GOOGLE_MAPS_URL

Jangan hardcode lokasi asli.

---

20. PHOTO GALLERY

Title:

Our Moments

Gunakan editorial masonry gallery.

Campurkan:

- portrait

- landscape

- square.

Jangan semua gambar memiliki ukuran sama.

Ketika image diklik:

Fullscreen Lightbox

Features:

- next

- previous

- close

- image counter.

Animation:

- fade

- scale

- smooth zoom.

Gunakan lazy loading.

---

21. VIDEO

Title:

Our Video

Buat cinematic video card.

Support:

- YouTube

- MP4

- video URL.

Video:

- rounded corners

- subtle shadow

- poster image.

Video tidak autoplay dengan suara.

---

22. BACKGROUND MUSIC

Tambahkan wedding background music.

Buat floating music player di kanan bawah.

Design:

- circular button

- music icon

- rotating disc/vinyl.

Saat music ON:

disc berputar perlahan.

Saat OFF:

disc berhenti.

Browser autoplay policy harus diperhatikan.

Music baru mulai setelah user menekan:

BUKA UNDANGAN

Tampilkan visual state:

Music ON

Music OFF

Music URL harus configurable.

---

23. WEDDING GIFT

Title:

Wedding Gift

Text:

"Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila ingin memberikan tanda kasih, kami menyediakan fitur Wedding Gift."

Buat elegant bank cards.

Contoh:

Bank Mandiri

Nama:

Raka Pratama

No. Rekening:

1234567890

Button:

Salin Nomor Rekening

BCA

Nama:

Alya Putri

No. Rekening:

0987654321

Button:

Salin Nomor Rekening

Gunakan placeholder.

Ketika copy:

Toast:

Nomor rekening berhasil disalin ✓

Tambahkan optional:

QRIS

Gunakan image placeholder yang mudah diganti.

---

24. RSVP

Title:

RSVP

Form:

Nama

Kehadiran:

- Akan Hadir

- Tidak Dapat Hadir

Jumlah Tamu

Ucapan / Pesan

Button:

Kirim RSVP

Validation harus bekerja.

Setelah submit:

Success state:

Terima kasih atas konfirmasinya 🤍

Architecture harus siap dihubungkan ke:

- Supabase

- Firebase

- Google Sheets

- REST API.

---

25. WEDDING WISHES

Title:

Wedding Wishes

Tampilkan ucapan dari tamu.

Card:

Nama

Pesan

Timestamp

Tambahkan form untuk mengirim ucapan.

Gunakan pagination/infinite scroll jika data banyak.

---

26. OPTIONAL DRESS CODE

Title:

Dress Code

Contoh:

Formal

Earth Tone

Brown / Beige / Cream

Tampilkan color swatches.

---

27. FLORAL ANIMATIONS

Gunakan floral elements sebagai decorative layer.

Bunga dan daun dapat:

- fade-in

- float

- slow parallax

- move slightly ketika scroll.

Tambahkan beberapa falling petals.

Tetap subtle.

Jangan mengganggu text.

---

28. SCROLL ANIMATIONS

Semua section memiliki scroll reveal.

Gunakan:

- fade-in

- slide-up

- scale

- parallax

- stagger

- image reveal

Animasi:

slow + smooth + elegant

Jangan membuat website terasa seperti gaming website.

Support:

"prefers-reduced-motion"

Jika enabled, kurangi animation.

---

29. NAVIGATION

Buat floating navigation.

Desktop:

Home

Couple

Story

Event

Gallery

Gift

RSVP

Mobile:

gunakan bottom navigation compact.

Navigation harus:

- sticky/floating

- translucent

- blur

- elegant

- responsive.

Gunakan smooth scrolling.

---

30. RESPONSIVE DESIGN

Mobile-first.

Support:

360px

390px

414px

768px

1024px

1440px+

Pastikan:

- no horizontal overflow

- text tidak terpotong

- button mudah ditekan

- gallery responsive

- map responsive

- navigation responsive

- wayang tidak menutupi text.

Pada mobile, wayang tetap:

miring + diagonal + bottom → top

---

31. WAYANG RESPONSIVE

Mobile:

- scale down sesuai viewport.

- tetap diagonal.

- sebagian body boleh keluar layar.

- jangan menutupi nama pasangan.

Desktop:

- ukuran lebih besar.

- lebih off-center.

- gunakan parallax.

Wayang harus tetap menjadi focal decorative element.

---

32. CENTRAL CONFIG

Semua wedding data harus berada di satu file:

src/data/weddingConfig.ts

Struktur kira-kira:

couple

  brideName

  brideFullName

  brideParents

  bridePhoto

  groomName

  groomFullName

  groomParents

  groomPhoto

event

  weddingDate

  akadTime

  receptionTime

  venueName

  venueAddress

  latitude

  longitude

  mapsUrl

media

  galleryImages

  videoUrl

  musicUrl

gift

  banks

  qris

guest

  guestName

Jangan menyebarkan data wedding ke banyak component.

Semua harus mudah diganti.

---

33. COMPONENT ARCHITECTURE

Gunakan struktur:

src/

├── components/

│   ├── OpeningScreen/

│   ├── Hero/

│   ├── Countdown/

│   ├── Quote/

│   ├── Couple/

│   ├── LoveStory/

│   ├── Event/

│   ├── Location/

│   ├── Gallery/

│   ├── Video/

│   ├── Gift/

│   ├── RSVP/

│   ├── Wishes/

│   ├── MusicPlayer/

│   ├── Navigation/

│   └── FloralDecorations/

│

├── data/

│   └── weddingConfig.ts

│

├── assets/

│   ├── flowers/

│   ├── wayang/

│   ├── photos/

│   └── music/

│

└── App.tsx

Gunakan reusable components.

---

34. TECH STACK

Gunakan:

- React

- TypeScript

- Vite

- Tailwind CSS

- Framer Motion

- Lucide React

- Leaflet

- OpenStreetMap

- React Hook Form

- Zod

Gunakan clean architecture.

---

35. PERFORMANCE

Optimalkan:

- lazy loading images

- responsive images

- lazy loading video

- compressed assets

- efficient animations

- CSS transforms

- avoid unnecessary re-renders

- optimized fonts.

Target:

Excellent Lighthouse Performance

---

36. ACCESSIBILITY

Implement:

- semantic HTML

- alt text

- keyboard navigation

- focus state

- aria-label

- sufficient contrast

- reduced motion support.

---

37. FINAL CLOSING

Buat final section:

Terima Kasih

"Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu."

Raka & Alya

Tambahkan:

- large floral ornament

- subtle wayang silhouette

- cream background

- elegant typography.

---

38. FINAL PAGE FLOW

Urutan:

OPENING / ONBOARDING

↓

HERO

↓

COUNTDOWN

↓

QUOTE

↓

COUPLE

↓

LOVE STORY

↓

EVENT

↓

LOCATION + OPENSTREETMAP

↓

GALLERY

↓

VIDEO

↓

WEDDING GIFT

↓

RSVP

↓

WEDDING WISHES

↓

DRESS CODE

↓

CLOSING

---

39. MOST IMPORTANT VISUAL REQUIREMENT

Jangan membuat website ini terlihat seperti template AI biasa.

Prioritaskan art direction.

Signature visual website adalah:

WAYANG KULIT JAWA YANG MIRING/DIAGONAL, MUNCUL DARI BAWAH LAYAR, BERGERAK PERLAHAN KE ATAS SECARA DIAGONAL, DENGAN SUBTLE ROTATION, PARALLAX, DAN CINEMATIC EASING.

Opening harus terasa seperti sebuah cinematic wedding intro.

Bayangkan perpaduan:

Traditional Javanese Shadow Puppet × Luxury Wedding Editorial × Cinematic Motion Design × Warm Chocolate & Cream Palette

Website harus terasa mahal, intimate, elegant, romantic, dan memorable.

Jangan mengorbankan aesthetics demi terlalu banyak fitur. Semua fitur harus tetap memiliki visual hierarchy yang bersih.

Jika asset asli belum tersedia, gunakan placeholder yang mudah diganti dan buat semua functionality tetap berjalan.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ddb977e1-5aa2-4974-9e33-23ae691e6a5c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
