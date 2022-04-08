const Cart = require("../models/CartModel");
const Courses = require("../models/CourseModel");
const User = require("../models/UserModel");

exports.Cart_create = async (req, res) => {
  var item = [];
  var userid = [];
  // await Courses.updateOne({ $push: { student_Enroll: req.body.user_id } });
  var candidates = req.body.user_id;
  var course = req.body.course_id;

  await Courses.findById(req.body.course_id).then((data) => {
    const id = data.student_Enroll.includes(req.body.user_id);
    item.push(id);
  });
  if (item[0] == false) {
    await Courses.findByIdAndUpdate(req.body.course_id, {
      $push: {
        student_Enroll: candidates,
      },
    });

    await User.findByIdAndUpdate(req.body.user_id, {
      $push: {
        courses: course,
      },
    });
    const cartsave = new Cart({
      course_id: req.body.course_id,
      user_id: req.body.user_id,
    });

    await cartsave
      .save()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "you already Enrolled the course " });
  }
};

exports.Get_user_course = async (req, res) => {
  var user_id = req.body.user_id;

  const data = await Courses.find({ student_Enroll: user_id })
    .populate([{ path: "cat_id" }])

    .select(["-student_Enroll"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
