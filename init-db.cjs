const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "portfolio2026",
  port: 3306,
};

async function run() {
  console.log("Menghubungkan ke MySQL...");
  const conn = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  console.log(`Membuat database '${dbConfig.database}' jika belum ada...`);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
  await conn.end();

  const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 5,
  });

  console.log("Membuat tabel-tabel secara otomatis...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`homepage\` (
      \`id\` INT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`projects\` (
      \`id\` INT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`experiences\` (
      \`id\` INT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`ai_items\` (
      \`id\` INT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`achievements\` (
      \`id\` INT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`activities\` (
      \`id\` INT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`system_logs\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`data\` JSON NOT NULL
    )
  `);

  console.log("\nMemulai pemindahan data dari berkas JSON ke MySQL...");

  async function migrate(tableName, jsonFile) {
    const filePath = path.join(process.cwd(), "data", jsonFile);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const list = JSON.parse(content);
      
      // Clear existing records
      await pool.query(`DELETE FROM \`${tableName}\``);
      
      if (tableName === 'homepage') {
        const item = Array.isArray(list) ? list[0] : list;
        await pool.query(`INSERT INTO homepage (id, data) VALUES (1, ?)`, [JSON.stringify(item)]);
        console.log(`- Tabel 'homepage' sukses dimigrasikan.`);
      } else {
        const array = Array.isArray(list) ? list : [list];
        for (const item of array) {
          const id = item.id || 1;
          await pool.query(`INSERT INTO \`${tableName}\` (id, data) VALUES (?, ?)`, [id, JSON.stringify(item)]);
        }
        console.log(`- Tabel '${tableName}' sukses dimigrasikan. ${array.length} data dimasukkan.`);
      }
    } catch (e) {
      if (tableName === 'homepage') {
        const initialHomepage = {
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
        await pool.query("INSERT INTO homepage (id, data) VALUES (1, ?)", [JSON.stringify(initialHomepage)]);
        console.log(`- Tabel 'homepage' disemai dengan data default.`);
      } else {
        console.log(`- Tabel '${tableName}' dilewati atau file '${jsonFile}' tidak ditemukan: ${e.message}`);
      }
    }
  }

  await migrate('homepage', 'homepage.json');
  await migrate('projects', 'projects.json');
  await migrate('experiences', 'experiences.json');
  await migrate('ai_items', 'ai-items.json');
  await migrate('achievements', 'achievements.json');
  await migrate('activities', 'activities.json');

  // System logs
  try {
    const logPath = path.join(process.cwd(), "data", "system-logs.json");
    const content = await fs.readFile(logPath, 'utf-8');
    const logs = JSON.parse(content);
    await pool.query("DELETE FROM system_logs");
    for (const log of logs) {
      await pool.query("INSERT INTO system_logs (data) VALUES (?)", [JSON.stringify(log)]);
    }
    console.log(`- Tabel 'system_logs' sukses dimigrasikan. ${logs.length} data dimasukkan.`);
  } catch(e) {
    console.log(`- Tabel 'system_logs' dilewati: ${e.message}`);
  }

  console.log("\nSemua tabel berhasil dibuat dan seluruh data JSON berhasil dimigrasikan ke MySQL!");
  await pool.end();
}

run().catch(console.error);
