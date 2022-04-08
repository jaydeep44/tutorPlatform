const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var User = mongoose.Schema({
  roleId: { type: Schema.Types.ObjectId, ref: "Roles", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, maxLength: 9 },
  password: { type: String, required: true },
  courses: {
    type: Array,
    default: [],
    ref: "Courses",
  },
});

var user = mongoose.model("UserDetails", User);
module.exports = user;
