const userModel = require("../Models/userModel");
const { getIO } = require("../socket");

const sendMessage = async (req, res, next) => {
  try {
    const io = getIO();
    const { sender, reciever, message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Type something." });
    }
    const updatedMessageSender = await userModel.findOneAndUpdate(
      { username: sender, "chats.user": reciever },
      { $push: { "chats.$.messages": req.body } },
      { new: true }
    );
    const updatedMessageReciever = await userModel.findOneAndUpdate(
      { username: reciever, "chats.user": sender },
      { $push: { "chats.$.messages": req.body } },
      { new: true }
    );
    const rooms = io.sockets.adapter.rooms;
    const roomExists = rooms.has(reciever);

    if (roomExists) {
      io.to(reciever).emit("receive_message", req.body);
      console.log(roomExists);
    } else {
      console.log("no room exists");
    }
    return res.status(200).json(updatedMessageSender);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { username, currentUser } = req.params;
    const user = await userModel.findOne({ username: currentUser });
    const chat = user.chats.find((chat) => chat.user === username);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "No chat found." });
    }
    const messages = chat.messages;
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
module.exports = { sendMessage, getMessages };
