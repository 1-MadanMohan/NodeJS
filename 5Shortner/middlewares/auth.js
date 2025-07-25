const { getUser } = require("../service/auth");

// Middleware to check and attach user to the request
function checkForAuthentication(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  req.user = null;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next(); // No token provided, move to next middleware
  }

  const token = authorizationHeader.split("Bearer ")[1];
  const user = getUser(token); // Assuming getUser returns null if token invalid
  req.user = user;

  next();
}

// Middleware factory: returns a middleware function that checks roles
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login"); // Use redirect, not 'direct'
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).end("Unauthorized");
    }

    next(); // All good
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
