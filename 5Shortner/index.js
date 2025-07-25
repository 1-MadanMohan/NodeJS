// 🌿✨ 1. Importing the Heart & Soul of the Application
const express = require("express");                // 🚂 Express: The web framework engine
const path = require("path");                      // 🗺️ Path: To resolve view directories
const cookieParser = require("cookie-parser");     // 🍪 Cookie Parser: For sweet little tokens

// 🔗 MongoDB Connection Utility
const { connectToMongoDB } = require("./connect"); // 💾 Connects to our long-term memory (DB)

// 🛡️ Authentication Middlewares
const {
  restrictToLoggedinUserOnly,   // 🔐 Protects certain routes
  checkAuth,                     // 🧐 Checks if user is logged in (used for UI personalization)
  checkForAuthentication,
  restrictTo,
} = require("./middlewares/auth");

// 📦 Data Model – where URL mappings are stored
const URL = require("./models/url");

// 🧭 Routing Modules – Entryways to features
const urlRoute = require("./routes/url");              // ✂️ Shorten and manage URLs
const staticRoute = require("./routes/staticRouter");  // 🖼️ For rendering home, dashboard, etc.
const userRoute = require("./routes/user");            // 👤 User login/signup

// 🚀 2. Initialize the Express App
const app = express();
const PORT = 8001;

// 🧠 3. Connect to MongoDB – The Brain of Our System
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url")
  .then(() => console.log("✅ 💚 MongoDB Connected Successfully"));

// 🎨 4. Set Up View Engine (EJS)
app.set("view engine", "ejs");                       // 🖌️ Tells Express to use EJS templates
app.set("views", path.resolve("./views"));           // 🗂️ Locate the 'views' folder

// 🧰 5. Global Middlewares – Preparing the Server for Incoming Requests
app.use(express.json());                             // 📥 Handles JSON data
app.use(express.urlencoded({ extended: false }));    // 📄 Handles form submissions
app.use(cookieParser());    
app.use(checkForAuthentication);                         // 🍪 Parses cookies for auth/session

// 🛣️ 6. Route Mounting – Opening the Gates to Different Worlds
app.use("/url", restrictTo(["Normal"]), urlRoute); // ✂️ Shorten URLs (Only for logged-in users)
app.use("/user", userRoute);                           // 👤 Auth routes (Login/Register)
app.use("/", staticRoute);                  // 🏠 Home/dashboard (requires user check)

// 🌀 7. Dynamic Redirection Route – The Magic Portal
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;  // 🔍 Extract shortId from URL

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),  // 🕒 Log the exact time of visit
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("⚠️ URL not found");
  }

  res.redirect(entry.redirectURL); // 🚀 Send user to their actual destination
});

// 🔊 8. Start the Server – Let the Symphony Begin
app.listen(PORT, () => console.log(`🎵 Server is live on http://localhost:${PORT}`));

