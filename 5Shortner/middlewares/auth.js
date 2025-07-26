const { getUser } = require("../service/auth");

// Middleware to check and attach user to the request
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie)   return next(); // No token provided, move to next middleware
  
  const token = tokenCookie; // Use the token from the cookie
  const user = getUser(token); // Assuming getUser returns null if token invalid
  console.log("Decoded JWT user:", user); // 👈 log this

  req.user = user;
  return   next();
}

// Middleware factory: returns a middleware function that checks roles
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user)   return res.redirect("/login");
    console.log("User role:", req.user.role); // 👈 log this
    if (!roles.includes(req.user.role))       return res.end("Unauthorized");

    return next(); // All good
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
