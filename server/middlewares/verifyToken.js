const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("You are not authenticated");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      res.status(403).send("Token is not valid");
    }
    // console.log(data);
    req.user = data;
    next();
  });
};

module.exports = verifyToken;
