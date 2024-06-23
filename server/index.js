const connectDB = require("./db/index.js");
const app = require("./app");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server listening on port " + process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection failed !! ", err);
  });

//MongoDB Connection
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routes
const forgotPasswordRouter = require("./routes/forgotPassword");
app.use("/forgot-password", forgotPasswordRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
