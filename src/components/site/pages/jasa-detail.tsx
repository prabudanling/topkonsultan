"use client";

/**
 * /jasa/{kategori}/{slug} — halaman detail satu layanan dari 500 katalog.
 * Konten kaya per layanan: deskripsi, ruang lingkup 6 poin, proses 5 fase,
 * persyaratan, FAQ 3 pertanyaan, layanan terkait — semuanya berparameter
 * data layanan sehingga setiap halaman unik di mata mesin pencari.
 */

import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BadgeCheck, CalendarClock, CheckCircle2,
  ClipboardList, Clock, FileCheck2, Gauge, Landmark, ListChecks, Sparkles,
} from "lucide-react";
import { JASA_CATEGORIES, findJasa, findJasaCategory, jasaInCategory } from "@/data/jasa";
import { Link } from "@/lib/router";
import { EASE } from "@/components/landing/motion";
import { BRAND } from "@/data/brand";
import { Breadcrumb, CTABand, LinkButton, Ornament } from "@/components/site/ui";
import { JASA_CATEGORY_ICONS } from "@/components/site/pages/jasa";

export default function JasaDetailPage({ slug }: { slug: string }) {
  const item = findJasa(slug);
  if (!item) return null;

  const cat = findJasaCategory(item.cat);
  const Icon = JASA_CATEGORY_ICONS[item.cat] ?? ListChecks;
  const related = jasaInCategory(item.cat).filter((s) => s.slug !== item.slug).slice(0, 3);
  const catIndex = JASA_CATEGORIES.findIndex((c) => c.id === item.cat) + 1;

  const facts = [
    { icon: Landmark, label: "Instansi / Otoritas", value: item.agency },
    { icon: Clock, label: "Estimasi Penyelesaian", value: item.timeline },
    { icon: ClipboardList, label: "Kategori Layanan", value: cat?.name ?? "Perizinan" },
    { icon: Gauge, label: "Status Katalog", value: `${catIndex} dari 33 kategori` },
  ];

  /* Ruang lingkup — 6 poin berparameter layanan. */
  const scope = [
    `Konsultasi awal & analisis kelayakan ${item.title.toLowerCase()} untuk profil usaha Anda — gratis, tanpa komitmen.`,
    `Penyusunan dan pengumpulan seluruh dokumen persyaratan sesuai standar ${item.agency.split(" · ")[0]}.`,
    `Pengajuan resmi ${item.title.toLowerCase()} beserta pemantauan status hingga terbit.`,
    `Komunikasi dan klarifikasi dengan ${item.agency.split(" · ")[0]} saat verifikasi atau revisi diminta.`,
    `Penyerahan dokumen hasil — lengkap, tercatat, dan siap dipakai untuk operasional, bank, atau tender.`,
    `Pendampingan pasca-terbit (pelaporan berkala, perpanjangan, dan perubahan data) — kewajiban tidak menggantung.`,
  ];

  /* Proses 5 fase — protokol kerja baku dewan pakar. */
  const process = [
    { step: "01", text: `Orientasi & diagnosa: wawancara kebutuhan, pemeriksaan legalitas eksisting, dan penetapan jalur tercepat untuk ${item.title.toLowerCase()}.` },
    { step: "02", text: `Penghimpunan dewan: penugasan pakar kategori ${cat?.name.toLowerCase()} yang paling sesuai dengan sektor dan skala usaha Anda.` },
    { step: "03", text: `Penyiapan dokumen: penyusunan, pengumpulan, dan quality control internal sebelum berkas menyentuh meja ${item.agency.split(" · ")[0]}.` },
    { step: "04", text: `Eksekusi pengurusan: pengajuan resmi, pemantauan status harian, dan respons revisi — Anda menerima laporan kemajuan berkala.` },
    { step: "05", text: `Serah terima & pemeliharaan: dokumen terbit diserikan lengkap dengan kalender kepatuhan lanjutan (laporan & perpanjangan).` },
  ];

  /* FAQ — 3 pertanyaan berparameter layanan. */
  const faqs = [
    {
      q: `Berapa lama pengurusan ${item.title.toLowerCase()}?`,
      a: `Estimasi baku kami ${item.timeline} sejak dokumen lengkap — kecepatan riel bergantung pada kecepatan respons instansi ${item.agency.split(" · ")[0]} dan kelengkapan berkas Anda. Sejak hari pertama Anda menerima peta jalan berjenjang sehingga tidak ada kejutan tenggang waktu.`,
    },
    {
      q: `Apa saja dokumen yang harus saya siapkan?`,
      a: `Dokumen dasar kategori ${cat?.name.toLowerCase()} meliputi ${cat?.requirements.slice(0, 3).join(", ").toLowerCase()}, dan sebagainya. Setelah konsultasi awal, tim kami mengirim daftar dokumen spesifik untuk ${item.title.toLowerCase()} — lengkap dengan contoh format dan catatan kesalahan umum yang harus dihindari.`,
    },
    {
      q: `Bagaimana skema biayanya?`,
      a: `Biaya mengikuti kompleksitas profil usaha, lokasi, dan urgensi. Kami bekerja dengan penawaran transparan sejak awal — tanpa biaya tersembunyi di tengah jalan. Konsultasi awal selalu gratis, dan sejak 2001 lebih dari 12.000 penugasan kami selesaikan dengan tingkat keberhasilan 99,97%.`,
    },
  ];

  return (
    <article>
      {/* Hero */}
      <section className="noise-overlay relative overflow-hidden pb-12 pt-36 sm:pt-40">
        <div
          className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_25%,black_25%,transparent_80%)]"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-violet-600/15 blur-[120px]" />
          <div className="absolute right-[5%] top-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Beranda", to: "/" },
              { label: "500 Jasa Perizinan", to: "/jasa" },
              ...(cat ? [{ label: cat.name, to: `/jasa/${cat.id}` }] : []),
              { label: item.title },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300 bg-violet-50 text-violet-600">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            {item.populer ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                Layanan Unggulan
              </span>
            ) : null}
            {cat ? (
              <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                {cat.name}
              </span>
            ) : null}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl"
          >
            {item.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700"
          >
            {item.enTitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
          >
            {item.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease: EASE }}
            className="mt-8"
          >
            <LinkButton to="/contact" withArrow>
              Mulai Konsultasi Gratis
            </LinkButton>
          </motion.div>
        </div>
      </section>

      {/* Fakta utama */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Fakta kunci layanan">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/80 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => {
            const FactIcon = f.icon;
            return (
              <div key={f.label} className="flex items-start gap-3.5 bg-white/70 p-5 backdrop-blur">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
                  <FactIcon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{f.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-slate-800">{f.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Deskripsi & ruang lingkup */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-label="Ruang lingkup layanan">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Yang Kami Kerjakan untuk Anda
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {item.title} bukan sekadar pengurusan dokumen — ia adalah pintu masuk
              legalitas yang menentukan kecepatan seluruh operasional bisnis Anda
              di {cat?.name.toLowerCase()}. Satu kesalahan kecil pada berkas dapat
              berarti hitungan minggu tambahan; sebaliknya, berkas yang disiapkan
              presisi sejak awal kerap lolos pada siklus penelaahan pertama.
              Tim kami mengurus {item.title.toLowerCase()} dari analisis kelayakan
              hingga dokumen resmi terbit, dengan {item.agency.split(" · ")[0]} sebagai
              lawan dialog utama dan estimasi {item.timeline} yang dihitung dari
              pengalaman lapangan nyata.
            </p>
            <ul className="mt-7 space-y-3.5">
              {scope.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-600" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Persyaratan umum */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
                <FileCheck2 className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-base font-bold text-slate-900">
                Persyaratan Umum
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {(cat?.requirements ?? []).map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-400">
              Daftar final disesuaikan profil usaha Anda setelah konsultasi awal gratis.
            </p>
            <div className="mt-5">
              <LinkButton to="/contact" variant="ghost">
                Minta Daftar Dokumen
              </LinkButton>
            </div>
          </aside>
        </div>
      </section>

      {/* Proses 5 fase */}
      <section className="relative overflow-hidden py-16" aria-label="Proses pengerjaan">
        <Ornament className="absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Protokol 5 Fase Dewan Pakar
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Setiap penugasan {item.title.toLowerCase()} dijalankan lewat protokol baku
            yang sama dengan penugasan korporat besar — proporsional terhadap skala
            usaha Anda, tanpa langkah yang dilewati.
          </p>
          <ol className="mt-9 space-y-4">
            {process.map((p) => (
              <motion.li
                key={p.step}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur"
              >
                <span className="font-display text-2xl font-black text-violet-300" aria-hidden="true">
                  {p.step}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6" aria-label="Pertanyaan umum layanan">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Pertanyaan yang Sering Diajukan
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur transition-colors open:border-violet-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-800">
                {f.q}
                <BadgeCheck className="h-4 w-4 shrink-0 text-violet-500 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3.5 border-t border-slate-200 pt-3.5 text-sm leading-relaxed text-slate-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Layanan terkait */}
      {related.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Layanan terkait">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Layanan Terkait — {cat?.name}
            </h2>
            <Link
              to={`/jasa/${item.cat}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:text-violet-700"
            >
              Lihat semua {jasaInCategory(item.cat).length} layanan kategori ini
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((svc) => (
              <Link
                key={svc.slug}
                to={`/jasa/${svc.cat}/${svc.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.22)]"
              >
                <h3 className="font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
                  {svc.title}
                </h3>
                <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {svc.desc}
                </p>
                <div className="mt-3.5 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px]">
                  <span className="line-clamp-1 font-medium text-slate-500">{svc.agency}</span>
                  <span className="flex shrink-0 items-center gap-1 font-semibold text-violet-700">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {svc.timeline}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CTABand
        title={
          <>
            {item.title} hari ini.{" "}
            <span className="text-gradient-gold">Dokumen resmi di tangan Anda.</span>
          </>
        }
        sub={`Konsultasi awal gratis via WhatsApp ${BRAND.phone} — aktif 24/7, dijawab pakar manusia, bukan bot. Wawasan pertama tiba dalam 48 jam.`}
      />

      {/* Kembali */}
      <div className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <Link
          to={`/jasa/${item.cat}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke {cat?.name ?? "katalog"}
        </Link>
      </div>
    </article>
  );
}
