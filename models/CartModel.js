var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carts = mongoose.Schema({
  course_id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});

var cart = mongoose.model("Cart", carts);
module.exports = cart;
