const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
exports.Add_new_message = async (req, res) => {
  // let sender = [];
  // let sameCourse = [];
  // await User.find({ _id: req.body.sender }).then((data) => {
  //   sender.push(data[0]);
  // });
  // const senderId = sender[0].courses;
  // console.log(sender);
  // await User.find({ courses: { $in: senderId } }).then((item) => {
  //   if (item.length) {
  //     sameCourse.push(item);
  //   } else {
  //     sameCourse = "";
  //   }
  // });
  // console.log(sameCourse);
  // if (sameCourse.length == 0) {
  //   res.status(500).json("You both are not Enrrol same course");
  // } else {
  const message = new Message(req.body);
  try {
    const saveMessage = await message.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(500).json(err);
  }
  // }
};
exports.Get_Message = async (req, res) => {
  console.log(req.params.userId);
  const message = await Message.find({
    conversationId: req.params.conversationId,
  });
  try {
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};
