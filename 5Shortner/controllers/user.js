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

    return res.json({token});
  }

  module.exports = {
    handleUserSignup,
    handleUserLogin,
  };


