const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const verifyCookie = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(err);
    }
    console.log(user);
    next();
  });
};
module.exports = verifyCookie;
