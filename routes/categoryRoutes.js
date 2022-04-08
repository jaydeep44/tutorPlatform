const express = require("express");
const {
  Category_create,
  Get_Category,
  Course_create,
  Get_Course,
  upload,
  Get_All_Course,
  DeleteCourse,
  UpdateCourse,
  DeleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/create_category_new").post(Category_create);
router.route("/All_category").get(Get_Category);
router.route("/create_course").post(upload.single("Image"), Course_create);
router.route("/get_course_by_category/:id").get(Get_Course);
router.route("/get_course").get(Get_All_Course);
router.route("/Delete_course/:id").delete(DeleteCourse);
router.route("/Update_course/:id").put(upload.single("Image"), UpdateCourse);
router.route("/Delete_cat/:id").delete(DeleteCategory);

module.exports = router;
