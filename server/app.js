const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const User = require("./models/user.model.js");

const app = express();

app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
      expires: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

// routes import
const userRoutes = require("./routes/user.routes.js");
const noteRoutes = require("./routes/note.routes.js");
const collegeRoutes = require("./routes/college.routes.js");
const subjectRoutes = require("./routes/subject.routes.js");

// routes declare
app.use("/user", userRoutes);
app.use("", noteRoutes);
app.use("/college", collegeRoutes);
app.use("/subject", subjectRoutes);

module.exports = app;
