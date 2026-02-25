const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const secretKey = "secret";


app.post("/login", (req, res) => {
  const { username, password } = req.body;


  if (username === "admin" && password === "123") {
    const token = jwt.sign({ username }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.username = payload.username;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token not valid" });
  }
}


app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You have access", user: req.username });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});