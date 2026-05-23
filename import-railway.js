require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function importDb() {
  try {
    // Connect without selecting a database first to create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || process.env.MYSQLHOST || 'kodama.proxy.rlwy.net',
      user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
      password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || 'NpsEruucviAiSamAVVSWSqLVNXvrwIBV',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : (process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 41301),
      multipleStatements: true
    });
    console.log("Connected to Railway!");
    const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);
    console.log(`Database ${dbName} ready. Importing data...`);
    const sql = fs.readFileSync('purchase_point (5).sql', 'utf8');
    await connection.query(sql);
    console.log("SUCCESS! All data imported into Railway database.");
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}
importDb();
