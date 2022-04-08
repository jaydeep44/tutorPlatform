const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world from herokugit ");
});
app.use(express.json());
// const product = require("./routes/productRouter");
const user = require("./routes/UserRoutes");
const role = require("./routes/roleRoutes");
const category = require("./routes/categoryRoutes");
const cart = require("./routes/cartRoutes");
const conversation = require("./routes/conversationRoutes");

// const login = require("./routes/loginRoutes");
// const work = require("./routes/workRoutes");

// app.use("/api/", product),
app.use("/api", user),
  app.use("/api", cart),
  app.use("/api", role),
  app.use("/api", category),
  app.use("/api", conversation),
  //   app.use("/api/", login),
  //   app.use("/api/", work);

  (module.exports = app);
