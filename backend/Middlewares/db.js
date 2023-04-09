// ? Establishes a connection to the database

const { Client } = require('pg')

const clientConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const client = new Client(clientConfig);

module.exports = client;
