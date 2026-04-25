import mysql from 'mysql2/promise';

// Log database config for debugging (without password)
console.log('[v0] DB Config:', {
  host: process.env.DB_HOST || 'NOT SET',
  port: process.env.DB_PORT || '25060',
  user: process.env.DB_USER || 'NOT SET',
  database: process.env.DB_NAME || 'NOT SET',
  hasPassword: !!process.env.DB_PASSWORD,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '25060'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000, // 5 second timeout
});

export default pool;

export async function query<T>(sql: string, params?: unknown[]): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

export async function getConnection() {
  return pool.getConnection();
}
