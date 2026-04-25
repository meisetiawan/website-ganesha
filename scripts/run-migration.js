import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  console.log('Running database migration...\n');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '25060'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      multipleStatements: true,
    });
    
    console.log('Connected to database.\n');
    
    // Read and execute SQL file
    const sqlFile = path.join(__dirname, '002-add-missing-tables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    console.log('Executing migration script...\n');
    await connection.query(sql);
    
    console.log('Migration completed successfully!\n');
    
    // Show tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Current tables in database:');
    tables.forEach((table) => {
      const tableName = Object.values(table)[0];
      console.log('  -', tableName);
    });
    
    await connection.end();
    
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
