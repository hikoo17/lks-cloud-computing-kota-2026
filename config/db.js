const mysql = require('mysql2');

// Ganti RDS_ENDPOINT dan PASSWORD dengan milikmu
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'database-1.c...us-east-1.rds.amazonaws.com', 
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'PASSWORD_RDS_KAMU',
  database: process.env.DB_NAME || 'db_kotatasikmalaya',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal:', err.message);
    return;
  }
  console.log('Berhasil terhubung ke RDS MySQL!');

  // Otomatis membuat tabel jika belum ada (karena soal tidak menyediakan schema)
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(255) NOT NULL,
      keterangan TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(createTableQuery, (err) => {
    if (err) console.error('Gagal membuat tabel:', err.message);
  });
});

module.exports = db;