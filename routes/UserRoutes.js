const express = require("express");
const {
  CreateUser,
  userDetail,
  UpdateUser,
  DeleteUser,
} = require("../controllers/UserControllers");
const { login } = require("../controllers/loginControllers");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.route("/createUser").post(upload.none(), CreateUser);
router.route("/login").post(login);
router.route("/user_Detail/:id?").get(userDetail);
router.route("/user_update/:id?").put(UpdateUser);
router.route("/user_Deleted/:id?").delete(DeleteUser);

module.exports = router;
