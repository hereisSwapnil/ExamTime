import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import User from "./models/user.model.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

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
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import subjectRoutes from "./routes/subject.routes.js";

// routes declare
app.use("/user", userRoutes);
app.use("", noteRoutes);
app.use("/college", collegeRoutes);
app.use("/subject", subjectRoutes);

export default app;
