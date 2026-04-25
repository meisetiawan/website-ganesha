import mysql from 'mysql2/promise';

async function testConnection() {
  console.log('Testing database connection...');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***');
  
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
    });
    
    console.log('\n✅ Database connection successful!');
    
    // Test query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Test query successful:', rows);
    
    // Check if tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 Existing tables:');
    if (tables.length === 0) {
      console.log('   No tables found - you need to run the SQL migration script');
    } else {
      tables.forEach((table) => {
        const tableName = Object.values(table)[0];
        console.log('   -', tableName);
      });
    }
    
    await connection.end();
    console.log('\n✅ Connection closed successfully');
    
  } catch (error) {
    console.error('\n❌ Database connection failed:');
    console.error('   Error code:', error.code);
    console.error('   Error message:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Tip: Check if DB_HOST is correct');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Tip: Check if the database server is running and accessible');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Tip: Check DB_USER and DB_PASSWORD');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Tip: Database does not exist - check DB_NAME');
    }
  }
}

testConnection();
