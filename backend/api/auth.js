// ? All routes related to Authentication

// * Import Statements
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// * Creating Router
const router = express.Router();

// * Importing Middleware
const auth = require("../Middlewares/auth");

// * Importing Client
const client = require("../Middlewares/db");

/* 
? Method: POST
? Route: api/auth/register
? Description: Create a new USER
? Access: Public
*/
router.post("/register", (req, res) => {
  let { first_name, last_name, email, password } = req.body;

  // * Encrypting Password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // * Inserting User
  client.query(
    "INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [first_name, last_name, email, hash, "USER"],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        res.status(200).json({
          message: "User Created",
          success: true,
          result: result.rows[0],
        });
      }
    }
  );
});

/* 
? Method: POST
? Route: api/auth/login
? Description: Login a USER
? Access: Public
*/

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  // * Checking if User Exists
  client.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      } else {
        if (result.rows.length === 0) {
          return res
            .status(404)
            .json({ message: "User Not Found", success: false });
        } else {
          // * Comparing Passwords
          if (bcrypt.compareSync(password, result.rows[0].password)) {
            // * Creating JWT
            const token = jwt.sign(
              { userId: result.rows[0].user_id, role: result.rows[0].role },
              process.env.JWT_SECRET,
              { expiresIn: "6h" }
            );

            return res.status(200).json({
              message: "Login Successful",
              success: true,
              token: `Bearer ${token}`,
              name: result.rows[0].first_name + " " + result.rows[0].last_name,
            });
          } else {
            return res
              .status(401)
              .json({ message: "Incorrect Password", success: false });
          }
        }
      }
    }
  );
});

module.exports = router;
