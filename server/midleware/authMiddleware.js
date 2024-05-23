// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// validates the user token is available and valid, otherwise it rejects the request
//extracts token from auth header
//verify using jwt.verify, if valid?
//attach the decode token to request object and calls next to pass it to the route handler
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
