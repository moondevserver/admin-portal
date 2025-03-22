const Datastore = require('nedb');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const databases = {
  users: new Datastore({ filename: path.join(DB_DIR, 'users.db'), autoload: true }),
  accounts: new Datastore({ filename: path.join(DB_DIR, 'accounts.db'), autoload: true }),
  sessions: new Datastore({ filename: path.join(DB_DIR, 'sessions.db'), autoload: true }),
  verificationTokens: new Datastore({ filename: path.join(DB_DIR, 'verification_tokens.db'), autoload: true })
};

// Create indexes
databases.users.ensureIndex({ fieldName: 'email', unique: true });
databases.accounts.ensureIndex({ fieldName: 'provider_account_id', unique: true });
databases.sessions.ensureIndex({ fieldName: 'session_token', unique: true });

const initializeDatabase = async () => {
  try {
    console.log('Initializing databases...');
    
    // Verify databases are working by inserting and removing a test document
    const testDoc = { _id: 'test', timestamp: new Date() };
    
    for (const [name, db] of Object.entries(databases)) {
      console.log(`Testing ${name} database...`);
      await new Promise((resolve, reject) => {
        db.insert(testDoc, (err) => {
          if (err) {
            console.error(`Error inserting test document to ${name}:`, err);
            reject(err);
            return;
          }
          
          db.remove({ _id: 'test' }, {}, (err) => {
            if (err) {
              console.error(`Error removing test document from ${name}:`, err);
              reject(err);
              return;
            }
            console.log(`${name} database initialized successfully`);
            resolve();
          });
        });
      });
    }

    console.log('All databases initialized successfully');
  } catch (error) {
    console.error('Error initializing databases:', error);
    throw error;
  }
};

const getDatabase = (name) => {
  const db = databases[name];
  if (!db) {
    throw new Error(`Database '${name}' not found`);
  }
  return db;
};

module.exports = {
  initializeDatabase,
  getDatabase,
  databases
}; 