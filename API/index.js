require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 3000;

require("./services/mongo");

// app.use()
app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

require("./services/passport")(app);

app.use("/user", require("controllers/user"));

app.get("/", (req, res) => {
  res.send("API - Last Deploy: " + new Date().toISOString());
});