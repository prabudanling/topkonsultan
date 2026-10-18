/**
 * src/data/jasa/categories.ts — 33 kategori Katalog 500 Jasa.
 * Setiap kategori membawa pengantar & daftar persyaratan umum yang
 * diwariskan ke seluruh halaman layanan di dalamnya (SEO unik per kategori).
 */

import type { JasaCategory } from "./types";

export const JASA_CATEGORIES: JasaCategory[] = [
  {
    id: "badan-usaha",
    name: "Pendirian & Legalitas Badan Usaha",
    enName: "Entity Formation & Corporate Legalities",
    intro:
      "Fondasi hukum seluruh bisnis: dari PT lokal, PT PMA dengan modal asing, CV, koperasi, hingga yayasan — termasuk perubahan akta, merger, akuisisi, hingga pembubaran yang rapi tanpa utang regulasi.",
    requirements: [
      "KTP & NPWP para pendiri/pengurus",
      "Pas foto terbaru pemegang saham",
      "Alamat domisili usaha (bukti kepemilikan/sewa)",
      "Rencana kegiatan usaha (KBLI 2020)",
      "Struktur permodalan & susunan pengurus",
    ],
  },
  {
    id: "oss-nib",
    name: "OSS RBA, NIB & Identitas Fiskal",
    enName: "OSS RBA, NIB & Tax Identity",
    intro:
      "Jantung perizinan era berbasis risiko: akun OSS, penerbitan NIB, penetapan tingkat risiko KBLI, laporan tahunan, NPWP, dan PKP — dikerjakan akurat sejak input pertama agar tidak mengulang dua tahun kemudian.",
    requirements: [
      "Akun OSS RBA aktif (NIK pemilik/pengurus)",
      "NIB atau data badan usaha existing",
      "Dokumen kegiatan usaha & KBLI",
      "Alamat usaha sesuai NIB",
      "Data pemegang saham terbaru",
    ],
  },
  {
    id: "perdagangan",
    name: "Perdagangan, Distribusi & Waralaba",
    enName: "Trade, Distribution & Franchise",
    intro:
      "Rantai pasok yang sah: SIUP, izin importir (API), izin ekspor, waralaba & STPW, retail modern, restoran, hingga minuman beralkohol — dari gudang pertama hingga gerai ke-100.",
    requirements: [
      "NIB & akta badan usaha",
      "Alamat gudang/toko/gerai aktif",
      "Dokumen produk yang diperdagangkan",
      "Perjanjian distribusi/waralaba (bila ada)",
      "NPWP & bukti PKP untuk transaksi besar",
    ],
  },
  {
    id: "bpom",
    name: "BPOM, Pangan & Produk Konsumen",
    enName: "BPOM, Food & Consumer Products",
    intro:
      "Izin edar seluruh produk terkontrol: makanan olahan (MD/ML), obat, obat tradisional, suplemen, kosmetik, air minum kemasan, hingga maklon dan CPOTB/CPPOB — rute registrasi yang tepat di percobaan pertama.",
    requirements: [
      "NIB & profil badan usaha (CPOP industri)",
      "Data produk: komposisi, kemasan, label",
      "Sertifikat keamanan/hasil uji lab",
      "Alur produksi & CPOTB/CPPOB (bila diwajibkan)",
      "Appointment local agent untuk produk impor",
    ],
  },
  {
    id: "halal",
    name: "Sertifikasi Halal BPJPH",
    enName: "Halal Certification (BPJPH)",
    intro:
      "Wajib halal 2026 sudah di depan mata: sertifikasi produk reguler, jalur self-declare UMKM, pendampingan proses PPSH, audit LPH, hingga sidang fatwa — kami antarkan sampai label halal menempel di kemasan Anda.",
    requirements: [
      "NIB & data produk/bahan",
      "Daftar bahan & pemasok (bahan kritis)",
      "Alur proses produksi (flow chart)",
      "Sistem Jaminan Produk Halal (SJPH) dasar",
      "Nama penanggung jawab halal internal",
    ],
  },
  {
    id: "lingkungan",
    name: "Izin Lingkungan & AMDAL",
    enName: "Environmental Permits & AMDAL",
    intro:
      "Keselarasan proyek dengan regulasi: AMDAL, UKL-UPL, SPPL, izin pembuangan air limbah & emisi, PROPER, hingga reklamasi — dokumen teknis yang lolos penelaahan pada siklus pertama.",
    requirements: [
      "NIB & data lokasi usaha (koordinat)",
      "Peta & dokumen teknis kegiatan",
      "Data bahan baku, emisi, dan limbah",
      "Rencana pengelolaan & pemantauan lingkungan",
      "Bukti kapasitas produksi",
    ],
  },
  {
    id: "bangunan",
    name: "Bangunan & Pertanahan",
    enName: "Building & Land Titles",
    intro:
      "Dari lahan ke bangunan berdiri: PBG, SLF, konversi IMB, as-built drawing, sertifikat hak tanah (SHM/HGB/HGU), balik nama, hingga sertifikasi bangunan hijau — satu tangan untuk seluruh siklus properti.",
    requirements: [
      "Sertifikat tanah/bukti hak atas lahan",
      "Gambar teknis & perhitungan struktural",
      "Dokumen perencana (arsitek/insinyur bersertifikat)",
      "KDB/KLB & kesesuaian RDTR/zonasi",
      "As-built drawing untuk bangunan eksisting",
    ],
  },
  {
    id: "k3",
    name: "K3 — Keselamatan & Kesehatan Kerja",
    enName: "Occupational Health & Safety (K3)",
    intro:
      "Kepatuhan K3 bukan formalitas: sertifikasi SMK3 PP 50/2012, para ahli K3 lintas bidang, SIO operator pesawat, P3K, hirark, hingga uji berkala — melindungi pekerja sekaligus melindungi perusahaan dari sanksi.",
    requirements: [
      "NIB & data perusahaan/lokasi kerja",
      "Daftar pekerja & klasifikasi bahaya",
      "Data pesawat/mesin yang dioperasikan",
      "Ahli K3 yang ditunjuk perusahaan",
      "Rekam jejak kecelakaan kerja (bila ada)",
    ],
  },
  {
    id: "iso",
    name: "Sertifikasi ISO & Sistem Manajemen",
    enName: "ISO & Management System Certification",
    intro:
      "22 standar internasional satu atap: ISO 9001, 14001, 45001, 22000/HACCP/FSSC, 27001, 13485, IATF 16949, hingga SA8000 & SMETA — dari gap analysis, penyusunan dokumen, internal audit, hingga sertifikasi badan global.",
    requirements: [
      "Scope & proses bisnis yang akan disertifikasi",
      "Dokumen sistem mutu existing (bila ada)",
      "Ketersediaan internal auditor terlatih",
      "Data kinerja & catatan proses 3 bulan terakhir",
      "Komitmen manajemen puncak (policy K3/mutu)",
    ],
  },
  {
    id: "akreditasi",
    name: "Akreditasi KAN, BNSP & Lembaga",
    enName: "Accreditation: KAN, BNSP & Institutions",
    intro:
      "Tiket masuk dunia pengujian & sertifikasi: akreditasi ISO/IEC 17025 (uji & kalibrasi), 17020, 17065, 17024, ISO 15189 lab medik, akreditasi LSP BNSP, LPH halal, hingga afiliasi internasional ILAC/IAF.",
    requirements: [
      "Profil laboratorium/lembaga & scope rinci",
      "Sistem manajemen sesuai standar akreditasi",
      "Data validasi metode & ketertelusuran",
      "Personel kompeten dengan sertifikat pelatihan",
      "Partisipasi uji profisiensi (bila relevan)",
    ],
  },
  {
    id: "iata-penerbangan",
    name: "IATA, Penerbangan & Travel",
    enName: "IATA, Aviation & Travel",
    intro:
      "Gerbang tunggal industri penerbangan: akreditasi IATA Cargo Agent & Travel Agency, CASS/BSP, pelatihan DGR dan sertifikasi IATA/FIATA, izin usaha kargo udara, ground handling, AOC, hingga lisensi kru — standar dunia dari Jakarta.",
    requirements: [
      "NIB & legalitas badan usaha penerbangan/travel",
      "Profil operasional & jumlah staf bersertifikat",
      "Pengalaman/skop layanan yang dijual",
      "Financial standing & rekening korporasi",
      "Staf yang akan mengikuti pelatihan bersertifikasi",
    ],
  },
  {
    id: "imigrasi",
    name: "Imigrasi, Visa & Tenaga Kerja Asing",
    enName: "Immigration, Visas & Foreign Manpower",
    intro:
      "Pintu masuk talenta & investor global: RPTKA, notifikasi TKA, VITAS/ITAS/ITAP, Golden Visa, Second Home Visa, E33G remote worker, visa pelajar-riset, hingga NIK WNA — proses imigrasi yang cepat dan patuh aturan.",
    requirements: [
      "Paspor pemohon (masa berlaku cukup)",
      "Legalitas penjamin/perusahaan di Indonesia",
      "Jabatan & kualifikasi yang diusulkan",
      "Bukti keuangan/pendapatan (untuk visa tertentu)",
      "Dokumen kesehatan & asuransi (bila diwajibkan)",
    ],
  },
  {
    id: "investasi",
    name: "Investasi & Fasilitas BKPM",
    enName: "Investment & BKPM Facilities",
    intro:
      "Struktur investasi yang menguntungkan: Positive Investment List, tax holiday & allowance, super deduction, KEK, kawasan industri, KPBU, LKPM, hingga fasilitasi rapat layanan BKPM — insentif yang seharusnya Anda dapat.",
    requirements: [
      "Proyeksi investasi & bidang usaha (KBLI)",
      "Struktur permodalan (PMA/PMDN)",
      "Dokumen studi kelayakan ringkas",
      "NIB penanaman modal",
      "Rencana penyerapan tenaga kerja",
    ],
  },
  {
    id: "hki",
    name: "Kekayaan Intelektual (HKI)",
    enName: "Intellectual Property Rights",
    intro:
      "Perisai aset tak berwujud: pendaftaran merek & jalur Madrid, paten & PCT, desain industri, hak cipta, indikasi geografis, varietas tanaman, rahasia dagang, hingga monitoring pengawalan publikasi HKI.",
    requirements: [
      "Identitas pemilik/pemohon (KTP, NPWP, akta)",
      "Contoh/logo/spesifikasi objek HKI",
      "Daftar kelas barang/jasa (merek)",
      "Dokumen deskripsi & klaim (paten/desain)",
      "Prioritas luar negeri (bila mengklaim konvensi)",
    ],
  },
  {
    id: "pajak",
    name: "Pajak & Kepatuhan Fiskal",
    enName: "Tax & Fiscal Compliance",
    intro:
      "Pajak yang seharusnya tidak lebih besar dari kewajiban Anda: SPT tahunan, e-FIN, e-Bupot, PPh final UMKM, transfer pricing, keberatan & banding, restitusi, hingga pendampingan pemeriksaan pajak.",
    requirements: [
      "NPWP & akun DJP (e-FIN) aktif",
      "Laporan keuangan periode berjalan",
      "Bukti transaksi & dokumen pendukung",
      "Data transaksi pihak berhubungan istimewa",
      "Surat ketetapan/surat tagihan (bila dalam sengketa)",
    ],
  },
  {
    id: "energi-migas",
    name: "Energi, Migas & Mineral",
    enName: "Energy, Oil, Gas & Mining",
    intro:
      "Sektor dengan regulasi paling berlapis: IUPTL, niaga BBM, izin penyimpanan & pengangkutan migas, IUP eksplorasi-produksi-pengolahan, RKAB, DMO, hingga verifikasi Clean & Clear — kami peta kanannya dari hulu.",
    requirements: [
      "NIB & bidang usaha energi/minerba",
      "Data wilayah/concession (koordinat & luas)",
      "Rencana kerja & teknis kegiatan",
      "Modal & bukti kemampuan finansial",
      "Dokumen lingkungan (AMDAL/UKL-UPL)",
    ],
  },
  {
    id: "kehutanan",
    name: "Kehutanan & Perkebunan",
    enName: "Forestry & Plantations",
    intro:
      "Legalitas hutan & sawit yang bisa diaudit: IUPHHK, SVLK/S-Legal, FSC/PEFC, ISPO/RSPO, izin industri kayu, IUP perkebunan & pabrik, hingga SKSHH — rantai pasok dari hutan hingga ekspor.",
    requirements: [
      "NIB & data wilayah kegiatan (peta)",
      "Rencana kerja & silvikultur/tata guna",
      "Dokumen AMDAL/lingkungan kegiatan",
      "Rantai pasok & asal bahan (untuk olahan)",
      "Data pekerja & sarana produksi",
    ],
  },
  {
    id: "pertanian",
    name: "Pertanian, Peternakan & Karantina",
    enName: "Agriculture, Livestock & Quarantine",
    intro:
      "Dari benih ke meja makan: izin usaha benih, pupuk & pestisida, sertifikasi organik, GLOBALG.A.P. & GAP, karantina tumbuhan/hewan, izin pakan & obat hewan, RPH, hingga sertifikasi fumigasi dan POPT.",
    requirements: [
      "NIB & lokasi usaha pertanian/peternakan",
      "Data lahan, sarana, & kapasitas produksi",
      "Spesifikasi produk/benih/pakan",
      "Sertifikat benih/asal bibit",
      "Rencana karantina untuk produk lintas wilayah",
    ],
  },
  {
    id: "perikanan",
    name: "Perikanan & Kelautan",
    enName: "Fisheries & Marine",
    intro:
      "Tangkap, budidaya, olah, ekspor: SIUP perikanan, IUP budidaya, CBIB, HACCP/CPPOB pengolahan, karantina ikan & health certificate, SPI, gross akton, ecolabel, hingga registrasi eksportir perikanan.",
    requirements: [
      "NIB & data kapal/sarana produksi (bila ada)",
      "Lokasi budidaya/pengolahan (koordinat)",
      "Spesifikasi produk & target pasar ekspor",
      "Sistem jaminan mutu yang berjalan",
      "Dokumen kesehatan & karantina ikan",
    ],
  },
  {
    id: "kesehatan",
    name: "Kesehatan & Fasilitas Medis",
    enName: "Health & Medical Facilities",
    intro:
      "Perizinan layanan kesehatan tanpa drama: izin operasional rumah sakit & klinik, akreditasi KARS & FKTP, izin apotek & PBF, STR/SIP/SIB tenaga medis, lab klinik, UDD, BATTRA, hingga ATBM.",
    requirements: [
      "NIB & profil pemilik/sarana kesehatan",
      "Data tenaga medis (STR, ijazah, pakta integritas)",
      "Denah & daftar sarana prasarana",
      "Dokumen kerja sama (bila dengan pemda/RS)",
      "Standar pelayanan & SOP medis",
    ],
  },
  {
    id: "alkes",
    name: "Alat Kesehatan & Biomedik",
    enName: "Medical Devices & Biomedical",
    intro:
      "Izin edar hingga pasca-pasar untuk seluruh alkes: AKL/AKD, PKRT, izin penyalur & importir, uji klinik & kaji etik, layanan sel punca, kalibrasi alat medis, TKDN alkes, IVD, hingga pelaporan keamanan produk.",
    requirements: [
      "NIB & data badan usaha (lokal/asing)",
      "Sertifikat bebas berjualan dari negara asal (CFS)",
      "Dokumen teknis & standar kelayakan alkes",
      "Pembubuhan local authorized representative",
      "Data klaim & uji keamanan produk",
    ],
  },
  {
    id: "pariwisata",
    name: "Pariwisata & Perhotelan",
    enName: "Tourism & Hospitality",
    intro:
      "Industri ramah yang tunduk aturan: izin biro perjalanan wisata & travel umrah PIHK/PBUH, klasifikasi hotel & restoran, sertifikasi homestay/desa wisata, CHSE, izin DTW, dive center, MICE, hingga keanggotaan ASITA.",
    requirements: [
      "NIB & profil perusahaan pariwisata",
      "Data properti/sarana (denah & foto)",
      "Sertifikat kompetensi personel (bila wajib)",
      "Perjanjian kemitraan/afiliasi (bila ada)",
      "Bukti pemenuhan standar keamanan & kebersihan",
    ],
  },
  {
    id: "transportasi",
    name: "Transportasi Darat & Kereta Api",
    enName: "Land Transport & Railway",
    intro:
      "Jalan rel & aspal tetap berizin: SIUJPT angkutan orang, izin trayek, SUT/SRUT, uji KIR, angkutan barang & B3, transportasi online (AOTO), izin usaha kereta api, SKP pengemudi profesional, hingga parkir.",
    requirements: [
      "NIB & armada (data kendaraan & dokumen)",
      "Trayek/rute yang diusulkan",
      "Bukti kepemilikan/sewa kendaraan",
      "Pengemudi dengan SIM yang sesuai",
      "Dokumen keamanan & asuransi armada",
    ],
  },
  {
    id: "maritim",
    name: "Perkapalan & Kepelabuhanan",
    enName: "Shipping & Port Services",
    intro:
      "Laut punya peraturannya sendiri: SIUPAL, pendaftaran kapal & gross akton, ISM/ISPS, SIRKLA, buku pelaut & STCW, izin jasa kepelabuhanan P1/P2, pengerukan, keagenan, terminal peti kemas, hingga klasifikasi BKI.",
    requirements: [
      "NIB & profil perusahaan maritim",
      "Data kapal (bendera, ukuran, sertifikat)",
      "Dokumen kelaikan & manajemen keselamatan",
      "Personel pelaut bersertifikat (STCW)",
      "Rencana operasional pelabuhan/terminal",
    ],
  },
  {
    id: "bea-cukai",
    name: "Logistik, Bea Cukai & Kepabeanan",
    enName: "Logistics, Customs & Excise",
    intro:
      "Gerbang barang masuk-keluar negara: PPJK, TPS, PLB, kawasan berikat, KITE, AEO, SKA/COO, LS surveyor, NPPN-C cukai, re-impor, hingga pendampingan post clearance audit dan penyusunan PIB/PEB.",
    requirements: [
      "NIB & NPWP badan (PKP untuk keb bea cukai)",
      "Data gudang/lokasi & kapasitas penyimpanan",
      "Spesifikasi komoditas & HS code",
      "Dokumen asal barang & HS code classification",
      "Rekam jejak kepabeanan (bila ada)",
    ],
  },
  {
    id: "digital",
    name: "Komdigi, Digital & Telekomunikasi",
    enName: "Digital Affairs, ICT & Telecom",
    intro:
      "Perizinan ekonomi digital Indonesia: PSE & PSE asing, izin ISP/JI, VSAT & IPFR, sertifikasi perangkat SDPPI/Postel, penyalur telekomunikasi, domain .id, PSrE/CA, izin drone, kepatuhan PDP, hingga IPP penyiaran.",
    requirements: [
      "NIB & profil penyelenggara sistem/layanan",
      "Domain & penjelasan layanan sistem elektronik",
      "Data pengelolaan & lokasi server (DC)",
      "Dokumen keamanan siber & audit (bila diminta)",
      "Perangkat yang akan disertifikasi (spesifikasi)",
    ],
  },
  {
    id: "keuangan",
    name: "Fintech, Perbankan & Asuransi",
    enName: "Fintech, Banking & Insurance",
    intro:
      "Lisensi sektor keuangan paling sulit kami uruskan: pembiayaan, LPBBTI lending, PJP & e-money BI, remitansi, perasuransian & pialang, bank/BPR, izin usaha efek, manajer investasi, bank kustodian, aset kripto PFAK, modal ventura, hingga sertifikasi efek syariah.",
    requirements: [
      "Legalitas badan usaha & struktur pemegang saham",
      "Rencana kegiatan usaha (business plan)",
      "Modal disetor sesuai regulasi perlisensi",
      "Sistem teknologi & uji keamanan (IT audit)",
      "Profil manajemen & pemegang saham (fit & proper)",
    ],
  },
  {
    id: "konstruksi",
    name: "Konstruksi & Properti",
    enName: "Construction & Property",
    intro:
      "Bangun dengan kualifikasi yang diakui: SBU & LPJK, sertifikasi SKK personel, verifikasi perusahaan konstruksi, izin prinsip perumahan, sertifikasi agen & penilai properti, LPSE vendor, hingga manajer proyek.",
    requirements: [
      "Akta badan usaha & NIB konstruksi",
      "Data tenaga teknis bersertifikat (SKK)",
      "Peralatan & pengalaman proyek",
      "Laporan keuangan & modal",
      "Klasifikasi & kualifikasi usaha yang diusulkan",
    ],
  },
  {
    id: "pendidikan",
    name: "Pendidikan, Pelatihan & Sertifikasi Profesi",
    enName: "Education, Training & Professional Certification",
    intro:
      "Lembaga ilmu punya perizinannya: LPK Kemnaker, PAUD & sekolah swasta, perguruan tinggi & BAN-PT, bimbel, NPSN/PDDikti, LSP & uji kompetensi, test center IELTS/TOEFL, pesantren, hingga autorisasi Cambridge/IB.",
    requirements: [
      "Yayasan/legalitas lembaga pendidikan",
      "Data pengelola & tenaga pendidik",
      "Kurikulum & silabus program",
      "Denah & standar sarana belajar",
      "Anggaran dasar & rencana operasional",
    ],
  },
  {
    id: "industri",
    name: "Industri, SNI & TKDN",
    enName: "Industry, SNI & Local Content",
    intro:
      "Pabrik yang sah & produk yang diakui: IUI & e-Registration, SNI produk wajib & sukarela, sertifikasi & verifikasi TKDN, izin prinsip industri, audit energi, CE/FCC/UL/FDA untuk ekspor, label, hingga industri hijau.",
    requirements: [
      "NIB & data lokasi pabrik (peta & denah)",
      "Spesifikasi produk & kapasitas produksi",
      "Dokumen proses & mesin produksi",
      "Sampel produk untuk uji SNI",
      "Rincian komponen lokal/impor (untuk TKDN)",
    ],
  },
  {
    id: "b3-kimia",
    name: "Kimia, B3 & Radiasi",
    enName: "Chemicals, Hazardous Waste & Radiation",
    intro:
      "Bahan berbahaya dikelola dengan disiplin: izin TPS/pengumpul/pengolahan/pemanfaatan B3, manifest elektronik, ekspor-impor B3, lisensi BAPETEN & petugas radiasi, SDS/MSDS, GHS, fumigasi, hingga gas medis.",
    requirements: [
      "NIB & fasilitas penyimpanan/pengolahan",
      "Data jenis & volume B3 (karakteristik)",
      "Balai latihan/SDM bersertifikat operator B3",
      "Dokumen MSDS setiap bahan",
      "Sarana pengamanan & SOP darurat",
    ],
  },
  {
    id: "ketenagakerjaan",
    name: "Tenaga Kerja & BPJS",
    enName: "Manpower & BPJS Compliance",
    intro:
      "Kepatuhan SDM yang humanis: registrasi BPJS Ketenagakerjaan & Kesehatan, WLKP, PKWT PP 35/2021, pengesahan peraturan perusahaan, pencatatan serikat pekerja, LKS Bipartit, P2K3, struktur & skala upah, hingga program magang.",
    requirements: [
      "NIB & daftar karyawan terkini",
      "Kontrak/surat pengangkatan karyawan",
      "Struktur organisasi & jabatan",
      "Data upah & tunjangan",
      "Anggaran dasar lembaga (untuk pencatatan)",
    ],
  },
  {
    id: "jasa-lainnya",
    name: "Jasa Profesional Lainnya",
    enName: "Other Professional Services",
    intro:
      "Layanan pelengkap yang tetap krusial: apostille & legalisasi dokumen, penerjemah tersumpah, review kontrak, pendampingan pemeriksaan instansi, izin gangguan/HO, registrasi vendor & pengadaan, hingga studi kelayakan dan notariatan.",
    requirements: [
      "Dokumen asli yang akan diproses",
      "Identitas & legalitas pemohon",
      "Surat kuasa (bila diwakilkan)",
      "Data kegiatan usaha terkait",
      "Kebutuhan waktu penyelesaian",
    ],
  },
];
