const express = require("express");
const {
  Cart_create,
  Get_user_course,
} = require("../controllers/cartController");
const router = express.Router();

router.route("/cart").post(Cart_create);
router.route("/student_Enroll").post(Get_user_course);

module.exports = router;
