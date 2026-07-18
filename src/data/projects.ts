export type ProjectCategory = "web" | "mobile" | "uiux" | "app";
export type ProjectType =
  | "internship"
  | "freelance"
  | "personal"
  | "competition"
  | "academic";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  subcategories: string[];
  type: ProjectType;
  partner: string;
  role: { id: string; en: string };
  period: string;
  status: { id: string; en: string };
  shortDesc: { id: string; en: string };
  overview: { id: string; en: string };
  challenges: { id: string; en: string };
  lessons: { id: string; en: string };
  techStack: string[];
  features: { id: string[]; en: string[] };
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "assri",
    title: "ASSRI",
    category: "web",
    subcategories: ["Healthcare", "Telemedicine", "Chatbot"],
    type: "internship",
    partner: "PT Global Data Inspirasi (Datains)",
    role: { id: "Full-Stack Developer (Capstone)", en: "Full-Stack Developer (Capstone)" },
    period: "Mar 2025 – Jan 2026",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Sistem telekonsultasi medis untuk simulasi praktik klinis jarak jauh mahasiswa kedokteran, dilengkapi AI agent chatbot screening pasien.",
      en: "A medical teleconsultation system for remote clinical practice simulation, featuring an AI agent chatbot for patient screening.",
    },
    overview: {
      id: "ASSRI dibangun sebagai proyek capstone selama magang di PT Global Data Inspirasi. Sistem ini mensimulasikan konsultasi medis jarak jauh antara pasien simulasi dan mahasiswa kedokteran, lengkap dengan modul penjadwalan dan riwayat konsultasi. AI agent berbasis n8n diintegrasikan sebagai chatbot kesehatan yang menyambut pasien, melakukan screening awal, lalu meneruskan hasilnya ke alur penjadwalan.",
      en: "ASSRI was built as a capstone project during an internship at PT Global Data Inspirasi. The system simulates remote medical consultation between simulated patients and medical students, complete with scheduling and consultation history modules. An n8n-based AI agent is integrated as the first-touch health chatbot, performing initial screening before routing to the scheduling flow.",
    },
    challenges: {
      id: "Tantangan utama adalah merancang alur percakapan chatbot yang menangkap keluhan pasien secara terstruktur tanpa terasa kaku, dan menyinkronkan hasil screening AI ke sistem penjadwalan Laravel secara real-time. Solusinya, flow n8n bertahap (multi-step conversational) yang terhubung ke Laravel via webhook API.",
      en: "The main challenge was designing a chatbot conversation flow that captured patient complaints in a structured way without feeling robotic, and synchronizing screening results with the Laravel scheduling system in real time. The solution: a staged conversational n8n flow connected to Laravel via webhook API.",
    },
    lessons: {
      id: "Proyek ini mengajarkan pentingnya merancang AI agent yang human-centered, bukan sekadar otomatisasi teknis, terutama untuk konteks kesehatan yang sensitif.",
      en: "This project taught the importance of designing human-centered AI agents rather than purely technical automation, especially in sensitive healthcare contexts.",
    },
    techStack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap", "n8n", "REST API", "Webhook"],
    features: {
      id: [
        "Simulasi telekonsultasi medis jarak jauh",
        "AI chatbot (n8n) untuk screening awal keluhan",
        "Modul penjadwalan konsultasi otomatis",
        "Riwayat & rekam konsultasi pasien",
        "Dashboard admin manajemen mahasiswa & jadwal",
      ],
      en: [
        "Remote medical teleconsultation simulation",
        "AI chatbot (n8n) for initial complaint screening",
        "Automated consultation scheduling module",
        "Patient consultation history & records",
        "Admin dashboard for student & schedule management",
      ],
    },
  },
  {
    id: 2,
    slug: "sim-mcu",
    title: "SIM Medical Check-Up (MCU)",
    category: "web",
    subcategories: ["Healthcare", "Hospital Administration"],
    type: "internship",
    partner: "RS AMC Muhammadiyah Yogyakarta",
    role: { id: "Full-Stack Developer Intern", en: "Full-Stack Developer Intern" },
    period: "Okt 2024 – Jan 2025",
    status: { id: "Online (Internal)", en: "Online (Internal)" },
    shortDesc: {
      id: "Sistem informasi manajemen untuk digitalisasi proses medical check-up pegawai rumah sakit.",
      en: "A management information system digitalizing hospital staff medical check-up processes.",
    },
    overview: {
      id: "Sistem MCU dikembangkan sebagai salah satu dari tiga sistem operasional yang didigitalisasi di RS AMC Muhammadiyah Yogyakarta. Sistem ini mencatat riwayat MCU pegawai, menyimpan hasil pemeriksaan secara terstruktur, dan memudahkan bagian HR/kesehatan kerja memantau status kesehatan pegawai.",
      en: "The MCU system was one of three operational systems digitalized at RS AMC Muhammadiyah Yogyakarta. It records employee MCU history, stores examination results in a structured format, and helps HR/occupational health monitor staff health status.",
    },
    challenges: {
      id: "Tantangan terbesar adalah memetakan alur kerja MCU yang manual ke struktur data digital yang tetap sesuai standar dokumentasi rumah sakit. Tim mewawancarai staf terkait untuk memahami format asli, lalu merancang skema database yang merepresentasikan seluruh field penting.",
      en: "The biggest challenge was mapping the manual MCU workflow into a digital data structure that complied with hospital documentation standards. The team interviewed staff to understand the original format, then designed a schema capturing all essential fields.",
    },
    lessons: {
      id: "Proyek ini memberikan pengalaman langsung dalam digitalisasi proses administrasi institusi kesehatan nyata, termasuk validasi data dan kepatuhan terhadap alur kerja yang sudah berjalan.",
      en: "This project provided hands-on experience digitalizing administrative processes in a real healthcare institution, including data validation and respecting existing workflows.",
    },
    techStack: ["CodeIgniter", "PHP", "MySQL", "Bootstrap", "jQuery"],
    features: {
      id: [
        "Pencatatan riwayat medical check-up pegawai",
        "Input & penyimpanan hasil pemeriksaan",
        "Pencarian & filter data pegawai per periode MCU",
        "Export laporan hasil MCU",
        "Manajemen akses berbasis role",
      ],
      en: [
        "Employee medical check-up history recording",
        "Examination result input & storage",
        "Search & filter employee data by MCU period",
        "MCU report export",
        "Role-based access management",
      ],
    },
  },
  {
    id: 3,
    slug: "sim-cuti",
    title: "SIM Cuti Pegawai",
    category: "web",
    subcategories: ["Business", "HR Management"],
    type: "internship",
    partner: "RS AMC Muhammadiyah Yogyakarta",
    role: { id: "Full-Stack Developer Intern", en: "Full-Stack Developer Intern" },
    period: "Okt 2024 – Jan 2025",
    status: { id: "Online (Internal)", en: "Online (Internal)" },
    shortDesc: {
      id: "Sistem pengajuan dan pengelolaan cuti pegawai digital, mencapai 100% keberhasilan pada black-box testing.",
      en: "A digital leave request and management system, achieving 100% success rate in black-box functionality testing.",
    },
    overview: {
      id: "SIM Cuti Pegawai memungkinkan pegawai mengajukan cuti online dengan alur approval berjenjang (atasan langsung hingga HR), menggantikan proses manual berbasis formulir fisik.",
      en: "The Employee Leave System allows staff to submit leave requests online with tiered approval (direct supervisor up to HR), replacing the previous manual paper-based process.",
    },
    challenges: {
      id: "Merancang alur approval berjenjang yang fleksibel mengikuti struktur organisasi rumah sakit yang kompleks. Tim menyelesaikannya dengan state machine sederhana dan notifikasi otomatis di setiap perubahan status.",
      en: "Designing a flexible tiered approval flow matching the hospital's complex organizational structure. Solved with a simple state machine and automatic notifications on status changes.",
    },
    lessons: {
      id: "Proyek ini memperkuat pemahaman tentang workflow approval berjenjang serta pentingnya pengujian fungsional menyeluruh sebelum sistem digunakan pada lingkungan produksi.",
      en: "This project reinforced understanding of tiered approval workflows and the importance of thorough functional testing before production deployment.",
    },
    techStack: ["CodeIgniter", "PHP", "MySQL", "Bootstrap", "jQuery"],
    features: {
      id: [
        "Pengajuan cuti online oleh pegawai",
        "Alur approval berjenjang (atasan → HR)",
        "Notifikasi status pengajuan cuti",
        "Riwayat & rekap cuti pegawai per periode",
        "100% pass rate pada black-box functionality testing",
      ],
      en: [
        "Online leave request by employees",
        "Tiered approval flow (supervisor → HR)",
        "Leave status notifications",
        "Leave history & recap per period",
        "100% pass rate on black-box functionality testing",
      ],
    },
  },
  {
    id: 4,
    slug: "sim-presensi",
    title: "SIM Presensi Pegawai",
    category: "web",
    subcategories: ["Business", "HR Management", "Biometric"],
    type: "internship",
    partner: "RS AMC Muhammadiyah Yogyakarta",
    role: { id: "Full-Stack Developer Intern", en: "Full-Stack Developer Intern" },
    period: "Okt 2024 – Jan 2025",
    status: { id: "Online (Internal)", en: "Online (Internal)" },
    shortDesc: {
      id: "Sistem presensi pegawai dengan validasi face capture dan GPS untuk akurasi kehadiran.",
      en: "A hospital staff attendance system with face capture and GPS validation for attendance accuracy.",
    },
    overview: {
      id: "SIM Presensi menggantikan sistem manual/fingerprint konvensional dengan validasi ganda: pengambilan foto wajah dan verifikasi lokasi GPS saat check-in/check-out, mencegah kecurangan presensi (titip absen).",
      en: "The Employee Attendance System replaces conventional manual/fingerprint attendance with dual validation: face capture and GPS location verification during check-in/check-out, preventing buddy punching.",
    },
    challenges: {
      id: "Memastikan proses pengambilan foto dan validasi lokasi berjalan cepat tanpa membebani perangkat pegawai yang bervariasi. Tim mengoptimalkan ukuran capture dan menerapkan toleransi radius GPS yang wajar.",
      en: "Ensuring photo capture and location validation ran quickly without overburdening varied employee devices. The team optimized capture size and applied a reasonable GPS radius tolerance.",
    },
    lessons: {
      id: "Pengalaman praktis mengimplementasikan validasi biometrik dan geolocation pada aplikasi web, serta pentingnya menyeimbangkan keamanan sistem dan kenyamanan pengguna.",
      en: "Practical experience implementing biometric and geolocation validation, and the importance of balancing security with end-user convenience.",
    },
    techStack: ["CodeIgniter", "PHP", "MySQL", "Bootstrap", "Geolocation API", "Face Capture"],
    features: {
      id: [
        "Presensi dengan validasi face capture",
        "Validasi lokasi check-in/check-out via GPS",
        "Rekap kehadiran harian & bulanan",
        "Deteksi anomali presensi (lokasi di luar radius)",
        "Dashboard monitoring kehadiran untuk HR",
      ],
      en: [
        "Attendance with face capture validation",
        "GPS-based check-in/check-out location validation",
        "Daily & monthly attendance recap",
        "Attendance anomaly detection (out-of-radius)",
        "HR attendance monitoring dashboard",
      ],
    },
  },
  {
    id: 5,
    slug: "healtisin",
    title: "Healtisin",
    category: "web",
    subcategories: ["Healthcare", "AI Chatbot"],
    type: "competition",
    partner: "PROXOCORIS International Competition 2025",
    role: { id: "AI / Full-Stack Developer", en: "AI / Full-Stack Developer" },
    period: "2025",
    status: { id: "Archived (Pasca-Kompetisi)", en: "Archived (Post-Competition)" },
    shortDesc: {
      id: "Chatbot kesehatan berbasis AI untuk skrining awal keluhan; Semi-Finalis Proxocoris International Competition 2025.",
      en: "An AI-powered health chatbot for initial complaint screening; Semi-Finalist at Proxocoris International Competition 2025.",
    },
    overview: {
      id: "Healtisin dikembangkan sebagai proyek kompetisi internasional yang mengangkat isu akses layanan kesehatan awal. Chatbot memanfaatkan model NLP untuk memahami keluhan pengguna dalam bahasa natural, mengklasifikasikan tingkat urgensi, dan memberikan rekomendasi tindak lanjut.",
      en: "Healtisin was developed as an international competition project addressing early-stage healthcare access. The chatbot uses NLP to understand user complaints in natural language, classify urgency, and provide follow-up recommendations.",
    },
    challenges: {
      id: "Melatih model NLP agar memahami variasi bahasa sehari-hari pengguna Indonesia yang sering tidak baku. Tim memperkaya dataset dengan frasa informal dan melakukan fine-tuning model Hugging Face.",
      en: "Training the NLP model to understand informal, everyday Indonesian language. The team enriched the dataset with informal phrases and fine-tuned a Hugging Face model.",
    },
    lessons: {
      id: "Iterasi cepat dalam pengembangan produk AI di bawah tekanan waktu, dan cara menyampaikan solusi teknis kepada juri non-teknis.",
      en: "Rapid iteration in AI product development under time pressure, and communicating technical solutions to non-technical judges.",
    },
    techStack: ["Python", "NLP", "Hugging Face", "Flask", "Streamlit"],
    features: {
      id: [
        "Chatbot skrining keluhan kesehatan berbasis NLP",
        "Klasifikasi tingkat urgensi keluhan",
        "Rekomendasi tindak lanjut & rujukan fasilitas kesehatan",
        "Riwayat percakapan pengguna",
        "Antarmuka chat interaktif",
      ],
      en: [
        "NLP-based health complaint screening chatbot",
        "Complaint urgency classification",
        "Follow-up & healthcare facility referral recommendations",
        "User conversation history",
        "Interactive chat interface",
      ],
    },
  },
  {
    id: 6,
    slug: "spmb",
    title: "SPMB (Sistem Penerimaan Murid Baru)",
    category: "web",
    subcategories: ["Business", "Education", "SaaS"],
    type: "freelance",
    partner: "PT Sarana Insan Muda Selaras",
    role: { id: "Freelance Full-Stack Developer", en: "Freelance Full-Stack Developer" },
    period: "Mei 2025 – Juni 2025",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Portal SaaS pendaftaran murid baru siap pakai untuk berbagai institusi pendidikan.",
      en: "A ready-to-use SaaS admissions portal for various educational institutions.",
    },
    overview: {
      id: "SPMB dirancang sebagai solusi SaaS reusable untuk sekolah/institusi pendidikan. Setiap institusi mengelola periode pendaftaran, jalur seleksi, dan publikasi via CMS terpusat; laporan pendaftaran dapat diekspor otomatis.",
      en: "SPMB was designed as a reusable SaaS solution for schools/educational institutions. Each institution manages registration periods, selection tracks, and publishing via a centralized CMS; reports can be exported automatically.",
    },
    challenges: {
      id: "Merancang arsitektur multi-tenant sederhana agar satu basis kode melayani beberapa institusi dengan konfigurasi berbeda. Solusinya: skema database dengan konsep tenant/institution_id dan panel konfigurasi dinamis.",
      en: "Designing a simple multi-tenant architecture so a single codebase could serve multiple institutions with different configurations. Solution: a tenant/institution_id database concept and a dynamic admin configuration panel.",
    },
    lessons: {
      id: "Pengalaman merancang produk SaaS scalable untuk multi-klien, dan pentingnya fleksibilitas konfigurasi.",
      en: "Experience designing a scalable multi-client SaaS product, and the importance of configuration flexibility.",
    },
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "jQuery", "DomPDF"],
    features: {
      id: [
        "Pendaftaran online murid baru",
        "CMS terpusat untuk konten institusi",
        "Manajemen jalur seleksi & periode pendaftaran",
        "Pelaporan otomatis (export PDF/Excel)",
        "Dashboard admin multi-institusi",
      ],
      en: [
        "Online new student registration",
        "Centralized CMS for institution content",
        "Selection track & registration period management",
        "Automated reporting (PDF/Excel export)",
        "Multi-institution admin dashboard",
      ],
    },
  },
  {
    id: 7,
    slug: "sdit-luqman",
    title: "Website Profil SDIT Luqman Al Hakim",
    category: "web",
    subcategories: ["Business", "Education"],
    type: "freelance",
    partner: "SDIT Luqman Al Hakim",
    role: { id: "Freelance Full-Stack Developer", en: "Freelance Full-Stack Developer" },
    period: "Jul 2025 – Agu 2025",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Website profil sekolah dengan CMS mandiri untuk staf nonteknis.",
      en: "A school profile website with a self-service CMS for non-technical staff.",
    },
    overview: {
      id: "Website ini memberikan identitas digital bagi SDIT Luqman Al Hakim, menampilkan profil, berita, pendaftaran, dan galeri. CMS dirancang dengan antarmuka sederhana agar staf nonteknis dapat memperbarui konten secara rutin.",
      en: "The website provides a digital identity for SDIT Luqman Al Hakim, showing profile, news, admissions, and gallery. The CMS is designed with a simple interface so non-technical staff can update content regularly.",
    },
    challenges: {
      id: "Merancang antarmuka CMS yang benar-benar intuitif bagi staf nonteknis. Tim menyederhanakan form input, menyediakan preview langsung, dan sesi pelatihan singkat.",
      en: "Designing a CMS interface truly intuitive for non-technical staff. The team simplified input forms, added live previews, and ran a brief training session.",
    },
    lessons: {
      id: "Pentingnya empati pengguna dalam desain antarmuka non-teknis dan nilai onboarding pasca-deployment.",
      en: "The importance of user empathy in non-technical interface design and the value of post-deployment onboarding.",
    },
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "TinyMCE"],
    features: {
      id: [
        "CMS mandiri untuk staf nonteknis",
        "Manajemen berita & kegiatan sekolah",
        "Galeri foto & informasi pendaftaran",
        "Halaman profil & visi-misi sekolah",
        "Preview konten sebelum publikasi",
      ],
      en: [
        "Self-service CMS for non-technical staff",
        "School news & activity management",
        "Photo gallery & admissions information",
        "School profile & vision-mission pages",
        "Content preview before publishing",
      ],
    },
  },
  {
    id: 8,
    slug: "jogjacare",
    title: "JogjaCare",
    category: "web",
    subcategories: ["Healthcare", "Tourism"],
    type: "academic",
    partner: "Case-Based Learning Kuliah",
    role: { id: "Full-Stack Developer", en: "Full-Stack Developer" },
    period: "2024/2025",
    status: { id: "Archived", en: "Archived" },
    shortDesc: {
      id: "Platform health-tourism menghubungkan wisatawan dengan layanan kesehatan di Yogyakarta.",
      en: "A health-tourism platform connecting travelers with healthcare services in Yogyakarta.",
    },
    overview: {
      id: "JogjaCare mengeksplorasi konsep health-tourism, di mana wisatawan dapat menemukan dan memesan layanan kesehatan (klinik, MCU wisata, konsultasi) yang terintegrasi dengan informasi destinasi wisata.",
      en: "JogjaCare explores the health-tourism concept, letting tourists discover and book healthcare services (clinics, tourist MCUs, consultations) integrated with tourist destination information.",
    },
    challenges: {
      id: "Menyatukan dua domain berbeda—layanan kesehatan dan pariwisata—dalam satu pengalaman pengguna yang koheren. Tim merancang arsitektur informasi yang memisahkan namun menghubungkan kedua domain.",
      en: "Merging two different domains—healthcare and tourism—into one coherent user experience. The team designed an information architecture that separated yet connected both.",
    },
    lessons: {
      id: "Berpikir lintas-domain dan kerja tim lintas disiplin, sekaligus memperkuat riset kebutuhan pengguna.",
      en: "Cross-domain thinking and cross-disciplinary teamwork, along with strengthening user needs research.",
    },
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "Google Maps API"],
    features: {
      id: [
        "Direktori layanan kesehatan untuk wisatawan",
        "Pemesanan konsultasi/MCU wisata",
        "Integrasi informasi destinasi wisata Yogyakarta",
        "Peta lokasi fasilitas kesehatan",
        "Ulasan & rating layanan",
      ],
      en: [
        "Healthcare service directory for tourists",
        "Tourist consultation/MCU booking",
        "Yogyakarta destination info integration",
        "Healthcare facility location map",
        "Service reviews & ratings",
      ],
    },
  },
  {
    id: 9,
    slug: "tokopedia-scraper",
    title: "Scraper Produk Tokopedia",
    category: "web",
    subcategories: ["E-commerce", "Automation"],
    type: "academic",
    partner: "-",
    role: { id: "Developer", en: "Developer" },
    period: "2024/2025",
    status: { id: "Archived", en: "Archived" },
    shortDesc: {
      id: "Tools web scraping untuk mengambil data produk dari Tokopedia guna analisis data.",
      en: "A web scraping tool for extracting Tokopedia product data for analytical purposes.",
    },
    overview: {
      id: "Proyek ini mengumpulkan data produk (nama, harga, rating, jumlah terjual) dari Tokopedia secara otomatis. Antarmuka React.js digunakan untuk memantau progres scraping dan menampilkan hasil terstruktur.",
      en: "The project auto-collects product data (name, price, rating, units sold) from Tokopedia. A React.js interface monitors scraping progress and displays structured results.",
    },
    challenges: {
      id: "Menangani rendering JavaScript dinamis Tokopedia dan mekanisme anti-scraping. Tim menggunakan headless browser dengan delay/rate-limiting yang wajar.",
      en: "Handling Tokopedia's JavaScript-based dynamic rendering and anti-scraping mechanisms. The team used a headless browser with reasonable delays/rate-limiting.",
    },
    lessons: {
      id: "Teknik web scraping modern untuk halaman dinamis, serta etika & batasan teknis dalam scraping.",
      en: "Modern web scraping techniques for dynamic pages, and the ethics & technical limits of scraping.",
    },
    techStack: ["React.js", "Node.js", "Playwright", "MongoDB", "Express.js"],
    features: {
      id: [
        "Scraping data produk (nama, harga, rating, terjual)",
        "Dashboard monitoring progres scraping",
        "Penyimpanan data terstruktur ke database",
        "Export data (CSV/JSON)",
        "Filter & pencarian data produk",
      ],
      en: [
        "Product data scraping (name, price, rating, sold)",
        "Scraping progress monitoring dashboard",
        "Structured database storage",
        "Data export (CSV/JSON)",
        "Product data filter & search",
      ],
    },
  },
  {
    id: 10,
    slug: "dashboard-prediksi-tokopedia",
    title: "Dashboard Prediksi Penjualan Tokopedia",
    category: "web",
    subcategories: ["Business", "E-commerce", "Data Science"],
    type: "academic",
    partner: "-",
    role: { id: "Data Scientist / Developer", en: "Data Scientist / Developer" },
    period: "2024/2025",
    status: { id: "Archived", en: "Archived" },
    shortDesc: {
      id: "Dashboard interaktif prediksi tren penjualan produk Tokopedia berbasis Ridge Regression.",
      en: "An interactive dashboard predicting Tokopedia sales trends using Ridge Regression.",
    },
    overview: {
      id: "Dashboard memvisualisasikan prediksi penjualan berdasarkan data historis Tokopedia, menggunakan Ridge Regression untuk mendeteksi produk berpotensi tinggi. Antarmuka Flask menampilkan grafik interaktif.",
      en: "The dashboard visualizes sales predictions from historical Tokopedia data using Ridge Regression to detect high-potential products, with interactive charts via a Flask interface.",
    },
    challenges: {
      id: "Menangani data historis yang tidak konsisten (missing value, outlier). Tim melakukan data cleaning ekstensif dan tuning regularisasi Ridge Regression.",
      en: "Handling inconsistent historical data (missing values, outliers). The team performed extensive cleaning and tuned Ridge Regression regularization.",
    },
    lessons: {
      id: "Pentingnya data preprocessing dan pemilihan model regresi yang tepat untuk data e-commerce noisy.",
      en: "The importance of data preprocessing and choosing the right regression model for noisy e-commerce data.",
    },
    techStack: ["Python", "Flask", "scikit-learn", "Pandas", "Plotly", "Ridge Regression"],
    features: {
      id: [
        "Prediksi tren penjualan berbasis Ridge Regression",
        "Visualisasi grafik interaktif",
        "Deteksi produk berpotensi tinggi",
        "Filter data berdasarkan kategori",
        "Export hasil prediksi",
      ],
      en: [
        "Ridge Regression-based sales trend prediction",
        "Interactive chart visualization",
        "High-potential product detection",
        "Category-based data filter",
        "Prediction result export",
      ],
    },
  },
  {
    id: 11,
    slug: "yahoo-finance-dashboard",
    title: "Dashboard Analitik Yahoo Finance",
    category: "web",
    subcategories: ["FinTech", "Business", "Data Visualization"],
    type: "personal",
    partner: "-",
    role: { id: "Developer", en: "Developer" },
    period: "2025",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Dashboard analitik saham real-time berbasis Yahoo Finance.",
      en: "A real-time stock analytics dashboard powered by Yahoo Finance.",
    },
    overview: {
      id: "Dashboard personal untuk mendalami visualisasi data finansial. Data harga saham diambil dari Yahoo Finance API dan ditampilkan sebagai candlestick chart serta indikator teknikal sederhana via React.js.",
      en: "A personal project deepening financial data visualization skills. Stock prices are pulled from Yahoo Finance API and shown as candlestick charts with simple technical indicators via React.js.",
    },
    challenges: {
      id: "Update data real-time tanpa membebani performa antarmuka saat menampilkan banyak titik data historis. Tim menerapkan pagination fetching dan memoization chart.",
      en: "Real-time updates without hurting UI performance when displaying many historical points. The team applied paginated fetching and chart memoization.",
    },
    lessons: {
      id: "Bekerja dengan data time-series & visualisasi finansial, serta optimasi performa React untuk volume data besar.",
      en: "Working with time-series data & financial visualization, plus React performance optimization for large data volumes.",
    },
    techStack: ["React.js", "Recharts", "Yahoo Finance API", "Node.js", "Express.js"],
    features: {
      id: [
        "Grafik candlestick harga saham real-time",
        "Indikator teknikal sederhana (moving average)",
        "Pencarian & perbandingan multi-saham",
        "Riwayat data harga historis",
        "Antarmuka dashboard responsif",
      ],
      en: [
        "Real-time candlestick stock charts",
        "Simple technical indicators (moving average)",
        "Multi-stock search & comparison",
        "Historical price data",
        "Responsive dashboard UI",
      ],
    },
  },
  {
    id: 12,
    slug: "preeklamsia-prediction",
    title: "Sistem Prediksi Preeklamsia & Eklamsia",
    category: "web",
    subcategories: ["Healthcare", "Medical", "Machine Learning"],
    type: "academic",
    partner: "-",
    role: { id: "Full-Stack Developer & Data Scientist", en: "Full-Stack Developer & Data Scientist" },
    period: "2024/2025",
    status: { id: "Archived", en: "Archived" },
    shortDesc: {
      id: "Sistem Django untuk memprediksi risiko preeklamsia-eklamsia ibu hamil dengan Logistic Regression.",
      en: "A Django system predicting preeclampsia-eclampsia risk in pregnant women using Logistic Regression.",
    },
    overview: {
      id: "Sistem membantu tenaga medis mendeteksi dini risiko preeklamsia-eklamsia berdasarkan data klinis (tekanan darah, riwayat kehamilan, hasil lab). Input via form Django, diproses model Logistic Regression, menghasilkan skor risiko.",
      en: "The system helps medical staff detect preeclampsia-eclampsia risk from clinical data (blood pressure, pregnancy history, lab results). Django form inputs are processed by a Logistic Regression model to produce a risk score.",
    },
    challenges: {
      id: "Dataset medis terbatas dan imbalanced (kasus jauh lebih sedikit). Tim menerapkan resampling dan memilih metrik precision-recall dibanding akurasi.",
      en: "Limited, imbalanced medical dataset. The team applied resampling and chose precision-recall metrics over accuracy.",
    },
    lessons: {
      id: "Tantangan ML di domain medis: data imbalanced dan pentingnya interpretabilitas model untuk keputusan klinis.",
      en: "ML challenges in the medical domain: imbalanced data and the importance of model interpretability for clinical decisions.",
    },
    techStack: ["Django", "Python", "scikit-learn", "Logistic Regression", "PostgreSQL", "Bootstrap"],
    features: {
      id: [
        "Input data klinis pasien",
        "Prediksi skor risiko preeklamsia-eklamsia",
        "Riwayat prediksi per pasien",
        "Visualisasi faktor risiko dominan",
        "Dashboard untuk tenaga medis",
      ],
      en: [
        "Patient clinical data input",
        "Preeclampsia-eclampsia risk score prediction",
        "Per-patient prediction history",
        "Dominant risk factor visualization",
        "Medical staff dashboard",
      ],
    },
  },
  {
    id: 13,
    slug: "sentiment-playstore",
    title: "Dashboard Analitik Sentimen Playstore",
    category: "web",
    subcategories: ["Business", "NLP", "Data Science"],
    type: "personal",
    partner: "-",
    role: { id: "Data Scientist / Developer", en: "Data Scientist / Developer" },
    period: "2025",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Dashboard analisis sentimen ulasan Playstore: studi kasus Gojek (Random Forest) & Spotify (Bi-LSTM).",
      en: "Playstore review sentiment analysis dashboard: Gojek (Random Forest) & Spotify (Bi-LSTM) case studies.",
    },
    overview: {
      id: "Dashboard menganalisis ribuan ulasan Gojek dan Spotify, mengklasifikasikan sentimen positif/negatif/netral. Dua model diuji: Random Forest untuk klasifikasi teks tradisional, dan Bi-LSTM untuk menangkap konteks sekuensial.",
      en: "The dashboard analyzes thousands of Gojek and Spotify reviews, classifying positive/negative/neutral sentiment. Two models are tested: Random Forest and Bi-LSTM.",
    },
    challenges: {
      id: "Membersihkan teks ulasan penuh singkatan, typo, dan bahasa gaul. Tim membangun pipeline preprocessing khusus (normalisasi, stemming Bahasa Indonesia).",
      en: "Cleaning review text full of abbreviations, typos, and slang. The team built a custom preprocessing pipeline (normalization, Indonesian stemming).",
    },
    lessons: {
      id: "Membandingkan performa model klasik vs deep learning pada NLP, serta pentingnya preprocessing teks informal.",
      en: "Comparing classical vs deep learning models on NLP, and the importance of informal text preprocessing.",
    },
    techStack: ["Python", "scikit-learn", "TensorFlow/Keras", "Streamlit", "Pandas", "Sastrawi"],
    features: {
      id: [
        "Klasifikasi sentimen ulasan (positif/negatif/netral)",
        "Perbandingan Random Forest vs Bi-LSTM",
        "Visualisasi distribusi sentimen per aplikasi",
        "Word cloud kata dominan per kategori",
        "Filter ulasan berdasarkan rating & tanggal",
      ],
      en: [
        "Review sentiment classification",
        "Random Forest vs Bi-LSTM comparison",
        "Per-app sentiment distribution visualization",
        "Word cloud per sentiment category",
        "Filter by rating & date",
      ],
    },
  },
  {
    id: 14,
    slug: "movie-recommendation-gnn",
    title: "Dashboard Rekomendasi Film (GNN)",
    category: "web",
    subcategories: ["Entertainment", "Machine Learning"],
    type: "personal",
    partner: "-",
    role: { id: "Data Scientist / Developer", en: "Data Scientist / Developer" },
    period: "2025",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Sistem rekomendasi film menggunakan Graph Neural Network untuk menangkap hubungan kompleks pengguna-film.",
      en: "A movie recommendation system using Graph Neural Networks to capture complex user-movie relationships.",
    },
    overview: {
      id: "Dashboard membangun graf hubungan pengguna-film-genre untuk menghasilkan rekomendasi lebih relevan dibanding collaborative filtering. GNN mempelajari embedding tiap node, lalu merekomendasikan berdasarkan kedekatan embedding.",
      en: "The dashboard builds a user-movie-genre graph for more relevant recommendations than collaborative filtering. The GNN learns node embeddings and recommends based on embedding proximity.",
    },
    challenges: {
      id: "Struktur graf tetap efisien meski node besar. Tim menerapkan subgraph sampling saat training untuk menjaga efisiensi komputasi.",
      en: "Keeping the graph computationally efficient with many nodes. The team applied subgraph sampling during training.",
    },
    lessons: {
      id: "Menerapkan GNN untuk sistem rekomendasi, pendekatan yang lebih jarang, serta optimasi komputasi graf.",
      en: "Applying GNNs to a recommender, a less-common approach, and graph computation optimization.",
    },
    techStack: ["Python", "PyTorch Geometric", "GNN", "Streamlit", "Pandas"],
    features: {
      id: [
        "Rekomendasi film berbasis GNN",
        "Visualisasi graf pengguna-film-genre",
        "Pencarian film & riwayat tontonan",
        "Perbandingan hasil rekomendasi antar model",
        "Antarmuka dashboard interaktif",
      ],
      en: [
        "GNN-based movie recommendations",
        "User-movie-genre graph visualization",
        "Movie search & watch history",
        "Model recommendation comparison",
        "Interactive dashboard UI",
      ],
    },
  },
  {
    id: 15,
    slug: "flowerhub",
    title: "Flowerhub Marketplace",
    category: "web",
    subcategories: ["Business", "E-commerce"],
    type: "freelance",
    partner: "TBD",
    role: { id: "Freelance Full-Stack Developer", en: "Freelance Full-Stack Developer" },
    period: "TBD",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Platform marketplace jual-beli produk bunga, menghubungkan florist dengan pembeli online.",
      en: "A marketplace for buying and selling flower products, connecting florists with buyers online.",
    },
    overview: {
      id: "Flowerhub adalah marketplace niche untuk produk bunga—dari rangkaian bunga segar hingga karangan bunga acara. Menyediakan katalog produk, keranjang belanja, dan pembayaran online.",
      en: "Flowerhub is a niche marketplace for flower products, from fresh arrangements to event bouquets. Provides catalog, cart, and online payments.",
    },
    challenges: {
      id: "Merancang katalog produk fleksibel untuk berbagai jenis rangkaian (custom order) sekaligus sederhana bagi florist kecil. Solusinya: struktur produk dengan varian dan opsi kustomisasi.",
      en: "Designing a catalog flexible for various arrangement types (custom orders) yet simple for small florists. Solution: product variants and customization options.",
    },
    lessons: {
      id: "Merancang e-commerce niche dengan kustomisasi produk, dan menjaga kesederhanaan UX bagi pelaku usaha kecil.",
      en: "Designing niche e-commerce with customization, and keeping UX simple for small business owners.",
    },
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "Midtrans"],
    features: {
      id: [
        "Katalog produk bunga dengan varian & kustomisasi",
        "Keranjang belanja & checkout online",
        "Integrasi payment gateway",
        "Manajemen stok & pesanan untuk florist",
        "Ulasan & rating produk",
      ],
      en: [
        "Flower catalog with variants & customization",
        "Cart & online checkout",
        "Payment gateway integration",
        "Florist stock & order management",
        "Product reviews & ratings",
      ],
    },
  },
  {
    id: 16,
    slug: "bait-parfum",
    title: "BAIT Parfum Marketplace",
    category: "web",
    subcategories: ["Business", "E-commerce"],
    type: "freelance",
    partner: "TBD",
    role: { id: "Freelance Full-Stack Developer", en: "Freelance Full-Stack Developer" },
    period: "TBD",
    status: { id: "Online", en: "Online" },
    shortDesc: {
      id: "Marketplace parfum menghubungkan penjual dan pembeli dalam satu platform terpusat.",
      en: "A perfume marketplace connecting sellers and buyers on a centralized platform.",
    },
    overview: {
      id: "BAIT adalah marketplace khusus parfum, menampilkan katalog dengan detail varian aroma, ukuran botol, dan pencarian per kategori aroma, dilengkapi manajemen pesanan dan pembayaran.",
      en: "BAIT is a perfume marketplace with catalog details for fragrance variants, bottle sizes, category-based search, plus order management and payments.",
    },
    challenges: {
      id: "Kategorisasi produk parfum yang informatif (aroma, konsentrasi, ukuran) agar pembeli menemukan produk sesuai preferensi. Solusinya: filter multi-atribut dan deskripsi produk yang lebih detail.",
      en: "Informative perfume categorization (fragrance, concentration, size) so buyers can find matches without trying. Solution: multi-attribute filters and richer descriptions.",
    },
    lessons: {
      id: "Merancang katalog yang bergantung pada atribut detail, dan membangun kepercayaan pembeli untuk produk yang sulit dievaluasi tanpa mencoba langsung.",
      en: "Designing an attribute-heavy catalog, and building buyer trust for products hard to evaluate without trying.",
    },
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "Midtrans"],
    features: {
      id: [
        "Katalog parfum dengan filter multi-atribut",
        "Deskripsi produk detail (aroma, konsentrasi, ukuran)",
        "Keranjang belanja & checkout online",
        "Integrasi payment gateway",
        "Manajemen pesanan & stok penjual",
      ],
      en: [
        "Perfume catalog with multi-attribute filters",
        "Detailed descriptions (fragrance, concentration, size)",
        "Cart & online checkout",
        "Payment gateway integration",
        "Seller order & stock management",
      ],
    },
  },
  {
    id: 17,
    slug: "uiux-puskesmas-godean",
    title: "UI/UX Skrining Ibu Hamil & Bayi Puskesmas Godean I",
    category: "uiux",
    subcategories: ["Healthcare", "Medical"],
    type: "academic",
    partner: "Puskesmas Godean I",
    role: { id: "UI/UX Designer", en: "UI/UX Designer" },
    period: "2024/2025",
    status: { id: "Archived (Design Concept)", en: "Archived (Design Concept)" },
    shortDesc: {
      id: "Perancangan UI/UX sistem skrining kesehatan ibu hamil dan bayi untuk Puskesmas Godean I.",
      en: "UI/UX design for a maternal and infant health screening system at Puskesmas Godean I.",
    },
    overview: {
      id: "Proyek merancang antarmuka sistem skrining kesehatan ibu hamil dan bayi untuk petugas Puskesmas Godean I. Prosesnya: riset kebutuhan pengguna (petugas & kader), wireframe, hingga high-fidelity prototype yang mempertimbangkan alur kerja posyandu dan pemeriksaan berkala.",
      en: "The project designed the interface for a maternal and infant screening system for Puskesmas Godean I workers, from user research (workers & community volunteers), wireframes, to a high-fidelity prototype accounting for community health post and periodic check-up workflows.",
    },
    challenges: {
      id: "Antarmuka tetap mudah digunakan kader dengan latar belakang teknologi bervariasi, sekaligus mengakomodasi data kompleks. Tim menyederhanakan form ke multi-step dan menggunakan ikon visual untuk mengurangi beban kognitif.",
      en: "Keeping the interface easy for volunteers with varied tech backgrounds while accommodating complex data. The team simplified forms into multi-step flows and used icons to reduce cognitive load.",
    },
    lessons: {
      id: "Pentingnya riset pengguna kontekstual di lapangan sebelum mendesain, terutama untuk tenaga kesehatan garis depan.",
      en: "The importance of contextual field research before designing, especially for frontline healthcare workers.",
    },
    techStack: ["Figma", "Design System", "User Research", "Wireframing", "Prototyping"],
    features: {
      id: [
        "Form skrining ibu hamil bertahap (multi-step)",
        "Modul pemantauan tumbuh kembang bayi",
        "Riwayat pemeriksaan per pasien",
        "Notifikasi jadwal pemeriksaan",
        "Desain ramah kader kesehatan",
      ],
      en: [
        "Multi-step maternal screening form",
        "Infant growth monitoring module",
        "Per-patient examination history",
        "Examination schedule notifications",
        "Volunteer-friendly design",
      ],
    },
  },
  {
    id: 18,
    slug: "uiux-bimbingan-unisa",
    title: "UI/UX SIM Bimbingan Akademik UNISA",
    category: "uiux",
    subcategories: ["Business", "Education"],
    type: "academic",
    partner: "Universitas 'Aisyiyah Yogyakarta (UNISA)",
    role: { id: "UI/UX Designer", en: "UI/UX Designer" },
    period: "2024/2025",
    status: { id: "Archived (Design Concept)", en: "Archived (Design Concept)" },
    shortDesc: {
      id: "Perancangan UI/UX sistem manajemen bimbingan akademik untuk Universitas 'Aisyiyah Yogyakarta.",
      en: "UI/UX design for an academic advising management system at Universitas 'Aisyiyah Yogyakarta.",
    },
    overview: {
      id: "Merancang antarmuka sistem bimbingan akademik yang menjembatani interaksi mahasiswa dan dosen PA: penjadwalan konsultasi, pencatatan progres akademik, dan riwayat bimbingan. Fokus pada kemudahan akses dua peran utama.",
      en: "Designed the interface bridging students and academic advisors: consultation scheduling, progress tracking, and advising history, focused on ease of access for both main roles.",
    },
    challenges: {
      id: "Satu sistem melayani dua peran dengan kebutuhan berbeda tanpa membingungkan. Solusinya: dashboard terpisah dengan navigasi disesuaikan namun tetap konsisten secara visual.",
      en: "One system serving two roles without confusion. Solution: separate dashboards with role-tailored navigation but consistent visuals.",
    },
    lessons: {
      id: "Merancang sistem multi-peran yang konsisten secara visual, dan memahami kebutuhan tiap peran secara mendalam.",
      en: "Designing multi-role systems that stay visually consistent, and understanding each role's needs deeply.",
    },
    techStack: ["Figma", "Design System", "User Research", "Wireframing", "Prototyping"],
    features: {
      id: [
        "Penjadwalan konsultasi bimbingan akademik",
        "Pencatatan progres akademik mahasiswa",
        "Riwayat bimbingan per semester",
        "Dashboard terpisah mahasiswa & dosen PA",
        "Notifikasi jadwal & pengingat bimbingan",
      ],
      en: [
        "Advising consultation scheduling",
        "Student academic progress tracking",
        "Per-semester advising history",
        "Separate dashboards for students & advisors",
        "Schedule & advising reminders",
      ],
    },
  },
  {
    id: 19,
    slug: "hope-labirin",
    title: "HOPE — Game Labirin Rumah Sakit",
    category: "app",
    subcategories: ["Game", "Desktop", "C++"],
    type: "academic",
    partner: "-",
    role: { id: "Game Developer", en: "Game Developer" },
    period: "2023",
    status: { id: "Archived", en: "Archived" },
    shortDesc: {
      id: "Game labirin bertema rumah sakit berbasis C++ konsol, mengangkat cerita pasien mencari jalan keluar penuh harapan.",
      en: "A hospital-themed maze game built in C++ console, telling the story of a patient searching for a hopeful way out.",
    },
    overview: {
      id: "HOPE adalah game labirin sederhana berbasis konsol yang dikembangkan menggunakan C++. Pemain menavigasi lorong rumah sakit yang berkelok untuk menemukan pintu keluar sambil menghindari rintangan. Proyek ini fokus pada logika algoritmik, struktur data array 2D, dan rendering karakter ASCII yang responsif terhadap input keyboard.",
      en: "HOPE is a simple console-based maze game developed in C++. Players navigate a winding hospital corridor to find the exit while avoiding obstacles. The project focuses on algorithmic logic, 2D array data structures, and ASCII rendering responsive to keyboard input.",
    },
    challenges: {
      id: "Membangun mekanik pergerakan real-time di lingkungan konsol tanpa engine game, sekaligus merancang generator labirin yang tetap solvable. Solusinya menggunakan algoritma DFS untuk pembangkitan labirin dan handling input non-blocking.",
      en: "Building real-time movement mechanics in a console environment without a game engine, and designing a maze generator that stays solvable. Solved using DFS for maze generation and non-blocking input handling.",
    },
    lessons: {
      id: "Memperdalam pemahaman struktur data (array 2D, stack) dan logika algoritma pathfinding secara langsung tanpa abstraksi engine.",
      en: "Deepened understanding of data structures (2D arrays, stacks) and pathfinding algorithm logic directly, without engine abstractions.",
    },
    techStack: ["C++", "Console I/O", "DFS Algorithm", "Data Structures"],
    features: {
      id: [
        "Navigasi labirin rumah sakit berbasis ASCII",
        "Pembangkitan labirin dengan algoritma DFS",
        "Input keyboard non-blocking real-time",
        "Sistem skor & waktu penyelesaian",
        "Cerita naratif bertema harapan pasien",
      ],
      en: [
        "ASCII-based hospital maze navigation",
        "DFS-based maze generation",
        "Real-time non-blocking keyboard input",
        "Score & completion time system",
        "Narrative story on patient hope",
      ],
    },
  },
  {
    id: 21,
    slug: "mcu-puskesmas-java",
    title: "Aplikasi MCU Puskesmas (Desktop Java)",
    category: "app",
    subcategories: ["Healthcare", "Desktop", "Java"],
    type: "academic",
    partner: "-",
    role: { id: "Desktop App Developer", en: "Desktop App Developer" },
    period: "2023",
    status: { id: "Archived", en: "Archived" },
    shortDesc: {
      id: "Aplikasi desktop Medical Check-Up untuk Puskesmas berbasis Java Swing, mencatat pemeriksaan pasien secara terstruktur.",
      en: "A desktop Medical Check-Up application for community health centers built with Java Swing, recording structured patient examinations.",
    },
    overview: {
      id: "Aplikasi MCU Puskesmas dikembangkan sebagai proyek akademik menggunakan Java Swing dan koneksi database MySQL via JDBC. Sistem ini mencatat data pasien, hasil pemeriksaan kesehatan dasar (tekanan darah, berat badan, gula darah), dan mencetak laporan MCU untuk digunakan petugas kesehatan di Puskesmas.",
      en: "The Puskesmas MCU app was developed as an academic project using Java Swing with a MySQL database via JDBC. It records patient data, basic health check results (blood pressure, weight, blood sugar), and prints MCU reports for use by health workers at community health centers.",
    },
    challenges: {
      id: "Mengelola state form dan validasi input pada Java Swing yang berbasis event listener manual, serta merancang skema database ringan namun cukup untuk kebutuhan Puskesmas. Solusinya: pemisahan layer DAO dan validasi terpusat di controller.",
      en: "Managing form state and input validation in Java Swing's manual event-listener model, and designing a lightweight but sufficient database schema for community health centers. Solved with DAO layer separation and centralized controller validation.",
    },
    lessons: {
      id: "Pengalaman pertama membangun aplikasi desktop dengan Java Swing + MySQL, memahami pola MVC/DAO, dan pentingnya UX form yang jelas untuk pengguna nonteknis.",
      en: "First experience building a desktop app with Java Swing + MySQL, understanding MVC/DAO patterns, and the importance of clear form UX for non-technical users.",
    },
    techStack: ["Java", "Java Swing", "JDBC", "MySQL", "MVC"],
    features: {
      id: [
        "Pencatatan data pasien Puskesmas",
        "Input hasil pemeriksaan kesehatan dasar",
        "Cetak laporan MCU pasien",
        "Pencarian & filter riwayat pemeriksaan",
        "Manajemen data petugas kesehatan",
      ],
      en: [
        "Community health center patient data recording",
        "Basic health examination result input",
        "Patient MCU report printing",
        "Examination history search & filter",
        "Health worker data management",
      ],
    },
  },
  {
    id: 20,
    slug: "satuamc",
    title: "SatuAMC",
    category: "mobile",
    subcategories: ["Healthcare", "Business"],
    type: "internship",
    partner: "RS AMC Muhammadiyah Yogyakarta",
    role: { id: "Full-Stack Developer Intern", en: "Full-Stack Developer Intern" },
    period: "Okt 2024 – Jan 2025",
    status: { id: "Online (Internal)", en: "Online (Internal)" },
    shortDesc: {
      id: "Aplikasi mobile-first untuk mendukung digitalisasi 3 sistem operasional RS AMC (MCU, Cuti, Presensi).",
      en: "A mobile-first companion app for RS AMC's three operational systems (MCU, Leave, Attendance).",
    },
    overview: {
      id: "SatuAMC adalah aplikasi mobile pendamping tiga sistem web operasional rumah sakit. Fokus utama adalah presensi mobile dengan validasi face capture dan GPS agar pegawai dapat mengakses layanan langsung dari smartphone.",
      en: "SatuAMC is a mobile companion to three hospital web systems. Main focus: mobile attendance with face capture and GPS so employees access services directly from smartphones.",
    },
    challenges: {
      id: "Mengintegrasikan tiga backend berbeda ke satu aplikasi mobile ringan dan responsif, serta memastikan face capture lancar di berbagai perangkat Android. Solusinya: Flutter cross-platform dengan pemanggilan REST API yang dioptimalkan.",
      en: "Integrating three backends into one lightweight, responsive mobile app while ensuring smooth face capture across Android devices. Solution: Flutter cross-platform with optimized REST API calls.",
    },
    lessons: {
      id: "Pengembangan mobile-first untuk enterprise (RS), optimasi performa lintas perangkat, dan integrasi API multi-sistem.",
      en: "Mobile-first development for enterprise (hospitals), cross-device performance optimization, and multi-system API integration.",
    },
    techStack: ["Flutter", "Dart", "REST API", "Geolocation", "Camera/Face Capture"],
    features: {
      id: [
        "Presensi mobile dengan face capture & validasi GPS",
        "Pengajuan cuti langsung dari mobile",
        "Akses riwayat MCU pegawai",
        "Notifikasi status pengajuan",
        "Antarmuka mobile-first ringan & responsif",
      ],
      en: [
        "Mobile attendance with face capture & GPS validation",
        "Mobile leave request",
        "Employee MCU history access",
        "Request status notifications",
        "Lightweight, responsive mobile-first UI",
      ],
    },
  },
];

export const categoryMeta: Record<
  ProjectCategory,
  { id: string; en: string; short: string; gradient: string }
> = {
  web: {
    id: "Web",
    en: "Web",
    short: "Web",
    gradient: "from-navy-deep via-navy to-accent",
  },
  mobile: {
    id: "Mobile",
    en: "Mobile",
    short: "Mobile",
    gradient: "from-accent via-accent-blue to-accent-glow",
  },
  uiux: {
    id: "UI/UX",
    en: "UI/UX",
    short: "UI/UX",
    gradient: "from-[oklch(0.55_0.11_25)] via-[oklch(0.6_0.12_45)] to-[oklch(0.7_0.08_60)]",
  },
  app: {
    id: "Aplikasi",
    en: "App",
    short: "App",
    gradient: "from-[oklch(0.35_0.12_150)] via-[oklch(0.5_0.14_170)] to-accent",
  },
};

export const typeLabel: Record<ProjectType, { id: string; en: string }> = {
  internship: { id: "Magang", en: "Internship" },
  freelance: { id: "Freelance", en: "Freelance" },
  personal: { id: "Personal", en: "Personal" },
  competition: { id: "Kompetisi", en: "Competition" },
  academic: { id: "Akademik", en: "Academic" },
};
