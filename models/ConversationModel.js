var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = mongoose.Schema(
  {
    senderId: { type: Schema.Types.ObjectId },
    receiverId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

var conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = conversation;
