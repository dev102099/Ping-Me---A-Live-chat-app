const mongoose = require("mongoose");

const ChatScheme = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chat", ChatScheme);

module.exports = chatModel;
