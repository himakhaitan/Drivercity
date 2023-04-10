// ? All routes realted to Location

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
? Route: api/location/create
? Description: Create a New Location
? Access: Admin
*/

router.post("/create",  (req, res) => {
  let { title, x_coordinate, y_coordinate } = req.body;

  client.query(
    "INSERT INTO locations (title, x_coordinate, y_coordinate) VALUES ($1, $2, $3) RETURNING *",
    [title, x_coordinate, y_coordinate],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        res.status(200).json({
          message: "Location Created",
          success: true,
          result: result.rows[0],
        });
      }
    }
  );
});

// * Exporting Router

module.exports = router;
