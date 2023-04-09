// ? All routes realted to Journey

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
? Route: api/journey/create
? Description: Create a New Journey
? Access: Admin
*/

router.post("/create", auth("ADMIN"), (req, res) => {
  let { journey_time, mode_id, start_location, end_location } = req.body;
  // * Calculating Distance
  let journey_distance = 0;

  client.query(
    "SELECT * FROM locations WHERE location_id = $1",
    [start_location],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        let start_lat = result.rows[0].latitude;
        let start_long = result.rows[0].longitude;

        client.query(
          "SELECT * FROM locations WHERE location_id = $1",
          [end_location],
          (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ message: "Internal Server Error", success: false });
            } else {
              let end_lat = result.rows[0].latitude;
              let end_long = result.rows[0].longitude;

              journey_distance = Math.sqrt(
                Math.pow(start_lat - end_lat, 2) +
                  Math.pow(start_long - end_long, 2)
              );
            }
          }
        );
      }
    }
  );

  let fare = 0;
  // * Calculating Fare
  client.query(
    "SELECT * FROM modes WHERE mode_id = $1",
    [mode_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        fare =
          result.rows[0].base_fare +
          result.rows[0].fare_per_km * journey_distance;
      }
    }
  );

  client.query(
    "INSERT INTO journeys (journey_time, mode_id, start_location, end_location) VALUES ($1, $2, $3, $4) RETURNING *",
    [journey_time, mode_id, start_location, end_location],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        return res.status(200).json({
          message: "Journey Created",
          success: true,
          result: result.rows[0],
        });
      }
    }
  );
});

// * Exporting Router

module.exports = router;
