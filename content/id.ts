// Indonesian copy. Same keys as the English sections below via `satisfies`;
// other pages stay English until their translation pass.
import type { Copy } from "./en";

export const id = {
  brand: {
    name: "C—METRIC",
    sub: "",
    status: "PROTOTIPE v0.1",
    metaTitle: "C—METRIC — Akuntansi Ekologis",
    metaDescription:
      "Demo akuntansi ekologis di browser: kalkulator, struk karbon, benchmark, metodologi dan ekspor audit.",
  },
  nav: [
    { n: "01", label: "KALKULATOR", href: "/" },
    { n: "02", label: "STRUK KARBON", href: "/struk" },
    { n: "03", label: "BENCHMARK", href: "/registry" },
    { n: "04", label: "METODOLOGI", href: "/methodology" },
    { n: "05", label: "EKSPOR AUDIT", href: "/dossier" },
  ],
  menu: { open: "Buka menu", close: "Tutup menu" },
  footer: {
    cols: [
      {
        k: "01 / TENTANG",
        lines: ["C—METRIC — DEMO YANG BERJALAN DI BROWSER", "Tanpa akun. Tanpa pelacakan."],
      },
      {
        k: "02 / STANDAR",
        lines: [
          "MENGIKUTI STRUKTUR GHG PROTOCOL (TIDAK BERSERTIFIKAT)",
          "Emisi langsung, energi yang dibeli & rantai pasok",
        ],
      },
      {
        k: "03 / DATA",
        lines: [
          "SEMUA FAKTOR EMISI ADALAH NILAI DEMO YANG BELUM TERVERIFIKASI",
          "Daftar lengkap di halaman Metodologi",
        ],
      },
      {
        k: "04 / PRIVASI",
        lines: ["TIDAK ADA DATA YANG KELUAR DARI BROWSER", "Checksum dihitung secara lokal"],
      },
    ],
    legal: "© C—METRIC LABS. DEMO PROTOTIPE — BUKAN DOKUMEN TERAUDIT.",
    glossary: "GLOSARIUM",
    rev: "SWISS STANDARDS / REV 0.1",
  },
  common: {
    demoFactor: "FAKTOR DEMO / BELUM TERVERIFIKASI",
    illustrativeSample: "CONTOH ILUSTRATIF, BUKAN DATA SEJAWAT NYATA",
    close: "Tutup",
    skipToContent: "Lewati ke konten",
    decrease: "Kurangi",
    increase: "Tambah",
  },
  calculator: {
    metaTitle: "Kalkulator — C—METRIC",
    metaDescription:
      "Tulis yang kamu lakukan dan C—METRIC menentukan scope-nya. Bahasa sehari-hari, hasil langsung.",
    eyebrow: "MODUL 01 // KALKULATOR",
    title: "HITUNG EMISI KARBON",
    intro:
      "Pilih yang berlaku untukmu, isi angkanya, hasil langsung muncul. Tidak perlu paham istilah teknis.",
    howToButton: "CARA PAKAI",
    cards: {
      yes: "Ada",
      no: "Tidak ada",
      periodLabel: "Per bulan atau per tahun",
      periods: ["per bulan", "per tahun"],
      advanced: "Pengaturan lanjutan",
      emptyResult: "Isi angkanya untuk melihat hasil.",
      readBack: "Terbaca",
      negative: "Pakai angka nol atau lebih.",
      invalid: "Pakai angka saja — misalnya 1.500 atau 12,5.",
      kgUnit: "kg CO₂e",
      perYear: "per tahun",
      listrik: {
        title: "Listrik",
        help: "Berapa kWh listrik yang dipakai? Angkanya ada di tagihan listrik.",
        field: "Listrik dipakai",
        unit: "kWh",
        advancedTitle: "Jaringan & listrik hijau",
        grid: "Jaringan listrik",
        gridHelp: "Pilih jaringan yang menghasilkan listrikmu.",
        green: "Bagian listrik hijau",
        greenHelp: "Listrik dari kontrak hijau atau sertifikat.",
        greenLevels: ["0%", "15%", "50%", "75%", "100%"],
      },
      gas: {
        title: "Gas untuk dapur atau pemanas",
        help: "Lihat pemakaian di meter atau tagihan gas.",
        field: "Pemakaian gas",
        unit: "kWh",
        advancedTitle: "Satuan gas",
        unitHelp: "Sebagian tagihan memakai MMBtu, bukan kWh. 1 MMBtu sekitar 293 kWh.",
        units: ["kWh", "MMBtu"],
      },
      kendaraan: {
        title: "Kendaraan perusahaan",
        help: "Berapa liter solar yang dipakai?",
        vanField: "Mobil pengantaran",
        carField: "Mobil kantor",
        unit: "liter",
      },
      penerbangan: {
        title: "Penerbangan",
        help: "Berapa kali naik pesawat tahun ini? Satu arah dihitung satu kali.",
        short: "Dekat (sampai 500 km)",
        medium: "Sedang (500–3.700 km)",
        long: "Jauh (lebih dari 3.700 km)",
      },
      lainnya: {
        title: "Lainnya (opsional)",
        help: "Isi hanya kalau kamu punya angkanya.",
        district: {
          title: "Pemanas dari gedung",
          hint: "Ada di tagihan pemanas gedung, dalam MJ.",
          unit: "MJ",
        },
        cloud: {
          title: "Server cloud",
          hint: "Total jam server virtual yang disewa.",
          unit: "vCPU-jam",
        },
        freight: {
          title: "Kiriman yang kamu bayar",
          hint: "Berat × jarak yang diangkut untukmu.",
          unit: "ton-km",
        },
        r410a: {
          title: "Gas AC (R-410A) bocor",
          hint: "Gas pendingin yang bocor dari AC, dalam kg.",
          unit: "kg",
        },
        hfc134a: {
          title: "Gas kulkas (HFC-134a) bocor",
          hint: "Gas pendingin yang bocor dari kulkas, dalam kg.",
          unit: "kg",
        },
      },
    },
    detail: {
      open: "Lihat cara hitungnya",
      scope: "Scope",
      scopes: [
        "Scope 1 · yang kamu bakar sendiri",
        "Scope 2 · listrik & energi yang dibeli",
        "Scope 3 · perjalanan, layanan & barang",
      ],
      factor: "Faktor",
      source: "Sumber",
      status: "Status",
      inTotal: "masuk total",
      greenShare: "Listrik hijau",
      locationLabel: "Tanpa listrik hijau",
      locationNote: "angka berbasis lokasi, tidak masuk total",
      notAvailable: "FAKTOR BELUM TERSEDIA",
    },
    sources: {
      title: "SUMBER & ASUMSI",
      colActivity: "AKTIVITAS",
      colFactor: "FAKTOR DIPAKAI",
      colStatus: "STATUS",
    },
    howTo: {
      title: "CARA PAKAI KALKULATOR INI",
      intro: "Tiga langkah. Tidak ada data yang diunggah ke mana pun.",
      steps: [
        {
          title: "Jawab satu kartu dulu",
          desc: "Listrik dulu; yang lain hanya kalau berlaku untukmu.",
        },
        {
          title: "Pilih per bulan atau per tahun",
          desc: "Pakai yang kamu tahu; kalkulator yang mengubahnya.",
        },
        {
          title: "Baca hasilnya",
          desc: "Total muncul di panel. Klik “Lihat cara hitungnya” untuk rincian.",
        },
      ],
    },
    ledger: {
      tag: "Total emisi per tahun",
      unit: "ton CO₂e / tahun",
      empty: "—",
      emptyHint: "Isi salah satu kartu untuk mulai.",
      strip: "ESTIMASI DEMO · faktor emisi belum terverifikasi",
      legends: ["Dibakar sendiri", "Listrik & energi dibeli", "Perjalanan & layanan lain"],
      chart: {
        title: "Emisi per kartu",
        unit: "ton CO₂e / tahun",
        note: "Panjang batang adalah bagian dari total tahunan.",
        cards: {
          listrik: "Listrik",
          gas: "Gas",
          kendaraan: "Kendaraan",
          penerbangan: "Penerbangan",
          lainnya: "Lainnya",
        },
      },
      viewReport: "LIHAT LAPORAN",
      reset: "MULAI ULANG",
      sample: "COBA DENGAN DATA CONTOH",
      sampleActive: "Data contoh aktif — bukan data nyata.",
      expand: "Lihat rincian",
      collapse: "Tutup rincian",
      dhlNote:
        "Cara hitung mengikuti struktur laporan DHL Group; angka faktor emisi adalah contoh, bukan angka DHL.",
    },
  },
} satisfies Pick<Copy, "brand" | "nav" | "menu" | "footer" | "common" | "calculator">;
