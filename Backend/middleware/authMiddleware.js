const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    console.log("Received Token:", token);

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded:", decoded);

      req.user = decoded.id;

      next();
    } catch (error) {
      console.log("JWT Error:", error.message);

      res.status(401);
      throw new Error("Unauthorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token");
  }
};

module.exports = { protect };