// Indonesian glossary definitions, keyed by the abbreviation in data/glossary.
// Expansion stays close to the standard name; `plain` is written for lay readers.
export interface GlossaryTranslation {
  expansion: string;
  plain: string;
}

export const glossaryId: Record<string, GlossaryTranslation> = {
  "CO₂e": {
    expansion: "Setara karbon dioksida",
    plain:
      "Setiap gas rumah kaca dinyatakan sebagai jumlah CO₂ yang memberi pemanasan yang sama. Ini satuan aplikasi ini: gas seperti metana dihitung lebih besar dari beratnya sendiri.",
  },
  "CO₂": {
    expansion: "Karbon dioksida",
    plain:
      "Gas yang dilepas saat bahan bakar dibakar. Inilah patokan untuk menyatakan setiap angka CO₂e, jadi CO₂e = 1 × CO₂.",
  },
  GHG: {
    expansion: "Gas rumah kaca",
    plain:
      "Gas yang menahan panas: karbon dioksida, metana, dinitrogen oksida, dan gas fluorinasi yang dipakai alat pendingin. Semuanya dihitung di sini sebagai CO₂e.",
  },
  "S1 / S2 / S3": {
    expansion: "Scope 1, Scope 2, Scope 3",
    plain:
      "Tiga tingkat dalam GHG Protocol. Scope 1 adalah yang kamu bakar sendiri, Scope 2 adalah listrik dan panas yang kamu beli, Scope 3 adalah semua di hulu: barang, server cloud, perjalanan, dan pengiriman.",
  },
  cat: {
    expansion: "Kategori",
    plain:
      "Singkatan untuk kategori Scope 3 bernomor, misalnya cat 1 barang yang dibeli, cat 4 transportasi yang kamu serahkan ke pihak lain, atau cat 6 perjalanan bisnis. Scope 3 dibagi menjadi lima belas kategori.",
  },
  EF: {
    expansion: "Faktor emisi",
    plain:
      "Angka yang mengubah aktivitas menjadi CO₂e: liter solar × kg CO₂e per liter. Setiap angka di aplikasi ini berasal dari faktor, dan setiap faktor menampilkan sumber serta status verifikasinya.",
  },
  t: {
    expansion: "Ton (ton metrik)",
    plain: "1.000 kg. Satuan yang dipakai untuk total Kalkulator dan Dossier.",
  },
  Mt: {
    expansion: "Megaton (sejuta ton)",
    plain:
      "Satu juta ton. Dipakai untuk angka sekala perusahaan, seperti studi kasus DHL di halaman Metodologi.",
  },
  kt: {
    expansion: "Kilotan (seribu ton)",
    plain: "Seribu ton. DHL melaporkan efek dekarbonisasi yang terwujud dalam kt.",
  },
  "g/€": {
    expansion: "Gram CO₂e per euro",
    plain:
      "Intensitas: emisi dibagi pendapatan, agar perusahaan besar dan kecil bisa dibandingkan secara adil.",
  },
  kg: {
    expansion: "Kilogram",
    plain:
      "Satu kilogram. Satuan massa dasar di sini: gram, ton, dan ribuan ton semuanya dikonversi ke satuan ini.",
  },
  g: {
    expansion: "Gram",
    plain:
      "Seperseribu kilogram. Faktor transportasi biasanya bersatuan gram, misalnya 28 g per kilometer untuk kereta.",
  },
  km: {
    expansion: "Kilometer",
    plain: "Jarak. Slider perjalanan menghitung kilometer yang ditempuh per hari.",
  },
  "m³": {
    expansion: "Meter kubik",
    plain:
      "Volume gas, sekitar 10,5 kWh gas bumi. Meteran gas sering menampilkannya, jadi Kalkulator bisa mengubahnya ke kWh sebelum kamu memasukkannya.",
  },
  kWh: {
    expansion: "Kilowatt-jam",
    plain:
      "Satuan di meteran listrik: satu kilowatt yang berjalan selama satu jam. kWh mengukur energi, sedangkan kW mengukur daya.",
  },
  MWh: {
    expansion: "Megawatt-jam",
    plain: "1.000 kWh. Listrik bisnis biasanya ditagih dalam MWh.",
  },
  GWh: {
    expansion: "Gigawatt-jam",
    plain: "1.000.000 kWh. Dipakai untuk total energi sekala grup, seperti 29.458 GWh milik DHL.",
  },
  MJ: {
    expansion: "Megajoule",
    plain:
      "Satuan energi yang setara sekitar 0,278 kWh. Pemanas distrik sering ditagih dalam MJ.",
  },
  MMBTU: {
    expansion: "Juta British thermal unit",
    plain:
      "Satuan panas yang setara sekitar 293 kWh, dipakai di sebagian tagihan gas. Standar industri biasanya menulisnya MMBtu.",
  },
  vCPU: {
    expansion: "Unit pemrosesan pusat virtual",
    plain:
      "Satu inti prosesor virtual. Komputasi cloud diukur dan dihargai per vCPU-jam.",
  },
  "RFC / CAMX": {
    expansion: "Kode jaringan listrik regional",
    plain:
      "Label untuk jaringan listrik di daftar demo Kalkulator. Ini kode wilayah dari prototipe, bukan singkatan standar, dan faktornya belum terverifikasi.",
  },
  TTW: {
    expansion: "Tank-to-wheel",
    plain: "Emisi dari pembakaran bahan bakar di kendaraan, tanpa menghitung cara bahan bakar dibuat.",
  },
  WTT: {
    expansion: "Well-to-tank",
    plain:
      "Emisi dari produksi dan pengangkutan bahan bakar ke tangki: bagian sebelum bahan bakar dibakar.",
  },
  WTW: {
    expansion: "Well-to-wheel",
    plain:
      "TTW ditambah WTT: seluruh siklus bahan bakar. DHL melaporkan emisi armadanya dengan dasar ini.",
  },
  "market-based": {
    expansion: "Scope 2 berbasis pasar",
    plain:
      "Salah satu dari dua cara wajib melaporkan listrik yang dibeli. kWh yang tercakup sertifikat dihitung nol, sisanya memakai bauran jaringan residual, jadi angkanya biasanya jauh lebih rendah daripada berbasis lokasi.",
  },
  "location-based": {
    expansion: "Scope 2 berbasis lokasi",
    plain:
      "Cara lain melaporkan listrik yang dibeli: setiap kWh dikalikan faktor jaringan di wilayah pemakaiannya, tanpa memperhitungkan sertifikat.",
  },
  EAC: {
    expansion: "Sertifikat atribut energi",
    plain:
      "Sertifikat yang membuktikan satu kWh listrik berasal dari sumber terbarukan. kWh yang tercakup dihitung nol dalam angka Scope 2 berbasis pasar.",
  },
  PPA: {
    expansion: "Perjanjian pembelian listrik",
    plain:
      "Kontrak jangka panjang untuk membeli listrik terbarukan. Kalkulator mengurangi porsi listrikmu yang tercakup kontrak ini dari angka berbasis pasar.",
  },
  GWP: {
    expansion: "Potensi pemanasan global",
    plain:
      "Seberapa besar satu ton suatu gas memanaskan atmosfer dibandingkan CO₂, dalam periode tertentu.",
  },
  GWP100: {
    expansion: "Potensi pemanasan global 100 tahun",
    plain:
      "Skor pemanasan standar 100 tahun untuk gas pendingin, sehingga kebocoran bisa diubah menjadi kg CO₂e.",
  },
  SAF: {
    expansion: "Bahan bakar penerbangan berkelanjutan",
    plain:
      "Bahan bakar penerbangan dari limbah atau bahan bukan pangan, bukan dari minyak mentah. Penghematannya diukur terhadap kerosin konvensional.",
  },
  HVO: {
    expansion: "Minyak nabati terhidrogenasi",
    plain: "Pengganti solar yang dibuat dari minyak jelantah atau minyak nabati.",
  },
  RDE: {
    expansion: "Realized Decarbonization Effects",
    plain:
      "Indikator kedua milik DHL: emisi yang dihindari dengan beralih ke bahan bakar berkelanjutan, kendaraan listrik, atau listrik terbarukan. Dilaporkan di samping inventaris, tidak pernah di dalamnya.",
  },
  "SHA-256": {
    expansion: "Secure Hash Algorithm, 256-bit",
    plain:
      "Sidik jari satu arah dari data yang diekspor, dihitung di browser-mu. Ini menunjukkan apakah data berubah; bukan bukti bahwa data itu benar.",
  },
  "GHG Protocol": {
    expansion: "Greenhouse Gas Protocol",
    plain:
      "Standar akuntansi yang mendefinisikan Scope 1–3 dan pemisahan pasar/lokasi. C—METRIC mengikuti strukturnya; bukan berarti tersertifikasi terhadapnya.",
  },
  GLEC: {
    expansion: "Global Logistics Emissions Council Framework",
    plain:
      "Kerangka faktor khusus logistik (versi 3.1) yang disebut DHL untuk faktor bahan bakar dan transportasi.",
  },
  IEA: {
    expansion: "International Energy Agency",
    plain:
      "Menerbitkan set faktor listrik dan pemanas distrik 2024 yang dipakai DHL untuk Scope 2.",
  },
  AIB: {
    expansion: "Association of Issuing Bodies",
    plain:
      "Asosiasi operator jaringan listrik Eropa yang menerbitkan bauran listrik residual untuk Scope 2 berbasis pasar.",
  },
  DEFRA: {
    expansion: "UK Department for Environment, Food & Rural Affairs",
    plain:
      "Menerbitkan faktor konversi gas rumah kaca Inggris setiap tahun, banyak dipakai untuk estimasi Scope 3 berbasis belanja.",
  },
  IPCC: {
    expansion: "Intergovernmental Panel on Climate Change",
    plain:
      "Badan PBB yang laporan asesmennya menetapkan skor pemanasan gas seperti refrigeran. AR6 berarti laporan asesmen keenam.",
  },
  "ISO 14064-1 / -3": {
    expansion: "Standar ISO 14064-1 dan 14064-3",
    plain:
      "Standar internasional untuk menghitung inventaris gas rumah kaca (-1) dan memverifikasinya (-3).",
  },
  "ISO 14083": {
    expansion: "ISO 14083",
    plain:
      "Standar internasional untuk menghitung emisi gas rumah kaca dari operasi rantai transportasi, termasuk well-to-wheel.",
  },
  CSRD: {
    expansion: "Corporate Sustainability Reporting Directive",
    plain:
      "Aturan UE yang mewajibkan perusahaan besar melaporkan informasi keberlanjutan, termasuk iklim.",
  },
  "ESRS E1": {
    expansion: "European Sustainability Reporting Standards, standar iklim",
    plain: "Templat UE untuk melaporkan data iklim di dalam CSRD.",
  },
  "S-K": {
    expansion: "SEC Regulation S-K",
    plain:
      "Formulir pengungkapan AS tempat perusahaan melaporkan informasi material, termasuk risiko iklim.",
  },
  SEC: {
    expansion: "US Securities and Exchange Commission",
    plain: "Regulator pasar AS yang menerbitkan aturan pengungkapan S-K.",
  },
  SBTi: {
    expansion: "Science Based Targets initiative",
    plain:
      "Badan yang memeriksa apakah target emisi perusahaan sesuai jalur Persetujuan Paris. Registry menampilkan garis acuan 1,5 °C yang bersifat ilustratif.",
  },
  "EU ETS": {
    expansion: "European Union Emissions Trading System",
    plain:
      "Pasar karbon UE. DHL menyebutnya sebagai salah satu sistem tempat inventarisnya berada; tidak dipakai sebagai faktor di aplikasi ini.",
  },
  IATA: {
    expansion: "International Air Transport Association",
    plain: "Menerbitkan parameter emisi angkutan udara untuk penerbangan barang dan penumpang.",
  },
  HBEFA: {
    expansion: "Handbook of Emission Factors",
    plain: "Faktor acuan Jerman untuk transportasi jalan dan bahan bakar.",
  },
  SmartWay: {
    expansion: "US EPA SmartWay",
    plain:
      "Basis data AS tentang pemakaian bahan bakar dan emisi angkutan barang jalan raya, dipakai untuk data primer pemasok.",
  },
  EPA: {
    expansion: "US Environmental Protection Agency",
    plain: "Regulator lingkungan AS di balik data angkutan SmartWay.",
  },
  "Clean Cargo": {
    expansion: "Clean Cargo Project",
    plain: "Organisasi nirlaba yang memelihara faktor emisi untuk pengiriman laut.",
  },
  PDF: {
    expansion: "Portable Document Format",
    plain:
      "Format cetak dengan tata letak tetap. Lembar A4 Dossier dicetak dari browser-mu sendiri, jadi tidak ada yang diunggah.",
  },
  A4: {
    expansion: "Kertas A4, 210 × 297 mm",
    plain: "Ukuran kertas yang ditampilkan pratinjau Dossier pada skala 1:1.",
  },
  CSV: {
    expansion: "Comma-separated values",
    plain:
      "Tabel teks biasa, satu baris per aktivitas. Bisa dibuka di program spreadsheet apa pun.",
  },
  JSON: {
    expansion: "JavaScript Object Notation",
    plain:
      "Ekspor teks terstruktur yang membawa setiap faktor dan statusnya, untuk dipakai ulang di alat lain.",
  },
  XBRL: {
    expansion: "eXtensible Business Reporting Language",
    plain:
      "Format pelabelan regulasi untuk pelaporan. Dinonaktifkan di versi ini.",
  },
  PNG: {
    expansion: "Portable Network Graphics",
    plain: "Format gambar untuk struk karbon yang diunduh dan kartu cerita 9:16.",
  },
};
