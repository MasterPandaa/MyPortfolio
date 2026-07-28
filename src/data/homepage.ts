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
    id: "AI Agent Engineer · QA Enthusiast · Full-Stack Developer",
    en: "AI Agent Engineer · QA Enthusiast · Full-Stack Developer",
  },
  description: {
    id: "Lulusan S1 Teknologi Informasi (IPK 3,83/4,00) dengan pengalaman mengembangkan solusi AI Agent serta aplikasi web maupun mobile yang telah diimplementasikan dan diuji di sektor kesehatan dan pendidikan. Terbiasa mengintegrasikan teknologi AI ke dalam alur kerja pengembangan untuk mempercepat analisis, pemrograman, dokumentasi, pembuatan aset visual, serta eksplorasi berbagai pendekatan solusi.",
    en: "Information Technology graduate (GPA 3.83/4.00) with experience developing AI Agent solutions as well as web and mobile applications implemented and tested across healthcare and education sectors. Accustomed to integrating AI technology into the development workflow to accelerate analysis, programming, documentation, visual asset creation, and solution exploration.",
  },
  gpa: "3.83 / 4.00",
  focus: "AI Agent · QA · Web",
  available: {
    id: "Tersedia untuk kolaborasi",
    en: "Available for collaboration",
  },
  skillGroups: [
    {
      iconName: "Bot",
      id: "AI Agent & LLM",
      en: "AI Agent & LLM",
      items: ["n8n", "LLM Integration", "Prompt Engineering", "AI Agent Development"],
    },
    {
      iconName: "ShieldCheck",
      id: "Quality Assurance & Testing",
      en: "Quality Assurance & Testing",
      items: ["Black-box Testing", "Regression Testing", "SAST/White-box Testing"],
    },
    {
      iconName: "Layout",
      id: "Web & Mobile Development",
      en: "Web & Mobile Development",
      items: ["Laravel", "CodeIgniter", "Django", "Flask", "React.js", "Flutter", "Python", "Git", "Docker"],
    },
    {
      iconName: "Server",
      id: "Database & Infrastruktur",
      en: "Database & Infrastructure",
      items: ["MySQL", "MongoDB", "Docker", "Kubernetes"],
    },
    {
      iconName: "Database",
      id: "Data Engineering & ML",
      en: "Data Engineering & ML",
      items: ["Data Engineering", "Machine Learning", "Big Data", "Apache Spark", "Apache Kafka", "ETL Pipeline", "Web Scraping"],
    },
    {
      iconName: "Palette",
      id: "Creative & Design Tools",
      en: "Creative & Design Tools",
      items: ["Canva", "Capcut", "Adobe Photoshop", "Adobe Premiere Pro", "Figma"],
    },
  ],
};
