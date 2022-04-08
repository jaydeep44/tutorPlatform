var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = mongoose.Schema(
  {
    Title: { type: String, required: [true, "please enter Title"] },
    Description: { type: String, required: [true, "please enter Description"] },
    Image: { type: String },
    duration: { type: String, required: [true, "please enter Duration"] },
    cost: { type: Number, required: [true, "please enter cost"] },
    author: { type: String, required: [true, "please enter author"] },
    cat_id: {
      type: Schema.Types.ObjectId,
      ref: "Categorys",
      required: true,
    },
    student_Enroll: {
      type: Array,
      default: [],
    },

    created_at: { type: Date, default: Date.now },
  },
  {
    strict: false,
  }
);

var Courses = mongoose.model("Courses", Course);
module.exports = Courses;
