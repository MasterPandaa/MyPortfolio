import * as fs from "fs/promises";
import * as path from "path";
import { getCookie, setCookie, deleteCookie, getRequestIP, getRequestHeader } from "@tanstack/react-start/server";
import mysql from "mysql2/promise";

import { projects as initialProjects, type Project } from "../data/projects";
import { experiences as initialExperiences, type Experience, type Bilingual } from "../data/experiences";
import { aiItems as initialAiItems, type AiItem } from "../data/ai-data";
import { achievementItems as initialAchievements, type AchievementItem } from "../data/achievements";
import { activityItems as initialActivities, type ActivityItem } from "../data/activities";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // Ignore if already exists
  }
}

async function readJsonFile<T>(filename: string, initialData: T[]): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T[];
  } catch (e) {
    // If file doesn't exist, write initial data and return it
    await writeJsonFile(filename, initialData);
    return initialData;
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "portfolio2026",
  port: 3306,
};

let poolPromise: Promise<mysql.Pool> | null = null;

async function getPool(): Promise<mysql.Pool> {
  if (!poolPromise) {
    poolPromise = (async () => {
      // Connect first without DB to ensure DB exists
      const conn = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        port: dbConfig.port,
      });
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
      await conn.end();

      const pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Initialize schemas
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
      await pool.query(`
        CREATE TABLE IF NOT EXISTS \`contact_messages\` (
          \`id\` INT AUTO_INCREMENT PRIMARY KEY,
          \`data\` JSON NOT NULL
        )
      `);

      // Run migration
      await migrateJsonToMysql(pool);

      return pool;
    })();
  }
  return poolPromise;
}

async function migrateJsonToMysql(pool: mysql.Pool) {
  try {
    // 1. Homepage
    const [homepageRows] = await pool.query<mysql.RowDataPacket[]>("SELECT COUNT(*) as count FROM homepage");
    if (homepageRows[0].count === 0) {
      const data = await readJsonFile<any>("homepage.json", [initialHomepage]);
      await pool.query("INSERT INTO homepage (id, data) VALUES (1, ?)", [JSON.stringify(data[0] || initialHomepage)]);
    }

    // Helper to migrate list tables
    const migrateTable = async (tableName: string, jsonFilename: string, initialData: any[]) => {
      const [rows] = await pool.query<mysql.RowDataPacket[]>(`SELECT COUNT(*) as count FROM \`${tableName}\``);
      if (rows[0].count === 0) {
        const list = await readJsonFile<any>(jsonFilename, initialData);
        for (const item of list) {
          const id = item.id || 1;
          await pool.query(`INSERT INTO \`${tableName}\` (id, data) VALUES (?, ?)`, [id, JSON.stringify(item)]);
        }
      }
    };

    await migrateTable("projects", "projects.json", initialProjects);
    await migrateTable("experiences", "experiences.json", initialExperiences);
    await migrateTable("ai_items", "ai-items.json", initialAiItems);
    await migrateTable("achievements", "achievements.json", initialAchievements);
    await migrateTable("activities", "activities.json", initialActivities);

    // Logs migration
    const [logRows] = await pool.query<mysql.RowDataPacket[]>("SELECT COUNT(*) as count FROM system_logs");
    if (logRows[0].count === 0) {
      const list = await readJsonFile<any>("system-logs.json", []);
      for (const item of list) {
        await pool.query("INSERT INTO system_logs (data) VALUES (?)", [JSON.stringify(item)]);
      }
    }
  } catch (err) {
    console.error("Migration to MySQL failed:", err);
  }
}

// Authentication Helpers
export function checkIsAuthenticated(): boolean {
  try {
    const cookie = getCookie("admin_session");
    return cookie === "authenticated";
  } catch (e) {
    return false;
  }
}

export function loginSession(): void {
  try {
    setCookie("admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    });
  } catch (e) {
    console.error("Failed to set auth cookie", e);
  }
}

export function logoutSession(): void {
  try {
    deleteCookie("admin_session", {
      path: "/",
    });
  } catch (e) {
    console.error("Failed to delete auth cookie", e);
  }
}

// Projects CRUD
export async function getProjects(): Promise<Project[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM projects ORDER BY id ASC");
  return rows.map((r) => r.data) as Project[];
}

export async function saveProjects(projects: Project[]): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM projects");
  for (const item of projects) {
    await pool.query("INSERT INTO projects (id, data) VALUES (?, ?)", [item.id, JSON.stringify(item)]);
  }
}

// Experiences CRUD
export async function getExperiences(): Promise<Experience[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM experiences ORDER BY id ASC");
  return rows.map((r) => r.data) as Experience[];
}

export async function saveExperiences(experiences: Experience[]): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM experiences");
  for (const item of experiences) {
    await pool.query("INSERT INTO experiences (id, data) VALUES (?, ?)", [item.id, JSON.stringify(item)]);
  }
}

// AI Items CRUD
export async function getAiItems(): Promise<AiItem[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM ai_items ORDER BY id ASC");
  return rows.map((r) => r.data) as AiItem[];
}

export async function saveAiItems(aiItems: AiItem[]): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM ai_items");
  for (const item of aiItems) {
    await pool.query("INSERT INTO ai_items (id, data) VALUES (?, ?)", [item.id, JSON.stringify(item)]);
  }
}

// Achievements CRUD
export async function getAchievements(): Promise<AchievementItem[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM achievements ORDER BY id ASC");
  return rows.map((r) => r.data) as AchievementItem[];
}

export async function saveAchievements(achievements: AchievementItem[]): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM achievements");
  for (const item of achievements) {
    await pool.query("INSERT INTO achievements (id, data) VALUES (?, ?)", [item.id, JSON.stringify(item)]);
  }
}

// Activities CRUD
export async function getActivities(): Promise<ActivityItem[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM activities ORDER BY id ASC");
  return rows.map((r) => r.data) as ActivityItem[];
}

export async function saveActivities(activities: ActivityItem[]): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM activities");
  for (const item of activities) {
    await pool.query("INSERT INTO activities (id, data) VALUES (?, ?)", [item.id, JSON.stringify(item)]);
  }
}

// ============================================
// SYSTEM LOGS & SECURITY ANOMALY DETECTION
// ============================================

export interface SystemLog {
  id: number;
  timestamp: string;
  type: "auth_success" | "auth_failed" | "crud_create" | "crud_update" | "crud_delete" | "logs_clear";
  ip: string;
  userAgent: string;
  details: string;
  severity: "info" | "warning" | "danger";
}

export interface AnomalyAlert {
  type: "brute_force" | "rapid_modification" | "suspicious_agent";
  message: string;
  severity: "warning" | "danger";
  timestamp: string;
}

export async function getSystemLogs(): Promise<SystemLog[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM system_logs ORDER BY id DESC");
  return rows.map((r) => r.data) as SystemLog[];
}

export async function saveSystemLogs(logs: SystemLog[]): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM system_logs");
  for (const item of logs) {
    await pool.query("INSERT INTO system_logs (data) VALUES (?)", [JSON.stringify(item)]);
  }
}

export async function logEvent(
  type: SystemLog["type"],
  details: string,
  severity: SystemLog["severity"] = "info"
): Promise<void> {
  try {
    const logs = await getSystemLogs();
    const ip = getRequestIP() || "127.0.0.1";
    const userAgent = getRequestHeader("user-agent") || "Unknown";
    
    const newLog: SystemLog = {
      id: logs.length > 0 ? Math.max(...logs.map((l) => l.id)) + 1 : 1,
      timestamp: new Date().toISOString(),
      type,
      ip,
      userAgent,
      details,
      severity,
    };
    
    logs.push(newLog);
    // Keep only last 1000 logs to prevent file bloating
    if (logs.length > 1000) {
      logs.shift();
    }
    await saveSystemLogs(logs);
  } catch (e) {
    console.error("Error logging event:", e);
  }
}

export function detectAnomalies(logs: SystemLog[]): AnomalyAlert[] {
  const alerts: AnomalyAlert[] = [];
  const now = new Date().getTime();
  
  // 1. Detect Brute Force Login Attempts (> 5 failed logins within 10 minutes)
  const failedLoginsByIp = new Map<string, number[]>();
  logs.forEach((log) => {
    if (log.type === "auth_failed") {
      const time = new Date(log.timestamp).getTime();
      if (now - time < 10 * 60 * 1000) { // last 10 minutes
        const list = failedLoginsByIp.get(log.ip) || [];
        list.push(time);
        failedLoginsByIp.set(log.ip, list);
      }
    }
  });

  failedLoginsByIp.forEach((attempts, ip) => {
    if (attempts.length >= 5) {
      alerts.push({
        type: "brute_force",
        message: `Deteksi Brute Force: Terjadi ${attempts.length} kali percobaan login gagal dari IP ${ip} dalam 10 menit terakhir.`,
        severity: "danger",
        timestamp: new Date().toISOString(),
      });
    }
  });

  // 2. Detect Rapid Content Modification (> 10 write actions in 5 minutes)
  const writeActions = logs.filter((log) => {
    const isWrite = ["crud_create", "crud_update", "crud_delete"].includes(log.type);
    const time = new Date(log.timestamp).getTime();
    return isWrite && (now - time < 5 * 60 * 1000); // last 5 minutes
  });

  if (writeActions.length >= 10) {
    alerts.push({
      type: "rapid_modification",
      message: `Deteksi Anomali: Perubahan konten yang sangat cepat (${writeActions.length} aktivitas CRUD) dalam 5 menit terakhir.`,
      severity: "warning",
      timestamp: new Date().toISOString(),
    });
  }

  // 3. Detect Suspicious Automation Agents (e.g. sqlmap, nikto, curl, python-requests, etc)
  const automationKeywords = ["sqlmap", "nikto", "curl", "python", "scrapy", "wget", "nmap"];
  const uniqueSuspiciousIps = new Set<string>();
  logs.forEach((log) => {
    const ua = log.userAgent.toLowerCase();
    const time = new Date(log.timestamp).getTime();
    if (now - time < 30 * 60 * 1000) { // last 30 minutes
      const isSuspicious = automationKeywords.some((keyword) => ua.includes(keyword));
      if (isSuspicious) {
        uniqueSuspiciousIps.add(`${log.ip} (${log.userAgent})`);
      }
    }
  });

  uniqueSuspiciousIps.forEach((info) => {
    alerts.push({
      type: "suspicious_agent",
      message: `Deteksi Agen Otomatisasi: Kunjungan terdeteksi menggunakan bot/skrip mencurigakan dari ${info}.`,
      severity: "warning",
      timestamp: new Date().toISOString(),
    });
  });

  return alerts;
}

// ============================================
// HOMEPAGE CRUD PERSISTENCE
// ============================================

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

const initialHomepage: HomepageData = {
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

export async function getHomepage(): Promise<HomepageData> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT data FROM homepage WHERE id = 1");
  if (rows.length === 0) return initialHomepage;
  return rows[0].data as HomepageData;
}

export async function saveHomepage(data: HomepageData): Promise<void> {
  const pool = await getPool();
  await pool.query("INSERT INTO homepage (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)", [
    JSON.stringify(data),
  ]);
}

// ============================================
// IMAGE UPLOAD PERSISTENCE
// ============================================

export async function uploadImage(base64Data: string, filename: string): Promise<string> {
  const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const base64Content = base64Data.split(";base64,").pop() || "";
  const buffer = Buffer.from(base64Content, "base64");

  // Clean filename to prevent traversal and sanitize
  const cleanName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const uniqueName = `${Date.now()}_${cleanName}`;
  const filePath = path.join(UPLOAD_DIR, uniqueName);

  await fs.writeFile(filePath, buffer);
  return `/uploads/${uniqueName}`;
}

// ============================================
// CONTACT MESSAGES DB PERSISTENCE
// ============================================

export interface ContactMessage {
  id?: number;
  timestamp: string;
  name: string;
  subject: string;
  message: string;
  ip: string;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const pool = await getPool();
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT id, data FROM contact_messages ORDER BY id DESC");
  return rows.map((r) => {
    const msg = r.data;
    msg.id = r.id;
    return msg;
  }) as ContactMessage[];
}

export async function insertContactMessage(msg: Omit<ContactMessage, "id">): Promise<void> {
  const pool = await getPool();
  await pool.query("INSERT INTO contact_messages (data) VALUES (?)", [JSON.stringify(msg)]);
}

export async function deleteContactMessage(id: number): Promise<void> {
  const pool = await getPool();
  await pool.query("DELETE FROM contact_messages WHERE id = ?", [id]);
}



