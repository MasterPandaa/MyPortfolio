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
      console.log(`- Tabel '${tableName}' dilewati atau file '${jsonFile}' tidak ditemukan: ${e.message}`);
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
