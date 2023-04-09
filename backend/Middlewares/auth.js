const jwt = require("jsonwebtoken");

// * Importing Client
const client = require("./db");

const authMiddleware = (role) => {
  return async (req, res, next) => {
    try {
      // * Get token from header
      const token = req.headers.authorization.split(" ")[1];

      // * Verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // * Fetching User

      client
        .query("SELECT * FROM users WHERE user_id = $1", [decodedToken.userId], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", success: false });
          } else {
            if (result.rows.length === 0) {
              res.status(404).json({ message: "User Not Found", success: false });
            } else {
              // * Checking if user has the role
              if (result.rows[0].role === role) {
                req.userData = {
                  user_id: result.rows[0].user_id,
                  email: result.rows[0].email,
                  role: result.rows[0].role,
                }
                next();
              } else {
                res.status(401).json({ message: "Auth failed!", success: false });
              }
            }
          }
        })

    } catch (err) {
      console.log(err);
      // * If token is invalid
      res.status(401).json({ message: "Auth failed!", success: false });
    }
  };
};

module.exports = authMiddleware;
