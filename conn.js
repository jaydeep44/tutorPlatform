const mongooes = require("mongoose");

const DatabaseConn = () => {
  mongooes
    .connect("mongodb://94.237.3.78:27017/Course", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => console.log("connected"))
    .catch((err) => console.log("err", err));
};
module.exports = DatabaseConn;
