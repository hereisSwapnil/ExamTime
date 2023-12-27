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
