export type AchievementCategory = "certification" | "award" | "publication";
export type PublicationType = "research" | "community";

export interface AchievementItem {
  id: number;
  slug: string;
  category: AchievementCategory;
  title: string;
  subtitle: { id: string; en: string };
  description: { id: string; en: string };
  keywords: string[];
  year: number;
  issuer?: string;
  publicationType?: PublicationType;
  journal?: string;
  thumbnail?: string;
  certificateUrl?: string;
  doiUrl?: string;
}

export const categoryMeta: Record<
  AchievementCategory,
  { id: string; en: string; gradient: string }
> = {
  certification: {
    id: "Sertifikasi",
    en: "Certifications",
    gradient: "from-navy-deep via-navy to-[oklch(0.45_0.15_285)]",
  },
  award: {
    id: "Penghargaan",
    en: "Awards",
    gradient: "from-[oklch(0.6_0.14_60)] via-[oklch(0.65_0.15_45)] to-[oklch(0.55_0.16_30)]",
  },
  publication: {
    id: "Publikasi",
    en: "Publications",
    gradient: "from-[oklch(0.45_0.11_200)] via-accent to-accent-glow",
  },
};

export const publicationTypeMeta: Record<
  PublicationType,
  { id: string; en: string; dot: string; text: string; bg: string }
> = {
  research: {
    id: "Riset",
    en: "Research",
    dot: "bg-accent",
    text: "text-accent",
    bg: "bg-accent/10 border-accent/30",
  },
  community: {
    id: "Pengabdian",
    en: "Community Service",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
};

export const achievementItems: AchievementItem[] = [
  // ===== Sertifikasi =====
  {
    id: 1,
    slug: "sertifikat-bnsp",
    category: "certification",
    title: "Sertifikat Kompetensi BNSP",
    subtitle: {
      id: "Badan Nasional Sertifikasi Profesi",
      en: "National Professional Certification Board",
    },
    description: {
      id: "Sertifikasi kompetensi resmi dari BNSP sebagai pengakuan atas keahlian teknis di bidang pengembangan perangkat lunak dan analisis data.",
      en: "Official competency certification from BNSP recognizing technical expertise in software development and data analysis.",
    },
    keywords: ["BNSP", "Kompetensi", "Sertifikasi Profesi"],
    year: 2024,
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
  },
  {
    id: 2,
    slug: "sertifikat-hki",
    category: "certification",
    title: "Sertifikat HKI (Hak Kekayaan Intelektual)",
    subtitle: {
      id: "Direktorat Jenderal Kekayaan Intelektual — Kemenkumham",
      en: "Directorate General of Intellectual Property — Ministry of Law",
    },
    description: {
      id: "Pengakuan hak kekayaan intelektual atas karya cipta di bidang perangkat lunak yang telah tercatat secara resmi.",
      en: "Intellectual property rights recognition for original software works officially registered with DJKI.",
    },
    keywords: ["HKI", "Hak Cipta", "IP"],
    year: 2024,
    issuer: "DJKI Kemenkumham RI",
  },

  // ===== Penghargaan =====
  {
    id: 3,
    slug: "mahasiswa-berprestasi-2024",
    category: "award",
    title: "Mahasiswa Berprestasi 2024",
    subtitle: {
      id: "Penghargaan tingkat universitas",
      en: "University-level achievement award",
    },
    description: {
      id: "Penghargaan sebagai mahasiswa berprestasi atas kontribusi akademik, riset, dan aktivitas non-akademik selama tahun 2024.",
      en: "Outstanding student award recognizing academic, research, and non-academic contributions throughout 2024.",
    },
    keywords: ["Mawapres", "Prestasi Akademik"],
    year: 2024,
    issuer: "Universitas",
  },
  {
    id: 4,
    slug: "semi-finalis-proxocoris-2025",
    category: "award",
    title: "Semi-Finalis Proxocoris 2025",
    subtitle: {
      id: "Kompetisi teknologi nasional",
      en: "National technology competition",
    },
    description: {
      id: "Berhasil menembus babak semi-final ajang Proxocoris 2025 dengan solusi berbasis teknologi yang menyelesaikan permasalahan nyata.",
      en: "Reached the semi-final round of Proxocoris 2025 with a technology-based solution tackling real-world problems.",
    },
    keywords: ["Kompetisi", "Semi-finalis", "Proxocoris"],
    year: 2025,
    issuer: "Proxocoris",
  },

  // ===== Publikasi =====
  {
    id: 5,
    slug: "sast-llm-code-quality",
    category: "publication",
    title:
      "SAST Implementation for Evaluating LLM-Generated Code Quality using Prompt Engineering",
    subtitle: {
      id: "Jurnal ilmiah — Riset",
      en: "Scientific journal — Research",
    },
    description: {
      id: "Penelitian tentang penerapan Static Application Security Testing (SAST) untuk mengevaluasi kualitas dan keamanan kode yang dihasilkan Large Language Model (LLM) melalui teknik prompt engineering.",
      en: "Research on applying Static Application Security Testing (SAST) to evaluate the quality and security of LLM-generated code through prompt engineering techniques.",
    },
    keywords: ["SAST", "LLM", "Prompt Engineering", "Code Quality"],
    year: 2026,
    publicationType: "research",
    journal: "Jurnal Ilmiah",
  },
  {
    id: 6,
    slug: "si-cuti-asri-medical-center",
    category: "publication",
    title:
      "Perancangan Sistem Informasi Cuti Berbasis Web pada Rumah Sakit Asri Medical Center",
    subtitle: {
      id: "Jurnal ilmiah — Riset",
      en: "Scientific journal — Research",
    },
    description: {
      id: "Perancangan dan implementasi sistem informasi manajemen cuti karyawan berbasis web untuk Rumah Sakit Asri Medical Center guna mempercepat proses pengajuan dan persetujuan cuti.",
      en: "Design and implementation of a web-based employee leave management information system for Asri Medical Center Hospital to streamline leave request and approval workflows.",
    },
    keywords: ["Sistem Informasi", "Web", "Rumah Sakit", "Cuti"],
    year: 2024,
    publicationType: "research",
    journal: "Jurnal Ilmiah",
  },
  {
    id: 7,
    slug: "pkm-pra-ngadisuryan",
    category: "publication",
    title: "PKM Pra Ngadisuryan",
    subtitle: {
      id: "Jurnal pengabdian masyarakat",
      en: "Community service journal",
    },
    description: {
      id: "Publikasi hasil kegiatan Program Kreativitas Mahasiswa (PKM) pengabdian masyarakat di kawasan Pra Ngadisuryan dengan fokus pada pemberdayaan warga dan literasi digital.",
      en: "Publication of a Student Creativity Program (PKM) community service project in the Pra Ngadisuryan area focusing on community empowerment and digital literacy.",
    },
    keywords: ["PKM", "Pengabdian", "Pra Ngadisuryan"],
    year: 2025,
    publicationType: "community",
    journal: "Jurnal Pengabdian Masyarakat",
  },
  {
    id: 8,
    slug: "kkn-dabag-2",
    category: "publication",
    title: "KKN Dabag 2",
    subtitle: {
      id: "Jurnal pengabdian masyarakat",
      en: "Community service journal",
    },
    description: {
      id: "Publikasi hasil kegiatan Kuliah Kerja Nyata (KKN) di wilayah Dabag 2 yang mencakup program pemberdayaan masyarakat, edukasi, dan implementasi teknologi tepat guna.",
      en: "Publication of a Community Service (KKN) program in Dabag 2, covering community empowerment, education, and appropriate technology deployment.",
    },
    keywords: ["KKN", "Pengabdian", "Dabag"],
    year: 2025,
    publicationType: "community",
    journal: "Jurnal Pengabdian Masyarakat",
  },
];
