export type ActivityRatio = "3/4" | "4/3" | "16/9" | "9/16" | "1/1" | "2/3" | "3/2";

export interface ActivityItem {
  id: number;
  image: string;
  ratio: ActivityRatio;
  keywords: string[];
  alt: { id: string; en: string };
}

// Approx dimensions per ratio for stable picsum requests
const dims: Record<ActivityRatio, [number, number]> = {
  "3/4": [600, 800],
  "4/3": [800, 600],
  "16/9": [960, 540],
  "9/16": [540, 960],
  "1/1": [700, 700],
  "2/3": [600, 900],
  "3/2": [900, 600],
};

function pic(seed: string, ratio: ActivityRatio) {
  const [w, h] = dims[ratio];
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export const activityItems: ActivityItem[] = [
  {
    id: 1,
    image: pic("kkn-dabag", "4/3"),
    ratio: "4/3",
    keywords: ["KKN", "Pengabdian", "Dabag"],
    alt: { id: "Kegiatan KKN Dabag 2", en: "KKN Dabag 2 activity" },
  },
  {
    id: 2,
    image: pic("pkm-speaker", "16/9"),
    ratio: "16/9",
    keywords: ["PKM", "Speaker", "Ngadisuryan"],
    alt: {
      id: "Menjadi speaker PKM Pra Ngadisuryan",
      en: "Speaker at PKM Pra Ngadisuryan",
    },
  },
  {
    id: 3,
    image: pic("ml-tournament", "1/1"),
    ratio: "1/1",
    keywords: ["Turnamen", "Mobile Legends", "Juara"],
    alt: {
      id: "Juara turnamen Mobile Legends",
      en: "Mobile Legends tournament champion",
    },
  },
  {
    id: 4,
    image: pic("magang-amc", "3/4"),
    ratio: "3/4",
    keywords: ["Magang", "RS AMC", "Kesehatan"],
    alt: {
      id: "Magang di RS AMC Muhammadiyah Yogyakarta",
      en: "Internship at RS AMC Muhammadiyah Yogyakarta",
    },
  },
  {
    id: 5,
    image: pic("sidang-skripsi", "9/16"),
    ratio: "9/16",
    keywords: ["Skripsi", "Sidang", "Akademik"],
    alt: { id: "Sidang skripsi", en: "Thesis defense" },
  },
  {
    id: 6,
    image: pic("seminar-proposal", "3/2"),
    ratio: "3/2",
    keywords: ["Seminar", "Proposal", "Riset"],
    alt: { id: "Seminar proposal", en: "Proposal seminar" },
  },
  {
    id: 7,
    image: pic("kampus-momen", "2/3"),
    ratio: "2/3",
    keywords: ["Kampus", "Momen"],
    alt: { id: "Momen kampus", en: "Campus moment" },
  },
  {
    id: 8,
    image: pic("workshop-komunitas", "16/9"),
    ratio: "16/9",
    keywords: ["Workshop", "Komunitas"],
    alt: { id: "Workshop komunitas", en: "Community workshop" },
  },
];

export function getPopularKeywords(limit = 6): string[] {
  const freq = new Map<string, number>();
  for (const item of activityItems) {
    for (const k of item.keywords) freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([k]) => k);
}
