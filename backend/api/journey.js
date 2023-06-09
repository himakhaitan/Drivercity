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
  let { to, from, mode } = req.query;

  if (mode == "ANY" || mode == undefined || mode == "any") {
    let QUERY_STRING =
      "SELECT * FROM (SELECT *, m.title as means FROM Modes m, (SELECT *, l1.title as starttitle, l2.title as endtitle FROM JOURNEYS j, LOCATIONS l1, LOCATIONS l2 WHERE j.start_location = l1.location_id and j.end_location = l2.location_id) a WHERE m.mode_id = a.mode_id) a WHERE starttitle = $1 and endtitle = $2";

    client.query(QUERY_STRING, [from, to], (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      }
      return res.status(200).json({
        message: "Journeys Fetched",
        success: true,
        result: result.rows,
      });
    });
  } else {
    let QUERY_STRING =
      "SELECT * FROM (SELECT *, m.title as means FROM Modes m, (SELECT *, l1.title as starttitle, l2.title as endtitle FROM JOURNEYS j, LOCATIONS l1, LOCATIONS l2 WHERE j.start_location = l1.location_id and j.end_location = l2.location_id) a WHERE m.mode_id = a.mode_id) a WHERE starttitle = $1 and endtitle = $2 and means = $3";
    client.query(QUERY_STRING, [from, to, mode], (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        return res.status(200).json({
          message: "Journeys Fetched",
          success: true,
          result: result.rows,
        });
      }
    });
  }
});

// * Exporting Router

module.exports = router;
