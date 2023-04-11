// ? All routes realted to Booking

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
? Route: api/booking/create
? Description: Create a New Booking
? Access: USER
*/

router.post("/create", (req, res) => {
  let { journey_id } = req.body;

  // * Checking if Journey Exists
  client.query(
    "SELECT * FROM journeys WHERE journey_id = $1",
    [journey_id],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Server Error",
        });
      } else {
        if (result.rows.length === 0) {
          return res.status(404).send({
            success: false,
            message: "Journey Not Found",
          });
        } else {
          // * Creating Booking
          client.query(
            "INSERT INTO bookings (journey_id, user_id) VALUES ($1, $2) RETURNING *",
            [journey_id, req.userData.user_id],
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: "Server Error",
                });
              } else {
                return res.send({
                  success: true,
                  message: "Booking Created",
                  data: result.rows[0],
                });
              }
            }
          );
        }
      }
    }
  );
});

/*
? Method: POST
? Route: api/booking/fetch
? Description: Fetch Bookings
? Access: USER
*/

router.get("/fetch", auth("USER"), (req, res) => {
  let { user_id } = req.userData;

  client.query(
    "SELECT *, l1.title as starttitle, l2.title as endtitle FROM bookings b, journeys j, locations l1, locations l2 WHERE user_id = $1 and b.journey_id = j.journey_id and l1.location_id = start_location and l2.location_id = end_location;",
    [user_id],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Server Error",
        });
      } else {
        return res.send({
          success: true,
          message: "Bookings Fetched",
          data: result.rows,
        });
      }
    }
  );
});

// * Exporting Router

module.exports = router;
