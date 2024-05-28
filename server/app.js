const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

// routes import
const userRoutes = require("./routes/user.routes.js");
const noteRoutes = require("./routes/note.routes.js");
const subjectRoutes = require("./routes/subject.routes.js");
const requestRoutes = require("./routes/request.routes.js");
const questionRoutes=require("./routes/question.routes.js")

// routes declare
app.use("/user", userRoutes);
app.use("/note", noteRoutes);
app.use("/subject", subjectRoutes);
app.use("/request", requestRoutes);
app.use("/question",questionRoutes)

app.get("/", (req, res) => {
  res.send("Yupp The server is runnng 🎉 !");
});

module.exports = app;
