var mongoose = require("mongoose");

const role = mongoose.Schema({
  userName: { type: String },
  roleType: { type: String },
  isActive: { type: Boolean },
});

var Role = mongoose.model("Roles", role);
module.exports = Role;
