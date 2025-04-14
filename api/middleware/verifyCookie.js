const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const verifyCookie = async (req, res, next) => {
  const token = req.cookies.access_token;
  const JWT_TOKEN= process.env.JWT_SECRET;
  if (!JWT_TOKEN) {
    res.status(500).json({ message: "Internal Server Error." });
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized." });
  }
  jwt.verify(token, , (err, user) => {
    if (err) {
      next(err);
    }
    console.log(user);
    next();
  });
};
module.exports = verifyCookie;
