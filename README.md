<div align="center">

# PT TOP KONSULTAN INTERNASIONAL

**Konsultan & Perizinan Terlengkap di Dunia — Satu Gerbang untuk Segala Izin dan Kejayaan Bisnis**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fprabudanling%2Ftopkonsultan&env=AI_API_KEY&project-name=topkonsultan&repository-name=topkonsultan)

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Prisma · Z.AI

</div>

---

## Tentang

Website resmi PT TOP KONSULTAN INTERNASIONAL (PUSAT PERIZINAN.ID):

- **124 tampilan halaman** — beranda, katalog 36+ izin (PT/PMA, NIB, BPOM, Halal, SNI, KITAS, PSE, OJK, dll.), 46 Dewan Pakar, industri, wawasan, karier, FAQ
- **Oracle AI** — asisten kecerdasan 46 Dewan Pakar yang menjawab pertanyaan perizinan, bisnis, pajak dalam bahasa apa pun
- **23 logo instansi resmi RI** yang dihadapi langsung (Kemenkumham, BKPM, Kemenkeu, BPOM, OJK, dst.)
- **Galeri akreditasi** dengan foto asli penyerahan sertifikat & kartu indikasi
- **Form kontak bertiket** (TOP-XXXX) + newsletter
- **Tombol WhatsApp mengapung 24/7** ke +62 811-1116-5165
- Tema **ungu-biru** responsif mobile, animasi premium

## Deploy ke Vercel — Tinggal Klik

1. Klik tombol **Deploy with Vercel** di atas (atau import repository ini manual di [vercel.com/new](https://vercel.com/new)).
2. Biarkan semua pengaturan **default** — semuanya sudah terkonfigurasi (`vercel.json`, `postinstall` Prisma, build Next.js).
3. (Opsional tapi disarankan) Isi `AI_API_KEY` saat diminta agar **Oracle AI hidup penuh** — dapatkan kuncinya di [Z.AI Open Platform](https://z.ai). Tanpa kunci ini, chat tetap berjalan dalam mode cadangan yang mengarahkan tamu ke WhatsApp resmi.
4. Klik **Deploy** — selesai dalam 2–5 menit.

Panduan super lengkap untuk pemula: lihat [DEPLOY.md](./DEPLOY.md).

## Environment Variables

| Variabel | Wajib? | Keterangan |
|---|---|---|
| `AI_API_KEY` | Opsional | Mengaktifkan Oracle AI penuh di production (Z.AI / penyedia OpenAI-compatible lain) |
| `AI_BASE_URL` | Opsional | Default `https://api.z.ai/api/paas/v4` |
| `AI_MODEL` | Opsional | Default `glm-4.6` (alternatif hemat: `glm-4.5-flash`) |
| `DATABASE_URL` | Opsional | Default memakai fallback memori; untuk database permanen lihat DEPLOY.md bagian 6 |

## Jalankan Lokal (untuk developer)

```bash
bun install
bun run dev        # buka http://localhost:3000
```

## Struktur

```
src/
  app/            # App Router + API (oracle, contact, newsletter)
  components/
    landing/      # Section beranda (hero, perizinan, akreditasi, agencies, oracle-chat, ...)
    site/         # Halaman hash-router (124 tampilan)
  data/           # brand.ts, offices.ts, content.ts, leadership.ts
public/images/    # Aset branding asli + logo instansi
prisma/           # Schema database
```

## Kontak Resmi

- **WhatsApp / Telepon:** +62 811-1116-5165
- **Email:** halo@topkonsultan.web.id
- **Pusat:** Perumahan Arjamukti Kencana Raya Blok B7 No.2, Leuwisari, Arjasari, Tasikmalaya
- **Cabang:** Perumahan Andalusia Garden Cluster Granada No 11, Mangkubumi, Tasikmalaya, Jawa Barat
- **Jakarta:** Kantor PHI KWITANG · **IPHI Pusat**

---

© PT TOP KONSULTAN INTERNASIONAL — Est. 2001, Tasikmalaya · Jakarta · Melayani 190 Negara
