// ? Server Config

// * Import Statements
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const client = require("./Middlewares/db");
const cors = require("cors");

// * Creating Express App
const app = express();

// * Middlewares
app.use(express.json());
app.use(cors());

// * PARSE application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// * PARSE application/json
app.use(bodyParser.json());

// ! Routes

app.use("/api/auth", require("./api/auth"));
app.use("/api/mode", require("./api/mode"));
app.use("/api/location", require("./api/location"));
app.use("/api/journey", require("./api/journey"));
app.use("/api/booking", require("./api/booking"));

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
    console.error("Database Connection error", err.stack);
  } else {
    console.log("Database Connected");
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
