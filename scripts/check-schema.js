import mysql from 'mysql2/promise';

async function checkSchema() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '25060'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    });
    
    const tables = ['news', 'events', 'staff', 'sliders', 'settings', 'contact_messages'];
    
    for (const table of tables) {
      console.log(`\n=== Table: ${table} ===`);
      try {
        const [columns] = await connection.execute(`DESCRIBE ${table}`);
        columns.forEach(col => {
          console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''}`);
        });
      } catch (e) {
        console.log(`  Table does not exist`);
      }
    }
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSchema();
