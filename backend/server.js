// ? Server Config

// * Import Statements
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const client = require("./Middlewares/db");

// * Creating Express App
const app = express();

// * Middlewares
app.use(express.json());

// * PARSE application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// * PARSE application/json
app.use(bodyParser.json());

// ! Routes

app.use("/api/auth", require("./api/auth"));

// Basic Route
app.get("/", (req, res) => {
  // Sending Response
  return res.send({
    server: "Drivercity",
    status: "Online",
    version: "1.0.0",
    host: req.headers.host,
  });
});

// * Defining Server Port
const PORT = process.env.PORT || 8000;

// * Establishing Database Connection
client.connect((err) => {
  if (err) {
    console.error('Database Connection error', err.stack)
  } else {
    console.log('Database Connected')
  }
});

// * Creating Server
const server = http.createServer(app);

// * Listening to Server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// * Exporting Server
module.exports = server;
