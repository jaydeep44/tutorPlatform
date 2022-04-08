var mongoose = require("mongoose");

const Category = mongoose.Schema({
  name: { type: String, required: [true, "please enter name"] },
});

var Cat = mongoose.models.Category || mongoose.model("Categorys", Category);
module.exports = Cat;
