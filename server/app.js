const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.ORIGIN,
  process.env.FRONTEND_URL,
  "https://exam-time.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
].filter(Boolean); // Remove any undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server requests)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (origin.includes("vercel.app")) {
      // Allow all Vercel preview deployments
      callback(null, true);
    } else if (process.env.NODE_ENV !== "production") {
      // In development, allow all origins for easier testing
      callback(null, true);
    } else {
      // In production, log and allow for now (can be changed to reject later)
      console.warn(`CORS: Allowing origin ${origin} (not in allowed list)`);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["Authorization"],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Health check endpoint (before DB check)
app.get("/health", (req, res) => {
  const { isDBConnected } = require("./db/index.js");
  res.status(isDBConnected() ? 200 : 503).json({
    status: isDBConnected() ? "healthy" : "unhealthy",
    database: isDBConnected() ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

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
  res.send("Yupp The server is runnng 🎉 !");
});

module.exports = app;
