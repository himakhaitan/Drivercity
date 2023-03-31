// ? Establishes a connection to the database
const { Client } = require("pg");

const clientConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const establishDBConnection = () => {
  const client = new Client(clientConfig);
  client.connect(function (err) {
    if (err) {
      console.log("Error connecting to database!");
      throw err;
    }
    console.log(`Connected to Database\nHost: ${clientConfig.host}`);
  });
};

module.exports = establishDBConnection;
