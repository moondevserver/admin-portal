const { initializeDatabase } = require('../db/schema');

console.log('Initializing database...');

initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }); 