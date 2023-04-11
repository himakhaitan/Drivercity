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

router.post("/create", (req, res) => {
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

/*
? Method: GET
? Route: api/journey/fetch
? Description: Fetch All Journeys
? Query Params: To, From, Date, Mode
? Access: Everyone
*/

router.get("/fetch", async (req, res) => {
  let { to, from, date, mode } = req.query;
  let journeys = [];

  if (mode != "ANY") {
    // * Fetching MODE ID

    let mode_id = 0;

    client.query(
      "SELECT * FROM modes WHERE title = $1",
      [mode],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
        } else {
          mode_id = result.rows[0].mode_id;
        }
      }
    );
    
    client.query(
      "SELECT * FROM journeys WHERE mode_id = $1",
      [mode_id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
        } else {
          journeys = result.rows;
        }
      }
    );
  } else {
    client.query("SELECT * FROM journeys", (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        journeys = result.rows;
      }
    });
  }

  // * Fetch Locations

  let start_location = 0;
  let end_location = 0;

  client.query(
    "SELECT * FROM locations WHERE title = $1",
    [from],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        start_location = result.rows[0].location_id;
      }
    }
  );

  client.query(
    "SELECT * FROM locations WHERE title = $1",
    [to],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        end_location = result.rows[0].location_id;
      }
    }
  );

  let filteredJourneys = journeys.filter((journey) => {
    if (
      journey.start_location == start_location &&
      journey.end_location == end_location
    ) {
      return true;
    }
  });

  return res.status(200).json({
    message: "Journeys Fetched",
    success: true,
    result: filteredJourneys,
  });
});

// * Exporting Router

module.exports = router;
