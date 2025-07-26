  const User = require("../models/user");
  const { setUser } = require("../service/auth"); // setUser returns JWT
  async function handleUserSignup(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "User already exists" });
    }

    await User.create({ name, email, password, role }); // No hashing
    return res.redirect("/login"); // Redirect after successful signup
  } catch (err) {
    console.error("Signup error:", err);
    return res.render("signup", { error: "Signup failed" });
  }
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  // Match both email and password directly
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // const token = setUser(user); // Includes _id, email, role
const token = setUser({ _id: user._id, email: user.email, role: user.role });    

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

