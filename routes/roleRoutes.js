const express = require("express");
const { Roles } = require("../controllers/roleController");
const router = express.Router();

router.route("/createRole").post(Roles);

module.exports = router;
