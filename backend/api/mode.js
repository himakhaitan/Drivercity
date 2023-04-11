// ? All routes realted to Modes

// * Import Statements
const express = require("express");

// * Creating Router
const router = express.Router();

// * Importing Middlewares
const auth = require("../Middlewares/auth");

// * Importing Client
const client = require("../Middlewares/db");

/*
? Method: POST
? Route: api/mode/create
? Description: Create a New Mode
? Access: Admin
*/

router.post("/create", (req, res) => {
  let { title, base_fare, fare_per_km } = req.body;

  client.query(
    "INSERT INTO modes (title, base_fare, fare_per_km) VALUES ($1, $2, $3) RETURNING *",
    [title, base_fare, fare_per_km],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        res.status(200).json({
          message: "Mode Created",
          success: true,
          result: result.rows[0],
        });
      }
    }
  );
});

/*
? Method: GET
? Route: api/mode/fetch
? Description: Fetch All Modes
? Access: Everyone
*/

router.get("/fetch", (req, res) => {
  client.query("SELECT * FROM modes", (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    } else {
      res.status(200).json({
        message: "Modes Fetched",
        success: true,
        result: result.rows,
      });
    }
  });
});

// * Exporting Router

module.exports = router;
