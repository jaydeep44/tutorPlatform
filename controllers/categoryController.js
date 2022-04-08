const Cat = require("../models/CategoryModel");
const Courses = require("../models/CourseModel");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
exports.upload = multer({ storage: storage });

exports.Category_create = async (req, res) => {
  var body = req.body;
  if (Object.keys(body).length === 0 && body.constructor === Object) {
    res.status(400).send({ message: "data not proper formated..." });
  }
  // console.log("body = ", body)
  const course_save = new Cat(body);
  await course_save
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
exports.Get_Category = async (req, res) => {
  const data = await Cat.find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.Course_create = async (req, res) => {
  //   if (Object.keys(body).length === 0 && body.constructor === Object) {
  //     res.status(400).send({ message: "data not proper formated..." });
  //   }
  // console.log("body = ", body)
  console.log(req.file);
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }
  const catsave = new Courses({
    _id: mongoose.Types.ObjectId(),
    Title: req.body.Title,
    Description: req.body.Description,
    Image: imagePath,
    duration: req.body.duration,
    cost: req.body.cost,
    author: req.body.author,
    cat_id: req.body.cat_id,
  });
  await catsave
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
exports.Get_Course = async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  await Courses.find({ cat_id: id })

    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
exports.Get_All_Course = async (req, res) => {
  await Courses.find()
    .populate([{ path: "cat_id" }])
    .sort({ created_at: -1 })

    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.DeleteCourse = async (req, res) => {
  let course = await Courses.findById(req.params.id);
  console.log(course, "course");
  if (!course) {
    return res.status(500).json({
      success: false,
      message: "Course was not found",
    });
  }
  try {
    await course.remove();
    res.status(201).json({
      success: true,
      message: "course deleted",
    });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

exports.UpdateCourse = (req, res) => {
  var Image = req.file.path;

  console.log(req.body, "image");
  Courses.findOneAndUpdate(
    { _id: req.params.id },
    {
      Title: req.body.Title,
      Description: req.body.Description,
      Image: Image,
      duration: req.body.duration,
      cost: req.body.cost,
      author: req.body.author,
      cat_id: req.body.cat_id,
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_user: "Course Updated successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

exports.DeleteCategory = async (req, res) => {
  let course = await Cat.findById(req.params.id);
  if (!course) {
    return res.status(500).json({
      success: false,
      message: "Category was not found",
    });
  }
  try {
    let data = await Courses.find({ cat_id: req.params.id });
    if (!data.length == 0) {
      res.status(200).json({
        message: "You_have_Courses_First_you_have_to_delete_course",
      });
    } else {
      await course.remove();
      res.status(201).json({
        success: true,
        message: "Category deleted",
      });
    }
    // await remove();
    // res.status(201).json({
    //   success: true,
    //   message: "course deleted",
    // });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};
