const path = require("path");
const fs = require('fs');

// Debug: Check if .env file exists
const envPath = path.resolve(__dirname, '.env');
console.log(`Looking for .env file at: ${envPath}`);
console.log(`File exists: ${fs.existsSync(envPath)}`);

require("dotenv").config({ path: envPath });

// Debug: Print all environment variables we're expecting
console.log('Environment variables:');
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`DB_DATABASE: ${process.env.DB_DATABASE}`);

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// For local development, provide fallback values if env vars are missing
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbDatabase = process.env.DB_DATABASE || 'career_path_compass';

// Construct the connection string from individual environment variables
const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;

// Debug: Log the connection string being used
console.log(`Using connection string: ${isProduction ? 'DATABASE_URL' : connectionString}`);
if (isProduction) {
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
}

const pool = new Pool({
    // Use DATABASE_URL directly if in production and it's set, otherwise use the constructed string
    connectionString: (isProduction && process.env.DATABASE_URL) ? process.env.DATABASE_URL : connectionString,
    // Enable SSL for production environments, common requirement for cloud databases
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// Optional: Add a connection test or error handling
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client from pool', err.stack);
  }
  client.query(`SELECT NOW()`, (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Successfully connected to PostgreSQL database!');
    // console.log('Current time from DB:', result.rows[0].now);
  });
});

module.exports = { pool }; 