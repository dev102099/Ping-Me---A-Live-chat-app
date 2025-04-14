const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    chats: [
      {
        user: { type: String, required: true },
        messages: [
          {
            sender: { type: String },
            reciever: { type: String },
            message: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userScheme);

module.exports = userModel;
