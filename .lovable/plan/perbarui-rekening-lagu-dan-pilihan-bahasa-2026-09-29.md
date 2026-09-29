# Perbarui rekening, lagu, dan pilihan bahasa

## Hasil yang akan dibuat
- Wedding Gift hanya menampilkan satu rekening Bank Mandiri: **1330012957650 a/n Dimas Ichfianto**.
- Lagu undangan memakai file **Sampai Jadi Debu – Piano Version** yang baru diunggah; lagu lama dan aset media yang tidak lagi dipakai dihapus dengan aman.
- Tambahkan tombol **Change Language / Ganti Bahasa** yang tetap mudah dijangkau setelah undangan dibuka.
- Seluruh isi undangan publik tersedia dalam **Bahasa Indonesia** dan **English**, termasuk layar pembuka, profil pasangan, kisah cinta, hitung mundur, detail acara, kalender, galeri, hadiah, RSVP, ucapan, navigasi, pemutar musik, dan penutup.
- Nama tamu, data RSVP, nomor rekening, tanggal, lokasi, dan nama pasangan tidak diterjemahkan atau berubah.

## Perilaku bahasa
- Bahasa awal tetap Bahasa Indonesia.
- Pilihan bahasa berlaku langsung tanpa memuat ulang halaman dan disimpan di perangkat pengunjung.
- Teks Arab QS. Ar-Rum: 21 tetap sama; terjemahannya mengikuti bahasa pilihan.
- Data yang dikirim ke spreadsheet tetap memakai nilai kehadiran standar yang sudah ada agar integrasi tidak rusak.

## Teknis
- Buat satu penyedia bahasa dan kamus terpusat agar terjemahan konsisten dan mudah dirawat.
- Hubungkan komponen undangan publik ke kamus tanpa mengubah halaman pembuat link tersembunyi.
- Gunakan aset CDN untuk lagu baru, lalu hapus pointer lagu lama melalui pengelola aset dan bersihkan file gambar/media yang terbukti tidak direferensikan.
- Perbarui metadata halaman utama dan undangan tamu agar deskripsinya tetap sesuai.
- Uji perpindahan bahasa, pembukaan undangan, pemutar lagu, salin rekening, RSVP, serta tampilan HP dan desktop.
