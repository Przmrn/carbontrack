// Indonesian copy for the DHL Group FY2025 reference page.
export const dhlId = {
  metaTitle: "DHL Group FY2025 — C—METRIC",
  metaDescription:
    "Angka emisi, metode, pemeriksaan rekonsiliasi, target dan sumber DHL Group FY2025 yang dipublikasikan. Bukan perhitungan ulang dari data aktivitas.",
  eyebrow: "MODUL 04 // DHL GROUP FY2025",
  title: "DHL GROUP FY2025",
  subtitle: "ANGKA PUBLIK, METODE DAN PEMERIKSAAN REKONSILIASI",
  intro:
    "Halaman referensi terpisah untuk angka yang dipublikasikan DHL Group dalam Annual Report 2025 dan Sustainability Statbook. Halaman ini mereproduksi agregasi dan pemeriksaan yang dipublikasikan; halaman ini tidak menghitung ulang angkanya dari data aktivitas.",
  backLink: "KEMBALI KE METODOLOGI",
  tocLabel: "DI HALAMAN INI",
  statementLabel: "PERNYATAAN HALAMAN",
  tagsLabel: "CARA MEMBACA TAG",
  tags: [
    {
      key: "reported",
      text: "Dinyatakan oleh DHL di halaman laporan atau sheet dan baris Statbook yang disebut.",
    },
    {
      key: "standard",
      text: "Rumus standar yang disebut DHL. Laporan tidak mencetak aritmetikanya.",
    },
    {
      key: "calculated",
      text: "Diturunkan, diperiksa atau dipetakan oleh halaman ini dari angka publik DHL.",
    },
  ],
  sections: [
    { id: "dhl-about", n: "01", label: "TENTANG LAPORAN" },
    { id: "dhl-figures", n: "02", label: "ANGKA UTAMA FY2025" },
    { id: "dhl-method", n: "03", label: "CARA DHL MENGHITUNG" },
    { id: "dhl-tableau", n: "04", label: "VISUALISASI — TABLEAU" },
    { id: "dhl-checks", n: "05", label: "PEMERIKSAAN REKONSILIASI" },
    { id: "dhl-targets", n: "06", label: "TARGET DAN KEMAJUAN" },
    { id: "dhl-limits", n: "07", label: "YANG TIDAK DIUNGKAP DHL" },
    { id: "dhl-mapping", n: "08", label: "PEMETAAN KE C—METRIC" },
    { id: "dhl-sources", n: "09", label: "SUMBER" },
  ],
  about: {
    title: "TENTANG LAPORAN",
    intro:
      "Angka di halaman ini berasal dari dua publikasi. Annual Report memuat Group Sustainability Statement; Statbook memuat seri yang lebih panjang dan detail tingkat sheet.",
    introTag: "reported",
    facts: [
      {
        label: "ANNUAL REPORT",
        value:
          "DHL Group 2025 Annual Report, 277 halaman cetak. Group Sustainability Statement mengikuti ESRS E1.",
        tag: "reported",
      },
      {
        label: "STATBOOK",
        value:
          "DHL Group 2025 Sustainability Statbook, 21 sheet. Sumber untuk seri yang lebih panjang, energi, target dan data divisi.",
        tag: "reported",
      },
      {
        label: "PERIODE",
        value: "1 Januari sampai 31 Desember 2025. Tahun dasar: 2021.",
        tag: "reported",
      },
      {
        label: "BATASAN",
        value:
          "Semua anak perusahaan yang dikendalikan; cakupan konsolidasi yang sama dengan laporan keuangan. Operasi bersama Aerologic dimasukkan berdasarkan operational control.",
        tag: "reported",
      },
      {
        label: "STANDAR YANG DISEBUT",
        value:
          "GHG Protocol, ISO 14083 dan GLEC Framework. Faktor yang disebut: GLEC Framework 3.1, IEA 2024 dan DEFRA.",
        tag: "reported",
      },
      {
        label: "SUDUT PANDANG",
        value: "Well-to-wheel: produksi bahan bakar di hulu ikut dihitung.",
        tag: "reported",
      },
      {
        label: "BARIS TERPISAH",
        value:
          "Offset tidak dikurangkan dari emisi. CO₂ biogenik dilaporkan di luar Scope 1–3. Kredit karbon yang dihentikan dilaporkan terpisah.",
        tag: "reported",
      },
    ],
  },
  figures: {
    title: "ANGKA UTAMA FY2025",
    intro:
      "Nilai dibaca langsung dari data/dhl-fy2025.ts. Scope 2 ditampilkan pada kedua basis. Kategori 1, 2, 6 dan 7 ditandai ESTIMATE.",
    caption: "ANGKA PUBLIK DHL GROUP FY2025",
    columns: {
      item: "ITEM",
      base: "2021",
      y2024: "2024",
      y2025: "2025",
      unit: "SATUAN",
      evidence: "BUKTI",
    },
    estimate: "ESTIMATE",
    rows: [
      { key: "scope1", label: "Scope 1 (bruto)", tag: "reported", estimate: false },
      {
        key: "scope2_location",
        label: "Scope 2 — berbasis lokasi",
        tag: "reported",
        estimate: false,
      },
      {
        key: "scope2_market",
        label: "Scope 2 — berbasis pasar",
        tag: "reported",
        estimate: false,
      },
      {
        key: "s1s2_market",
        label: "Scope 1 + 2 — berbasis pasar",
        tag: "reported",
        estimate: false,
      },
      { key: "scope3_total", label: "Scope 3 — total", tag: "reported", estimate: false },
      {
        key: "scope3_logistics",
        label: "Scope 3 — terkait logistik (Kat. 3 + 4 + 6)",
        tag: "reported",
        estimate: false,
      },
      {
        key: "cat1",
        label: "Scope 3 Kat. 1 — barang dan jasa yang dibeli",
        tag: "reported",
        estimate: true,
      },
      {
        key: "cat2",
        label: "Scope 3 Kat. 2 — barang modal",
        tag: "reported",
        estimate: true,
      },
      {
        key: "cat3",
        label: "Scope 3 Kat. 3 — aktivitas bahan bakar dan energi",
        tag: "reported",
        estimate: false,
      },
      {
        key: "cat4",
        label: "Scope 3 Kat. 4 — transportasi dan distribusi hulu",
        tag: "reported",
        estimate: false,
      },
      {
        key: "cat6",
        label: "Scope 3 Kat. 6 — perjalanan bisnis",
        tag: "reported",
        estimate: true,
      },
      {
        key: "cat7",
        label: "Scope 3 Kat. 7 — perjalanan karyawan",
        tag: "reported",
        estimate: true,
      },
      { key: "logistics_total", label: "Total terkait logistik", tag: "reported", estimate: false },
      { key: "total_location", label: "Total — berbasis lokasi", tag: "reported", estimate: false },
      { key: "total_market", label: "Total — berbasis pasar", tag: "reported", estimate: false },
      { key: "total_sbt2050", label: "Total SBT 2050", tag: "reported", estimate: false },
      {
        key: "intensity_market",
        label: "Intensitas — berbasis pasar",
        tag: "reported",
        estimate: false,
      },
      {
        key: "intensity_location",
        label: "Intensitas — berbasis lokasi",
        tag: "reported",
        estimate: false,
      },
    ],
    memoCaption: "BARIS MEMO — TIDAK DITAMBAHKAN KE TOTAL",
    memoRows: [
      { key: "biogenic_total", label: "CO₂ biogenik — total", tag: "reported" },
      { key: "biogenic_s1", label: "CO₂ biogenik — Scope 1", tag: "reported" },
      { key: "biogenic_s3", label: "CO₂ biogenik — Scope 3", tag: "reported" },
      { key: "credits_retired", label: "Kredit karbon yang dihentikan", tag: "reported" },
    ],
    note:
      "CO₂ biogenik dan kredit yang dihentikan adalah baris terpisah. Keduanya tidak pernah ditambahkan ke atau dikurangkan dari scope.",
    noteTag: "calculated",
  },
  method: {
    title: "CARA DHL MENGHITUNG",
    intro:
      "DHL menjelaskan metode berbasis konsumsi dan berbasis aktivitas. Laporan menyebut standar dan sumbernya; laporan tidak mencetak aritmetikanya.",
    introTag: "reported",
    caption: "RINGKASAN METODE PER SCOPE",
    columns: {
      part: "BAGIAN",
      method: "METODE",
      data: "DATA",
      cite: "RUJUKAN",
      evidence: "BUKTI",
    },
    citeNote: "R = dilaporkan DHL. Nomor halaman adalah halaman cetak Annual Report.",
    citeTag: "reported",
    standard: {
      label: "BENTUK STANDAR DI BALIK METODE",
      formula: "E = aktivitas × faktor",
      body:
        "Ini bentuk standar yang diikuti kalkulator. DHL melaporkan metode di bawah; DHL tidak mencetak rumus ini.",
      tag: "standard",
    },
    rows: [
      {
        part: "Scope 1",
        method: "Berbasis konsumsi: bahan bakar yang dilaporkan × faktor.",
        data: "Konsumsi bahan bakar yang dilaporkan langsung dari sistem pelaporan keuangan.",
        cite: "R p.83",
        tag: "reported",
      },
      {
        part: "Scope 2",
        method:
          "Berbasis konsumsi: pembacaan meter dan faktur × faktor. Dilaporkan pada basis lokasi dan pasar.",
        data:
          "Faktor IEA 2024. Sebagian besar listrik tercakup energy-attribute certificate (EAC), baik bundled maupun unbundled.",
        cite: "R p.83, p.85",
        tag: "reported",
      },
      {
        part: "Scope 3 Kat. 3",
        method: "Konsumsi bahan bakar yang dilaporkan langsung × faktor hulu.",
        data: "Data primer.",
        cite: "R p.83",
        tag: "reported",
      },
      {
        part: "Scope 3 Kat. 4",
        method: "Berbasis aktivitas: data aktivitas operasional × parameter yang mapan.",
        data:
          "Clean Cargo untuk laut, HBEFA untuk jalan, IATA untuk udara; data primer pemasok bila tersedia; sebagian kecil lewat ekstrapolasi berbasis pengeluaran.",
        cite: "R p.83–84",
        tag: "reported",
      },
      {
        part: "Scope 3 Kat. 6",
        method: "Berbasis aktivitas, memakai keluarga parameter yang sama.",
        data: "Data operasional.",
        cite: "R p.83",
        tag: "reported",
      },
      {
        part: "Scope 3 Kat. 1 dan 2",
        method: "Ekstrapolasi berbasis biaya dengan faktor DEFRA.",
        data: "Pengeluaran.",
        cite: "R p.84",
        tag: "reported",
      },
      {
        part: "Scope 3 Kat. 7",
        method:
          "Jumlah karyawan, kendaraan perusahaan, statistik komuter sensus Jerman dan faktor DEFRA.",
        data: "Estimasi.",
        cite: "R p.84",
        tag: "reported",
      },
      {
        part: "Langkah berbasis pasar",
        method:
          "Penghematan dihitung dari spesifikasi bahan bakar atau label sertifikat, memakai Smart Freight Centre Voluntary Market-Based Measures Framework. Diverifikasi terhadap registri SAF dan biogas.",
        data: "Sertifikat.",
        cite: "R p.80, p.83",
        tag: "reported",
      },
    ],
    quality: {
      title: "KUALITAS DATA — PANGSA EMISI, FY2025",
      tag: "reported",
      groups: [
        {
          title: "SCOPE 1–2",
          rows: [
            { key: "primary_s12", label: "Primer" },
            { key: "secondary_s12", label: "Dimodelkan" },
          ],
        },
        {
          title: "SCOPE 3",
          rows: [
            { key: "primary_s3", label: "Primer" },
            { key: "secondary_s3", label: "Sekunder" },
          ],
        },
        {
          title: "SCOPE 3 SEKUNDER — RINCIAN",
          rows: [
            { key: "modeled_s3", label: "Dimodelkan" },
            { key: "default_s3", label: "Default" },
          ],
        },
      ],
      note:
        "DHL menjelaskan ketidakpastian secara kualitatif: kesalahan faktor dan pengukuran untuk data berbasis konsumsi, kesalahan estimasi untuk data berbasis aktivitas. Tidak ada rentang ketidakpastian numerik yang dipublikasikan.",
    },
  },
  tableau: {
    title: "VISUALISASI — TABLEAU PUBLIC",
    intro:
      "Tampilan interaktif ditanam terpisah dari data halaman ini. Halaman ini tetap menjadi alternatif teks dan sumber angka di bawah.",
    mobileNote:
      "Di ponsel, buka visualisasi di Tableau Public terlebih dahulu. Tampilan tertanam ada di bawah.",
    load: "MUAT VISUALISASI",
    todo: "TODO: tambahkan URL share Tableau Public dan URL buka di content/tableau.ts.",
    openTodo: "TODO: tambahkan URL Tableau publik di content/tableau.ts.",
    caption: {
      author: "PENULIS",
      dataSource: "SUMBER DATA",
      updated: "TERAKHIR DIPERBARUI",
      missing: "Belum diisi",
    },
    iframeTitle: "Visualisasi emisi DHL Group FY2025 di Tableau Public",
    previewAlt: "Pratinjau statis visualisasi Tableau DHL Group FY2025",
    previewMissing: "Gambar pratinjau tidak tersedia.",
    error:
      "Iframe melaporkan kesalahan pemuatan. Sandbox tetap dipasang. Periksa URL Tableau dan akses jaringan.",
    compare: {
      title: "ANGKA YANG HARUS COCOK",
      intro: "Enam angka utama dari data/dhl-fy2025.ts, untuk dibandingkan dengan visualisasi.",
      columns: { item: "ITEM", value: "NILAI", unit: "SATUAN", evidence: "BUKTI" },
      noteTag: "calculated",
      rows: [
        { key: "scope1", label: "Scope 1" },
        { key: "scope2_location", label: "Scope 2 — berbasis lokasi" },
        { key: "scope2_market", label: "Scope 2 — berbasis pasar" },
        { key: "scope3_total", label: "Scope 3 — total" },
        { key: "total_location", label: "Total — berbasis lokasi" },
        { key: "total_market", label: "Total — berbasis pasar" },
      ],
    },
  },
  checks: {
    title: "PEMERIKSAAN REKONSILIASI — FY2025",
    intro:
      "Setiap baris dihitung dari komponen publik DHL oleh lib/dhl-checks.ts. Pemeriksaan ini menguji agregasi DHL; bukan menghitung ulang emisi dari data aktivitas.",
    caption: "PEMERIKSAAN FY2025 DARI lib/dhl-checks.ts",
    columns: {
      check: "PEMERIKSAAN",
      computed: "DIHITUNG",
      reported: "DILAPORKAN",
      diff: "SELISIH",
      tolerance: "TOLERANSI",
      status: "STATUS",
      note: "CATATAN",
    },
    statusOk: "OK",
    statusGap: "GAP",
    summary: "Semua pemeriksaan lolos kecuali celah total berbasis lokasi yang terdokumentasi.",
    summaryTag: "calculated",
    gapTitle: "TIDAK TEREKONSILIASI: TOTAL BERBASIS LOKASI",
    gapBody:
      "Total berbasis lokasi yang dilaporkan konsisten lebih tinggi daripada Scope 1 + Scope 2 berbasis lokasi + Scope 3. DHL tidak menyebut penyebabnya. Halaman ini menjaga celahnya tetap terlihat dan tidak menyesuaikan input untuk menutupnya.",
    gapDiffLabel: "DILAPORKAN − DIHITUNG",
    labels: {
      "s3-cats": "Scope 3 = Kat. 1 + 2 + 3 + 4 + 6 + 7",
      "s3-log": "Scope 3 logistik = Kat. 3 + 4 + 6",
      "s12-mkt": "Scope 1 + 2 (pasar) = S1 + S2 pasar",
      logistics: "Terkait logistik = S1 + S2 pasar + S3 (Kat. 3, 4, 6)",
      "total-mkt": "Total (pasar) = S1 + S2 pasar + S3",
      "total-loc": "Total (lokasi) = S1 + S2 lokasi + S3",
      "int-mkt": "Intensitas (pasar) = total / pendapatan",
      "int-loc": "Intensitas (lokasi) = total / pendapatan",
      sbt2050: "Total SBT 2050 = logistik + Kat. 1 + Kat. 2",
      "fossil-mode": "Energi fosil = udara + jalan + bangunan",
      "renew-mode": "Energi terbarukan = udara + jalan + bangunan",
      "energy-total": "Total energi = fosil + nuklir + terbarukan",
      rde: "Realized Decarbonization Effects = jumlah empat langkah",
    },
    notes: {
      "s3-log": "Tahun sebelum 2018 memakai input satu desimal, sehingga pembulatan dapat menjelaskan selisih kecil.",
      "total-loc":
        "TIDAK TEREKONSILIASI: angka yang dilaporkan konsisten lebih tinggi pada 2023, 2024 dan 2025. DHL tidak menyebut penyebabnya. Kemungkinan yang belum terkonfirmasi: Kat. 3 hulu dihitung berbasis pasar dalam penjumlahan, tetapi tidak dalam total lokasi.",
    },
    units: {
      "s3-cats": "Mt CO₂e",
      "s3-log": "Mt CO₂e",
      "s12-mkt": "Mt CO₂e",
      logistics: "Mt CO₂e",
      "total-mkt": "Mt CO₂e",
      "total-loc": "Mt CO₂e",
      "int-mkt": "g CO₂e / EUR",
      "int-loc": "g CO₂e / EUR",
      sbt2050: "Mt CO₂e",
      "fossil-mode": "GWh",
      "renew-mode": "GWh",
      "energy-total": "GWh",
      rde: "kt CO₂e",
    },
  },
  targets: {
    title: "TARGET DAN KEMAJUAN",
    intro:
      "Target adalah target publik DHL. Kemajuan dihitung dari angka dasar 2021 dan FY2025 yang dipublikasikan oleh targetProgress().",
    introTag: "calculated",
    targetsTitle: "TARGET PUBLIK",
    targetCaption: "TARGET DHL GROUP",
    targetColumns: { label: "TARGET", base: "DASAR 2021", value: "NILAI TARGET", evidence: "BUKTI" },
    targetUnit: "Mt CO₂e",
    targets: [
      {
        label: "Terkait logistik — 2026",
        targetKey: "target2026_logistics",
        baseKey: "base2021_logistics",
        tag: "reported",
      },
      {
        label: "Terkait logistik — 2030",
        targetKey: "target2030_logistics",
        baseKey: "base2021_logistics",
        tag: "reported",
      },
      {
        label: "Scope 1 + 2 (pasar) — 2030",
        targetKey: "target2030_s1s2_market",
        baseKey: "base2021_s1s2_market",
        tag: "reported",
      },
      {
        label: "Scope 3 logistik — 2030",
        targetKey: "target2030_s3_logistics",
        baseKey: "base2021_s3_logistics",
        tag: "reported",
      },
      {
        label: "Total SBT 2050",
        targetKey: "target2050_total",
        baseKey: "base2021_total_sbt2050",
        tag: "reported",
      },
    ],
    netZero: {
      text: "Target DHL adalah net zero pada 2050. Total SBT 2050 adalah baris target yang dipublikasikan.",
      tag: "reported",
    },
    progressTitle: "KEMAJUAN — 2025 TERHADAP DASAR 2021",
    progressCaption: "KEMAJUAN YANG DIHITUNG targetProgress()",
    progressColumns: { label: "UKURAN", value: "PERUBAHAN VS 2021", evidence: "BUKTI" },
    progress: [
      { key: "logisticsVsBasePct", label: "Terkait logistik", tag: "calculated" },
      { key: "s1s2VsBasePct", label: "Scope 1 + 2 (pasar)", tag: "calculated" },
      { key: "s3LogVsBasePct", label: "Scope 3 logistik", tag: "calculated" },
    ],
    gapLabel: "SISA YANG HARUS DIPOTONG UNTUK TARGET LOGISTIK 2030",
    gapTag: "calculated",
    gapUnit: "Mt CO₂e",
    notDecarbonization: {
      title: "TIDAK DISEBUT DEKARBONISASI",
      text:
        "Penurunan 2025 tidak disebut dekarbonisasi. Data yang dipublikasikan tidak dapat memisahkan aktivitas yang lebih rendah dari intensitas yang lebih rendah.",
      tag: "calculated",
    },
    volumeNote: {
      text: "DHL mengaitkan sebagian besar penurunan Scope 3 dengan volume yang lebih rendah.",
      tag: "reported",
    },
  },
  limits: {
    title: "YANG TIDAK DIUNGKAP DHL",
    intro:
      "Ini pembacaan kami atas celah pengungkapan laporan. Inilah sebabnya kalkulator tidak dapat mereproduksi total DHL dari data aktivitas.",
    introTag: "calculated",
    items: [
      "Nilai faktor emisi per liter, per kWh atau per tonne-km. Laporan hanya menyebut sumbernya.",
      "Set GWP (AR5 atau AR6) dan rincian per gas.",
      "Volume aktivitas (tonne-km, liter) di balik Kategori 4.",
      "Aturan alokasi untuk transportasi bersama dan untuk sertifikat.",
      "Rentang ketidakpastian numerik.",
    ],
    itemTag: "calculated",
    conclusion:
      "Studi kasus dapat mereproduksi agregasi dan pemeriksaan silang DHL dari komponen publiknya. Studi kasus tidak dapat mereproduksi total logistik dari data aktivitas mentah.",
    conclusionTag: "calculated",
    statbookNote:
      "Statbook tidak mengubah ini: Statbook menambah seri yang lebih panjang, divisi dan data energi, tetapi tidak menambah nilai faktor, tonne-km, set GWP atau rentang ketidakpastian numerik.",
    statbookTag: "calculated",
  },
  mapping: {
    title: "PEMETAAN KE C—METRIC",
    intro:
      "Ini pemetaan versi ini ke kalkulator. Ini bukan klaim bahwa kalkulator mereproduksi DHL.",
    introTag: "calculated",
    caption: "ELEMEN C—METRIC DAN RUJUKAN DHL-NYA",
    columns: { app: "ELEMEN C—METRIC", basedOn: "BERDASARKAN", evidence: "BUKTI" },
    rows: [
      {
        app: "Bagian kalkulator 01–05",
        basedOn:
          "Tabel §2 DHL-METHODOLOGY: Scope 1 → Scope 2 (pasar dan lokasi berdampingan) → Scope 3 logistik (Kat. 3/4/6) → Scope 3 non-logistik (Kat. 1/2/7) → langkah pengurangan.",
        tag: "calculated",
      },
      {
        app: "Ledger",
        basedOn:
          "Total (pasar), total (lokasi), subtotal terkait logistik, pangsa moda, intensitas g/EUR, kemajuan terhadap tahun dasar dan target.",
        tag: "calculated",
      },
      {
        app: "Laci show calculation",
        basedOn: "Rumus standar §3, dengan faktor, sumber dan flag verified per baris.",
        tag: "calculated",
      },
      {
        app: "Halaman Metodologi",
        basedOn: "§1–§3 dan §8.",
        tag: "calculated",
      },
      {
        app: "Halaman DHL (halaman ini)",
        basedOn:
          "Tabel §4 dari data/dhl-fy2025.ts, pemeriksaan §7 termasuk total lokasi yang tidak terekonsiliasi.",
        tag: "calculated",
      },
      {
        app: "Aturan never-net",
        basedOn: "Offset terpisah; CO₂ biogenik terpisah.",
        tag: "calculated",
      },
    ],
    note:
      "Keluaran kalkulator bukan data DHL. Faktor C—METRIC adalah nilai demo kecuali sumber dan tahun diberikan; DHL tidak mempublikasikan nilai faktor.",
    noteTag: "calculated",
  },
  sources: {
    title: "SUMBER",
    intro:
      "Rujukan Annual Report memakai nomor halaman cetak. Rujukan Statbook adalah string sumber yang dihasilkan dari data/dhl-fy2025.ts.",
    introTag: "reported",
    caption: "HALAMAN ANNUAL REPORT DAN SHEET + BARIS STATBOOK",
    columns: {
      item: "ITEM",
      page: "ANNUAL REPORT",
      statbook: "SHEET + BARIS STATBOOK",
      evidence: "BUKTI",
    },
    rows: [
      { key: "scope1", label: "Scope 1", page: "p.86", statbook: "" },
      { key: "scope2_location", label: "Scope 2 — berbasis lokasi", page: "p.86", statbook: "" },
      { key: "scope2_market", label: "Scope 2 — berbasis pasar", page: "p.86", statbook: "" },
      { key: "s1s2_market", label: "Scope 1 + 2 — berbasis pasar", page: "p.86", statbook: "" },
      { key: "scope3_total", label: "Scope 3 — total", page: "p.86", statbook: "" },
      { key: "scope3_logistics", label: "Scope 3 — terkait logistik", page: "p.86", statbook: "" },
      { key: "cat1", label: "Scope 3 Kat. 1", page: "p.86", statbook: "" },
      { key: "cat2", label: "Scope 3 Kat. 2", page: "p.86", statbook: "" },
      { key: "cat3", label: "Scope 3 Kat. 3", page: "p.86", statbook: "" },
      { key: "cat4", label: "Scope 3 Kat. 4", page: "p.86", statbook: "" },
      { key: "cat6", label: "Scope 3 Kat. 6", page: "p.86", statbook: "" },
      { key: "cat7", label: "Scope 3 Kat. 7", page: "p.86", statbook: "" },
      { key: "logistics_total", label: "Total terkait logistik", page: "p.86", statbook: "" },
      { key: "total_location", label: "Total — berbasis lokasi", page: "p.86", statbook: "" },
      { key: "total_market", label: "Total — berbasis pasar", page: "p.86", statbook: "" },
      { key: "total_sbt2050", label: "Total SBT 2050", page: "p.86", statbook: "" },
      { key: "intensity_market", label: "Intensitas — berbasis pasar", page: "p.85", statbook: "" },
      { key: "intensity_location", label: "Intensitas — berbasis lokasi", page: "p.85", statbook: "" },
      { key: "biogenic_total", label: "CO₂ biogenik", page: "p.87", statbook: "" },
      { key: "credits_retired", label: "Kredit karbon yang dihentikan", page: "p.88", statbook: "" },
      { key: "targets", label: "Target", page: "p.79–80", statbook: "" },
      {
        key: "method",
        label: "Metode dan kualitas data",
        page: "p.83–84",
        statbook: "Statbook GHG Footprint rows 82–88",
      },
      {
        key: "boundary",
        label: "Batasan dan standar",
        page: "p.61, p.78, p.83–84",
        statbook: "—",
      },
      { key: "rde", label: "Realized Decarbonization Effects", page: "p.82", statbook: "" },
      { key: "energy_total", label: "Energi", page: "p.88", statbook: "" },
      { key: "divisions", label: "Pembagian divisi", page: "p.86", statbook: "" },
    ],
    note:
      "Sheet target di data/dhl-fy2025.ts tidak punya nomor baris, jadi hanya sheet yang ditampilkan untuk target. Nomor halaman laporan adalah halaman cetak.",
    noteTag: "calculated",
  },
} as const;
