require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function importDb() {
  try {
    // Build connection config from available env vars. Prefer full URLs from Railway.
    let host = process.env.DB_HOST || process.env.MYSQLHOST || 'kodama.proxy.rlwy.net';
    let user = process.env.DB_USER || process.env.MYSQLUSER || 'root';
    let password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || 'NpsEruucviAiSamAVVSWSqLVNXvrwIBV';
    let port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : (process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 41301);
    let dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway';

    // If a full MYSQL_URL or MYSQL_PUBLIC_URL is provided, parse it (supports mysql://user:pass@host:port/db)
    // Prefer public proxy URL for external runs, fall back to internal MYSQL_URL
    const urlToParse = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;
    if (urlToParse) {
      try {
        const parsed = new URL(urlToParse);
        if (parsed.protocol && parsed.protocol.startsWith('mysql')) {
          host = parsed.hostname || host;
          port = parsed.port ? parseInt(parsed.port) : port;
          user = parsed.username || user;
          password = parsed.password || password;
          const pathname = parsed.pathname || '';
          if (pathname && pathname.length > 1) dbName = pathname.replace(/^\//, '');
        }
      } catch (e) {
        // If URL parsing fails, fall back to individual env vars
        console.warn('Could not parse MYSQL_URL, falling back to individual env vars');
      }
    }

    // Connect without selecting a database first to create it
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      port,
      multipleStatements: true
    });
    console.log("Connected to database host", host + ':' + port);
    
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);
    console.log(`Database ${dbName} ready.`);

    // If database already has tables, skip import to avoid duplicate table errors
    const [tables] = await connection.query("SHOW TABLES;");
    if (tables && tables.length > 0) {
      console.log('Database already contains tables — skipping import.');
    } else {
      console.log('Importing data...');
      const sql = fs.readFileSync('purchase_point (5).sql', 'utf8');
      await connection.query(sql);
      console.log("SUCCESS! All data imported into Railway database.");
    }
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}
importDb();
