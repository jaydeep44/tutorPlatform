const Conversation = require("../models/ConversationModel");

exports.New_Conversation = async (req, res) => {
  const newConversation = new Conversation({
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
  });
  try {
    const saveConversation = await newConversation.save();
    res.status(200).json(saveConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.Get_Conversation = async (req, res) => {
  console.log(req.params.userId);
  const conversation = await Conversation.find({
    members: { $in: req.params.userId },
  });
  try {
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
