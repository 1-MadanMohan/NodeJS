const User = require("../models/user");
const { setUser } = require("../service/auth"); // setUser returns JWT

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    await User.create({ name, email, password });
    return res.redirect("/login"); // after signup, redirect to login
  } catch (err) {
    console.error("Signup error:", err);
    return res.render("signup", { error: "User already exists or invalid input" });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password }); // In production, use hashed password check

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  const token = setUser({ _id: user._id, email: user.email });

  res.cookie("uid", token, {
    httpOnly: true,     // prevent JS access (XSS protection)
    secure: false,      // true if using HTTPS
  });

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};








// const { v4: uuidv4 } = require("uuid");
// const User = require("../models/user");
// const { setUser } = require("../service/auth");

// async function handleUserSignup(req, res) {
//   const { name, email, password } = req.body;
//   await User.create({
//     name,
//     email,
//     password,
//   });
//   return res.redirect("/");
// }

// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });

//   if (!user)
//     return res.render("login", {
//       error: "Invalid Username or Password",
//     });

//   const sessionId = uuidv4();
//   setUser(sessionId, user);
//   res.cookie("uid", sessionId);
//   return res.redirect("/");
// }

// module.exports = {
//   handleUserSignup,
//   handleUserLogin,
// };
