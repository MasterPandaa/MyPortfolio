import type { Bilingual } from "./experiences";

export interface HomepageData {
  name: string;
  subtitle: Bilingual;
  description: Bilingual;
  gpa: string;
  focus: string;
  available: Bilingual;
  skillGroups: {
    iconName: string;
    id: string;
    en: string;
    items: string[];
  }[];
}

export const homepageData: HomepageData = {
  name: "Muhammad Luthfi Abdillah",
  subtitle: {
    id: "Lulusan S1 Teknologi Informasi — Data Engineer & Full-Stack Developer",
    en: "Information Technology Graduate — Data Engineer & Full-Stack Developer",
  },
  description: {
    id: "Lulusan S1 Teknologi Informasi (IPK 3.83/4.00) dengan pengalaman lintas bidang Data Engineering, Data Science/AI, dan Full-Stack Web Development. Terbiasa merancang pipeline data end-to-end (ETL), membangun model machine learning, serta mengembangkan aplikasi web dan mobile skala produksi yang telah diimplementasikan di berbagai institusi kesehatan dan pendidikan.",
    en: "Information Technology graduate (GPA 3.83/4.00) with cross-disciplinary experience in Data Engineering, Data Science/AI, and Full-Stack Web Development. Experienced in designing end-to-end data pipelines (ETL), building machine learning models, and developing production-scale web and mobile applications implemented across various healthcare and education institutions.",
  },
  gpa: "3.83 / 4.00",
  focus: "Data · AI · Web",
  available: {
    id: "Tersedia untuk kolaborasi",
    en: "Available for collaboration",
  },
  skillGroups: [
    {
      iconName: "Code2",
      id: "Bahasa Pemrograman",
      en: "Programming Languages",
      items: ["Python", "PHP", "JavaScript", "SQL", "Dart", "Java", "C", "C++", "C#"],
    },
    {
      iconName: "Database",
      id: "Data Engineering & Big Data",
      en: "Data Engineering & Big Data",
      items: ["Apache Spark", "Hadoop", "Apache Kafka", "Prefect", "Playwright", "Octoparse", "ETL Pipeline"],
    },
    {
      iconName: "Brain",
      id: "Data Science & AI/ML",
      en: "Data Science & AI/ML",
      items: ["Machine Learning", "Deep Learning", "NLP", "Hugging Face", "Orange Data Mining"],
    },
    {
      iconName: "Layout",
      id: "Web & Mobile Development",
      en: "Web & Mobile Development",
      items: ["Laravel", "CodeIgniter", "Django", "Flask", "React.js", "Streamlit", "Flutter"],
    },
    {
      iconName: "Server",
      id: "Database & Infrastruktur",
      en: "Database & Infrastructure",
      items: ["MySQL", "MongoDB", "Docker", "Kubernetes"],
    },
    {
      iconName: "Wrench",
      id: "Tools Lainnya",
      en: "Other Tools",
      items: ["Git", "n8n (AI Agent Automation)", "Google Colab", "Kaggle"],
    },
  ],
};
