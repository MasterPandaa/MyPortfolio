export type AiCategory = "model" | "dataset" | "tool";
export type AiStatus = "online" | "archived" | "offline" | "maintenance";

export interface AiItem {
  id: number;
  slug: string;
  category: AiCategory;
  title: string;
  subtitle: { id: string; en: string };
  description: { id: string; en: string };
  keywords: string[];
  status: AiStatus;
  domain?: string;
  metrics?: string[];
  volume?: string;
  runtime?: string[];
  thumbnail?: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const categoryMeta: Record<
  AiCategory,
  { id: string; en: string; gradient: string }
> = {
  model: {
    id: "Model",
    en: "Model",
    gradient: "from-navy-deep via-navy to-[oklch(0.45_0.15_285)]",
  },
  dataset: {
    id: "Dataset",
    en: "Dataset",
    gradient: "from-[oklch(0.45_0.11_200)] via-accent to-accent-glow",
  },
  tool: {
    id: "Tools",
    en: "Tools",
    gradient: "from-[oklch(0.6_0.14_60)] via-[oklch(0.65_0.15_45)] to-[oklch(0.55_0.16_30)]",
  },
};

export const statusMeta: Record<
  AiStatus,
  { id: string; en: string; dot: string; text: string; bg: string }
> = {
  online: {
    id: "Online",
    en: "Online",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  maintenance: {
    id: "Maintenance",
    en: "Maintenance",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
  archived: {
    id: "Diarsipkan",
    en: "Archived",
    dot: "bg-slate-400",
    text: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-500/10 border-slate-500/30",
  },
  offline: {
    id: "Offline",
    en: "Offline",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-300",
    bg: "bg-red-500/10 border-red-500/30",
  },
};

export const aiItems: AiItem[] = [
  // ============ MODELS (6) ============
  {
    id: 1,
    slug: "fraud-logreg",
    category: "model",
    title: "Deteksi Fraud — Logistic Regression",
    subtitle: {
      id: "Klasifikasi transaksi mencurigakan pada data tabular",
      en: "Suspicious transaction classification on tabular data",
    },
    description: {
      id: "Model klasifikasi biner untuk mendeteksi transaksi fraud dari data transaksi finansial dengan feature engineering & class balancing.",
      en: "Binary classification model to detect fraudulent transactions from financial data with feature engineering & class balancing.",
    },
    keywords: ["Logistic Regression", "Fraud", "Tabular", "Imbalanced"],
    status: "online",
    domain: "Tabular · Fraud",
    metrics: ["Accuracy 94%", "Precision 0.89", "Recall 0.82"],
  },
  {
    id: 2,
    slug: "sentimen-gojek-rf",
    category: "model",
    title: "Analisis Sentimen Gojek — Random Forest",
    subtitle: {
      id: "Klasifikasi sentimen ulasan pengguna aplikasi Gojek",
      en: "Sentiment classification of Gojek app user reviews",
    },
    description: {
      id: "Pipeline NLP klasik (TF-IDF + Random Forest) untuk mengklasifikasi ulasan menjadi positif/negatif/netral dari data Playstore.",
      en: "Classical NLP pipeline (TF-IDF + Random Forest) to classify reviews into positive/negative/neutral from Playstore data.",
    },
    keywords: ["NLP", "Random Forest", "TF-IDF", "Sentiment"],
    status: "online",
    domain: "NLP · Sentiment",
    metrics: ["Accuracy 86%", "F1 0.84"],
  },
  {
    id: 3,
    slug: "sentimen-spotify-bilstm",
    category: "model",
    title: "Analisis Sentimen Spotify — Bi-LSTM",
    subtitle: {
      id: "Deep learning sekuensial untuk ulasan aplikasi Spotify",
      en: "Sequential deep learning for Spotify app reviews",
    },
    description: {
      id: "Model Bi-directional LSTM dengan word embedding untuk menangkap konteks kata pada ulasan berbahasa Indonesia.",
      en: "Bi-directional LSTM with word embeddings to capture word context in Indonesian reviews.",
    },
    keywords: ["Deep Learning", "Bi-LSTM", "NLP", "Embedding"],
    status: "online",
    domain: "NLP · Deep Learning",
    metrics: ["Accuracy 89%", "F1 0.87", "Val loss 0.31"],
  },
  {
    id: 4,
    slug: "rekomendasi-film-gnn",
    category: "model",
    title: "Rekomendasi Film — Graph Neural Network",
    subtitle: {
      id: "Sistem rekomendasi berbasis GNN pada graf user-item",
      en: "GNN-based recommendation on user-item graph",
    },
    description: {
      id: "Rekomendasi film menggunakan GraphSAGE pada graf interaksi user-film untuk menangkap pola preferensi kompleks.",
      en: "Movie recommendation with GraphSAGE on user-movie interaction graph to capture complex preference patterns.",
    },
    keywords: ["GNN", "GraphSAGE", "Recsys", "PyTorch Geometric"],
    status: "maintenance",
    domain: "Recsys · Graph",
    metrics: ["Recall@10 0.31", "NDCG@10 0.28"],
  },
  {
    id: 5,
    slug: "prediksi-tokopedia-ridge",
    category: "model",
    title: "Rekomendasi Penjualan Tokopedia — Ridge Regression",
    subtitle: {
      id: "Prediksi potensi penjualan produk e-commerce",
      en: "Sales potential prediction for e-commerce products",
    },
    description: {
      id: "Model regresi berpenalti L2 untuk memprediksi penjualan produk dari fitur harga, rating, jumlah ulasan, dan kategori.",
      en: "L2-penalized regression model to predict product sales from price, rating, review count, and category features.",
    },
    keywords: ["Ridge", "Regression", "Tabular", "E-commerce"],
    status: "online",
    domain: "Tabular · Regression",
    metrics: ["R² 0.78", "RMSE 42.3"],
  },
  {
    id: 6,
    slug: "preeklamsia-rf",
    category: "model",
    title: "Deteksi Preeklamsia & Eklamsia — Random Forest",
    subtitle: {
      id: "Klasifikasi risiko preeklamsia pada ibu hamil",
      en: "Preeclampsia risk classification for pregnant women",
    },
    description: {
      id: "Model klasifikasi multiclass untuk mengidentifikasi risiko preeklamsia/eklamsia dari fitur klinis dan riwayat medis.",
      en: "Multiclass classification model to identify preeclampsia/eclampsia risk from clinical features and medical history.",
    },
    keywords: ["Healthcare", "Random Forest", "Clinical", "Risk"],
    status: "archived",
    domain: "Healthcare · Clinical",
    metrics: ["Accuracy 91%", "Recall 0.88"],
  },

  // ============ DATASETS (16) ============
  {
    id: 7,
    slug: "ds-tokopedia-produk",
    category: "dataset",
    title: "List Produk E-Commerce Tokopedia Indonesia",
    subtitle: {
      id: "Kumpulan katalog produk hasil scraping Tokopedia",
      en: "Product catalog collection scraped from Tokopedia",
    },
    description: {
      id: "Dataset produk lintas kategori dengan harga, rating, jumlah ulasan, dan lokasi toko — cocok untuk analisis pasar dan model rekomendasi.",
      en: "Cross-category product dataset with price, rating, review count, and store location — suitable for market analysis and recommendation models.",
    },
    keywords: ["E-commerce", "Tokopedia", "Products", "Scraping"],
    status: "online",
    domain: "E-commerce",
    volume: "~50,000 rows · CSV",
  },
  {
    id: 8,
    slug: "ds-yt-banjir-sumatra",
    category: "dataset",
    title: "Komentar YouTube: Banjir Sumatra 2025",
    subtitle: {
      id: "Komentar publik terkait bencana banjir Sumatra 2025",
      en: "Public comments on the 2025 Sumatra flood disaster",
    },
    description: {
      id: "Komentar publik dari video-video berita banjir Sumatra 2025 untuk analisis sentimen sosial dan opini publik terhadap bencana.",
      en: "Public comments from Sumatra 2025 flood news videos for social sentiment analysis and public opinion on disasters.",
    },
    keywords: ["YouTube", "Comments", "Disaster", "Social"],
    status: "online",
    domain: "Social · Disaster",
    volume: "~18,000 rows · CSV",
  },
  ...([
    ["Grab", "grab"],
    ["Maxim", "maxim"],
    ["Gojek", "gojek"],
    ["Dana", "dana"],
    ["WhatsApp", "whatsapp"],
    ["Instagram", "instagram"],
    ["Spotify", "spotify"],
    ["TikTok", "tiktok"],
    ["Line", "line"],
    ["Discord", "discord"],
    ["Telegram", "telegram"],
    ["X (Twitter)", "x-twitter"],
  ].map(([name, slug], i) => ({
    id: 9 + i,
    slug: `ds-review-${slug}`,
    category: "dataset" as const,
    title: `Review App ${name} Indonesia Google Playstore`,
    subtitle: {
      id: `Ulasan pengguna aplikasi ${name} dari Google Playstore`,
      en: `User reviews of ${name} app from Google Playstore`,
    },
    description: {
      id: `Dataset ulasan berbahasa Indonesia untuk aplikasi ${name} lengkap dengan rating, tanggal, dan versi aplikasi — siap dipakai untuk analisis sentimen.`,
      en: `Indonesian review dataset for ${name} app complete with ratings, dates, and app versions — ready for sentiment analysis.`,
    },
    keywords: ["Playstore", "Reviews", "Sentiment", name],
    status: "online" as AiStatus,
    domain: "NLP · Reviews",
    volume: "~20,000 rows · CSV",
  }))),
  {
    id: 21,
    slug: "ds-traveloka-hotel-jogja",
    category: "dataset",
    title: "List Hotel Traveloka di Yogyakarta",
    subtitle: {
      id: "Katalog hotel Yogyakarta hasil scraping Traveloka",
      en: "Yogyakarta hotel catalog scraped from Traveloka",
    },
    description: {
      id: "Daftar hotel di Yogyakarta lengkap dengan harga, rating, fasilitas, dan lokasi geografis untuk analisis pasar perhotelan.",
      en: "Yogyakarta hotel listings with price, rating, amenities, and geolocation for hospitality market analysis.",
    },
    keywords: ["Traveloka", "Hotel", "Yogyakarta", "Travel"],
    status: "online",
    domain: "Travel · Hospitality",
    volume: "~1,200 rows · CSV",
  },
  {
    id: 22,
    slug: "ds-cinema-sintetis",
    category: "dataset",
    title: "Referensi Film & Transaksi Sintetis Bioskop",
    subtitle: {
      id: "Katalog film + transaksi tiket bioskop sintetis",
      en: "Film catalog + synthetic cinema ticket transactions",
    },
    description: {
      id: "Kombinasi referensi film dari TMDB dan transaksi tiket sintetis yang menyerupai pola pembelian nyata — cocok untuk uji sistem rekomendasi.",
      en: "Combination of TMDB film references and synthetic ticket transactions resembling real purchase patterns — suitable for recommendation system testing.",
    },
    keywords: ["Cinema", "TMDB", "Synthetic", "Transactions"],
    status: "online",
    domain: "Entertainment · Recsys",
    volume: "5,000 films · 100,000 tx · CSV",
  },

  // ============ TOOLS (4) ============
  {
    id: 23,
    slug: "tool-scraper-tokopedia",
    category: "tool",
    title: "Scraper Produk Tokopedia",
    subtitle: {
      id: "Scraper katalog produk Tokopedia berbasis Playwright",
      en: "Tokopedia product catalog scraper based on Playwright",
    },
    description: {
      id: "Scraper otomatis untuk mengambil data produk Tokopedia lintas kategori dengan penanganan lazy-load dan anti-bot ringan.",
      en: "Automated scraper to extract Tokopedia product data across categories with lazy-load handling and light anti-bot bypass.",
    },
    keywords: ["Scraper", "Playwright", "Tokopedia", "E-commerce"],
    status: "online",
    domain: "Scraping",
    runtime: ["Python", "Playwright", "CSV"],
  },
  {
    id: 24,
    slug: "tool-scraper-youtube",
    category: "tool",
    title: "Scraper Komentar YouTube",
    subtitle: {
      id: "Ekstraksi komentar publik dari video YouTube",
      en: "Public comment extraction from YouTube videos",
    },
    description: {
      id: "Tool CLI untuk mengambil komentar (termasuk balasan) dari daftar URL video YouTube dan mengekspornya ke CSV/JSON.",
      en: "CLI tool to fetch comments (including replies) from a list of YouTube video URLs and export them to CSV/JSON.",
    },
    keywords: ["Scraper", "YouTube", "Comments", "CLI"],
    status: "online",
    domain: "Scraping · Social",
    runtime: ["Python", "youtube-comment-downloader", "CSV"],
  },
  {
    id: 25,
    slug: "tool-scraper-playstore",
    category: "tool",
    title: "Scraper Ulasan Google Playstore",
    subtitle: {
      id: "Batch scraper ulasan aplikasi dari Google Playstore",
      en: "Batch scraper for app reviews from Google Playstore",
    },
    description: {
      id: "Tool batch untuk mengambil ulasan berbahasa Indonesia dari banyak aplikasi Playstore sekaligus dengan pagination otomatis.",
      en: "Batch tool to fetch Indonesian-language reviews from many Playstore apps at once with automatic pagination.",
    },
    keywords: ["Scraper", "Playstore", "Reviews", "Batch"],
    status: "online",
    domain: "Scraping · Reviews",
    runtime: ["Python", "google-play-scraper", "CSV"],
  },
  {
    id: 26,
    slug: "tool-scraper-tmdb",
    category: "tool",
    title: "Scraper List Film TMDB",
    subtitle: {
      id: "Ekstraksi katalog film dari TMDB API",
      en: "Movie catalog extraction from TMDB API",
    },
    description: {
      id: "Tool untuk mengambil metadata film (genre, cast, rating, sinopsis) dari TMDB API secara bulk untuk kebutuhan dataset rekomendasi.",
      en: "Tool to bulk-fetch movie metadata (genres, cast, ratings, synopsis) from TMDB API for recommendation dataset needs.",
    },
    keywords: ["Scraper", "TMDB", "API", "Movies"],
    status: "online",
    domain: "API · Movies",
    runtime: ["Python", "TMDB API", "JSON"],
  },
];
