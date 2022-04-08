const express = require("express");
const {
  New_Conversation,
  Get_Conversation,
} = require("../controllers/conversationController");
const {
  Add_new_message,
  Get_Message,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/conversation").post(New_Conversation);
router.route("/conversation/:userId").get(Get_Conversation);

//Message_Routes

router.route("/Add_message").post(Add_new_message);
router.route("/message/:conversationId").get(Get_Message);

module.exports = router;
