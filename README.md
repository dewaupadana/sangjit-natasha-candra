# Undangan Sangjit

Undangan web statis tanpa foto mempelai, dengan halaman sampul berornamen dari foto floral, informasi kedua keluarga, detail acara, dan formulir RSVP.

## Personalisasi undangan

Buka `index.html`, lalu ubah nilai di objek `CONFIG` dekat akhir file:

- `groomNickname` dan `brideNickname`: nama panggilan di cover
- `groomFullName` dan `brideFullName`: nama lengkap di halaman couple dan penutup
- `groomParents` dan `brideParents`: nama orang tua
- `date`, `time`, `venue`, dan `address`: detail acara
- `mapUrl`: tautan lokasi di Google Maps
- `googleSheetsUrl`: URL Web App Apps Script (petunjuk di bawah)

Nama tamu dapat ditampilkan pada sampul menggunakan parameter URL, misalnya `?to=Bapak%20Andi`.

Form RSVP menyediakan pilihan jumlah tamu yang hadir dari 1 sampai 4 orang.
