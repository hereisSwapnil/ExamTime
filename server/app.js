// app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session"); // Add this line
require("./passport/passport-setup.js"); // Import passport configuration

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Use express-session middleware
app.use(
  session({
    secret: process.env.SECRET, // Add a secret key in your .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" } // Use secure cookies in production
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// routes import
const userRoutes = require("./routes/user.routes.js");
const noteRoutes = require("./routes/note.routes.js");
const subjectRoutes = require("./routes/subject.routes.js");
const requestRoutes = require("./routes/request.routes.js");
const questionRoutes = require("./routes/question.routes.js");

// routes declare
app.use("/user", userRoutes);
app.use("/note", noteRoutes);
app.use("/subject", subjectRoutes);
app.use("/request", requestRoutes);
app.use("/question", questionRoutes);

app.get("/", (req, res) => {
  res.send("Yupp The server is running 🎉 !");
});

module.exports = app;
