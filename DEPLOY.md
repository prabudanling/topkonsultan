# Panduan Deploy ke Vercel — PT TOP KONSULTAN INTERNASIONAL

Ditulis untuk pemula. Tidak perlu latar belakang IT — cukup ikuti langkahnya dari atas ke bawah. Semua yang tertulis di sini adalah kondisi nyata, tanpa janji palsu.

---

## 1. Apa yang otomatis jalan di Vercel (tanpa Anda set apa pun)

| Fitur | Status di Vercel |
|---|---|
| Seluruh situs (124 tampilan, katalog perizinan, galeri akreditasi, 23 logo instansi) | ✅ Otomatis jalan |
| Tema ungu-biru, animasi, responsif mobile | ✅ Otomatis jalan |
| Form kontak dengan nomor tiket (TOP-XXXX) | ✅ Jalan — tersimpan di memori server |
| Newsletter | ✅ Jalan — tersimpan di memori server |
| Tombol WhatsApp mengapung (wa.me/6281111165165) | ✅ Otomatis jalan |
| Chat Oracle AI | ⚠️ Jalan dalam **mode cadangan** — tamu diarahkan ke WhatsApp resmi. Untuk AI penuh, isi 1 environment variable (bagian 4) |

**Kejujuran soal database:** Vercel memakai filesystem yang tidak permanen (serverless). Karena itu pesan form kontak tidak tersimpan permanen seperti di komputer lokal. Tiket tetap terbit dan situs tetap berfungsi 100%, tetapi jika Anda ingin pesan tersimpan permanen, ikuti bagian 6 (opsional, ±10 menit).

---

## 2. Siapkan kode di GitHub (jika belum)

1. Buat akun di [github.com](https://github.com) jika belum punya.
2. Buat repository baru, misal `topkonsultan` (Private disarankan).
3. Upload seluruh folder proyek ini ke repository tersebut.

Cara cepat dari terminal (di folder proyek):

```bash
git init
git add .
git commit -m "Situs TOP KONSULTAN siap deploy Vercel"
git branch -M main
git remote add origin https://github.com/USERNAME/topkonsultan.git
git push -u origin main
```

> File sensitif (`.env`, `.z-ai-config`) sudah otomatis dikecualikan lewat `.gitignore` — tidak akan ikut ter-upload.

## 3. Deploy pertama ke Vercel (±3 menit)

1. Buka [vercel.com](https://vercel.com) → **Sign Up with GitHub**.
2. Klik **Add New → Project** → pilih repository `topkonsultan` → **Import**.
3. Biarkan semua pengaturan **default** (Vercel sudah mendeteksi Next.js otomatis dari `vercel.json`).
4. Klik **Deploy** dan tunggu 2–5 menit.
5. Selesai — Anda mendapat alamat seperti `https://topkonsultan.vercel.app`.

Setiap kali Anda `git push` ke GitHub, Vercel **otomatis membangun ulang** situs. Tidak perlu sentuh apa pun lagi.

## 4. Mengaktifkan Oracle AI penuh (1 langkah penting)

Di sandbox lokal, chat Oracle memakai kredensial internal yang **tidak tersedia di Vercel** — itulah sebabnya di Vercel perlu 1 kunci API. Begini caranya:

1. Buka [z.ai](https://z.ai) → daftar akun → masuk ke **Open Platform** (open.z.ai).
2. Buat **API Key** dan salin kuncinya.
3. Di Vercel: buka proyek Anda → **Settings → Environment Variables** → tambah:

   | Name | Value |
   |---|---|
   | `AI_API_KEY` | kunci API dari Z.AI |
   | `AI_MODEL` | `glm-4.6` (terbaik) atau `glm-4.5-flash` (paling hemat) |
   | `AI_BASE_URL` | `https://api.z.ai/api/paas/v4` (bawaan; boleh dikosongkan) |

4. Klik **Deployments → tab terakhir → Redeploy** (wajib agar variabel baru terbaca).

Setelah itu chat Oracle di situs Anda hidup penuh — menjawab pertanyaan perizinan, bisnis, pajak, apa pun, dalam bahasa yang sama dengan penanya.

> Alternatif: variabel ini kompatibel dengan semua penyedia "OpenAI-compatible". Punya kunci OpenAI? Cukup set `AI_BASE_URL=https://api.openai.com/v1` dan `AI_MODEL=gpt-4o-mini`.
>
> Tanpa kunci: chat tetap berfungsi — menjawab dengan mode cadangan + tombol besar **"Chat Tim Manusia via WhatsApp"**. Pengunjung tidak pernah melihat error.

## 5. Ganti nama domain sendiri (opsional)

1. Beli domain (mis. `topkonsultan.web.id` di registrar Indonesia mana pun).
2. Vercel → proyek → **Settings → Domains** → **Add** → ikuti instruksi DNS (biasanya 2 record: `A` ke `76.76.21.21` dan `CNAME` ke `cname.vercel-dns.com`).
3. HTTPS aktif otomatis.

## 6. Opsional: Database permanen (±10 menit)

Agar pesan kontak & newsletter tersimpan permanen:

1. Vercel → proyek → tab **Storage** → **Create Database → Postgres** (paket Hobby gratis).
2. Setelah dibuat, Vercel otomatis menambahkan `DATABASE_URL` (format `postgres://...`).
3. Di `prisma/schema.prisma`, ubah satu baris:
   ```prisma
   datasource db {
     provider = "postgresql"   // sebelumnya "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
4. Jalankan `bun install` lalu commit & push — Vercel membangun ulang otomatis.
5. Selesai. Pesan tersimpan permanen dan bisa dilihat via tab **Data** di Vercel.

> Tanpa langkah ini, situs tetap berfungsi penuh dengan fallback memori — hanya saja pesan tidak tersimpan permanen.

## 7. Memperbarui situs di kemudian hari

Ubah apa pun di komputer, lalu:

```bash
git add .
git commit -m "Update isi situs"
git push
```

Vercel otomatis membangun ulang ±2–5 menit. Selesai.

## 8. Kalau terjadi masalah

| Gejala | Solusi |
|---|---|
| Deploy gagal | Buka tab **Building** di Vercel, baca baris error terakhir; 9 dari 10 kasus karena variabel salah ketik |
| Oracle menjawab mode cadangan terus | Cek `AI_API_KEY` di Environment Variables, lalu **Redeploy** |
| Form kontak tidak terbit tiket | Pastikan tidak ada rate-limit; cek tab **Logs** di Vercel |
| Ubah env var tidak berefek | Selalu **Redeploy** setelah mengubah Environment Variables |

---

**Ringkasan jujur:** Deploy ke Vercel = 0 konfigurasi. AI penuh = 1 environment variable. Database permanen = opsional 10 menit. Selebihnya otomatis.
