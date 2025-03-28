import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    // Get all SQL files in the migrations directory
    const files = fs.readdirSync(__dirname)
      .filter(file => file.endsWith('.sql'))
      .sort(); // This ensures migrations run in alphabetical order

    // Run each migration file
    for (const file of files) {
      console.log(`Running migration: ${file}`);
      const migrationPath = path.join(__dirname, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      await pool.query(migrationSQL);
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations(); 