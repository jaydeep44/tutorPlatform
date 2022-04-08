const app = require("./app");

const DatabaseConn = require("./conn");

DatabaseConn();

const port = process.env.PORT || "5000";

app.listen(port, () => {
  console.log("its running " + port);
});
