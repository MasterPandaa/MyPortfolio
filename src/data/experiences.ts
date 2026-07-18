export type Bilingual = { id: string; en: string };

export interface Experience {
  id?: number; // Added to make CRUD management easier, will auto-increment
  role: Bilingual;
  company: string;
  period: Bilingual;
  duration: Bilingual;
  status: Bilingual;
  location: string;
  workType: Bilingual;
  tasks: Bilingual[];
  learnings: Bilingual[];
  impact: Bilingual[];
}

export const experiences: Experience[] = [
  {
    id: 4,
    role: { id: "Freelance Full-Stack Developer", en: "Freelance Full-Stack Developer" },
    company: "SDIT Luqman Al Hakim",
    period: { id: "Juli 2025 – Agustus 2025", en: "July 2025 – August 2025" },
    duration: { id: "2 bulan", en: "2 months" },
    status: { id: "Freelance", en: "Freelance" },
    location: "Yogyakarta, Indonesia",
    workType: { id: "Remote", en: "Remote" },
    tasks: [
      {
        id: "Membangun website profil sekolah berbasis Laravel dengan CMS mandiri.",
        en: "Built a Laravel-based school profile website with a self-managed CMS.",
      },
    ],
    learnings: [
      {
        id: "Merancang CMS yang ramah bagi pengguna nonteknis (user-friendly admin panel).",
        en: "Designing a CMS friendly for non-technical users (user-friendly admin panel).",
      },
    ],
    impact: [
      {
        id: "Staf nonteknis dapat mengelola konten dan publikasi informasi tanpa keahlian coding.",
        en: "Non-technical staff can manage content and publish information without coding skills.",
      },
    ],
  },
  {
    id: 3,
    role: { id: "Freelance Full-Stack Developer", en: "Freelance Full-Stack Developer" },
    company: "PT Sarana Insan Muda Selaras",
    period: { id: "Mei 2025 – Juni 2025", en: "May 2025 – June 2025" },
    duration: { id: "2 bulan", en: "2 months" },
    status: { id: "Freelance", en: "Freelance" },
    location: "Yogyakarta, Indonesia",
    workType: { id: "Remote", en: "Remote" },
    tasks: [
      {
        id: "Mengembangkan portal Penerimaan Murid Baru (SPMB) berbasis Laravel sebagai solusi SaaS.",
        en: "Developed a Laravel-based New Student Admissions (SPMB) portal as a SaaS solution.",
      },
      {
        id: "Membangun fitur pendaftaran online, CMS terpusat, dan pelaporan otomatis.",
        en: "Built online registration features, a centralized CMS, and automated reporting.",
      },
    ],
    learnings: [
      {
        id: "Merancang produk berbasis model SaaS yang dapat digunakan ulang oleh berbagai institusi (multi-tenant/reusable system).",
        en: "Designing SaaS-based products reusable across institutions (multi-tenant / reusable systems).",
      },
      {
        id: "Membangun sistem pelaporan otomatis untuk kebutuhan administrasi pendidikan.",
        en: "Building automated reporting systems for education administration needs.",
      },
    ],
    impact: [
      {
        id: "Menghasilkan solusi siap pakai (ready-to-use) bagi berbagai institusi pendidikan.",
        en: "Delivered a ready-to-use solution for various educational institutions.",
      },
      {
        id: "Menyederhanakan proses pendaftaran murid baru secara digital.",
        en: "Simplified the new student admission process digitally.",
      },
    ],
  },
  {
    id: 1,
    role: {
      id: "Full-Stack Developer Intern (Capstone Project)",
      en: "Full-Stack Developer Intern (Capstone Project)",
    },
    company: "PT Global Data Inspirasi (Datains)",
    period: { id: "Maret 2025 – Januari 2026", en: "March 2025 – January 2026" },
    duration: { id: "11 bulan", en: "11 months" },
    status: { id: "Magang (Capstone Project)", en: "Internship (Capstone Project)" },
    location: "Yogyakarta, Indonesia",
    workType: { id: "Remote", en: "Remote" },
    tasks: [
      {
        id: "Membangun sistem telekonsultasi medis \"ASSRI\" berbasis Laravel untuk simulasi praktik klinis jarak jauh mahasiswa kedokteran.",
        en: "Built the \"ASSRI\" medical teleconsultation system on Laravel for remote clinical practice simulations for medical students.",
      },
      {
        id: "Mengintegrasikan AI agent (n8n) sebagai chatbot kesehatan untuk mengotomatisasi screening keluhan pasien dan alur penjadwalan.",
        en: "Integrated an AI agent (n8n) as a health chatbot to automate patient complaint screening and scheduling flows.",
      },
    ],
    learnings: [
      {
        id: "Integrasi AI agent/automation (n8n) ke dalam sistem web berbasis Laravel.",
        en: "Integrating AI agents / automation (n8n) into Laravel-based web systems.",
      },
      {
        id: "Perancangan flow chatbot untuk kebutuhan domain kesehatan (screening & scheduling).",
        en: "Designing chatbot flows for healthcare domains (screening & scheduling).",
      },
    ],
    impact: [
      {
        id: "Menyediakan simulasi praktik klinis jarak jauh yang mendukung pembelajaran mahasiswa kedokteran.",
        en: "Enabled remote clinical practice simulations supporting medical student learning.",
      },
      {
        id: "Otomatisasi proses screening pasien mengurangi beban administratif manual.",
        en: "Automated patient screening reduced manual administrative workload.",
      },
    ],
  },
  {
    id: 2,
    role: { id: "Full-Stack Developer Intern", en: "Full-Stack Developer Intern" },
    company: "Rumah Sakit AMC Muhammadiyah Yogyakarta",
    period: { id: "Oktober 2024 – Januari 2025", en: "October 2024 – January 2025" },
    duration: { id: "4 bulan", en: "4 months" },
    status: { id: "Magang", en: "Internship" },
    location: "Yogyakarta, Indonesia",
    workType: { id: "Onsite", en: "Onsite" },
    tasks: [
      {
        id: "Mengembangkan 3 sistem operasional (MCU, Cuti, Presensi) berbasis CodeIgniter untuk digitalisasi administrasi RS.",
        en: "Developed 3 operational systems (MCU, Leave, Attendance) on CodeIgniter to digitize hospital administration.",
      },
      {
        id: "Mengimplementasikan validasi face capture & GPS pada sistem presensi.",
        en: "Implemented face-capture & GPS validation in the attendance system.",
      },
      {
        id: "Merilis aplikasi mobile \"SatuAMC\" (Flutter) untuk mendukung digitalisasi sistem operasional RS.",
        en: "Released the \"SatuAMC\" mobile app (Flutter) to support hospital operations digitization.",
      },
    ],
    learnings: [
      {
        id: "Implementasi validasi biometrik (face capture) & geolocation (GPS) dalam sistem presensi.",
        en: "Implementing biometric (face capture) & geolocation (GPS) validation in attendance systems.",
      },
      {
        id: "Pengembangan aplikasi mobile cross-platform dengan Flutter untuk kebutuhan enterprise/institusi.",
        en: "Building cross-platform mobile apps with Flutter for enterprise / institutional needs.",
      },
    ],
    impact: [
      {
        id: "Sistem Cuti mencapai 100% keberhasilan pada pengujian fungsionalitas (black-box testing).",
        en: "The Leave system achieved 100% success on functional (black-box) testing.",
      },
      {
        id: "Mempercepat & mendigitalisasi proses administrasi rumah sakit yang sebelumnya manual.",
        en: "Accelerated and digitized previously manual hospital administration processes.",
      },
    ],
  },
];
