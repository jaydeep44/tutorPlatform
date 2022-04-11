var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

var message = mongoose.model("Message", MessageSchema);
module.exports = message;
