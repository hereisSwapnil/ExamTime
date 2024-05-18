const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return res.status(401).send("You are not authenticated");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      res.status(403).send("Token is not valid");
    }
    // if()
    console.log(data);
    req.user = data;
    next();
  });
};

module.exports = verifyToken;
