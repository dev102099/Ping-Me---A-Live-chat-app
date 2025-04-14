const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const handleLog = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      res.status(404).json({ Message: "User not Registered.", success: false });
      return;
    }
    const comPass = bcrypt.compareSync(password, user.password);
    if (!comPass) {
      res.status(401).json({ Message: "Unauthorized", success: false });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: notNeeded, ...restData } = user._doc;

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, // Only set cookies on HTTPS (Required on Render)
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ restData });
  } catch (error) {
    next(error);
  }
};

const handleSign = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res
      .status(400)
      .json({ message: "Fields cannot be empty.", success: false });
    return;
  }

  //existing user
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res
      .status(409)
      .json({ message: "User exists please sign in.", success: false });
    return;
  }

  //username exists
  const existingUsername = await userModel.findOne({ username });
  if (existingUsername) {
    res.status(400).json({ message: "Username taken.", success: false });
    return;
  }
  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const createUser = await userModel.create({
      username,
      email,
      password: hashedPass,
    });
    res.status(200).json("User Created");
  } catch (error) {
    next(error);
  }
  //Creating User
};

const fetchUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ username });
    const chats = user.chats;
    if (chats.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "You have no Chats." });
    }
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

const addNewUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not registred on our platform.",
      });
    }
    if (user._id.toString() === req.body.id) {
      return res
        .status(409)
        .json({ success: false, message: "Cannot add yourself." });
    }
    const exists = await userModel.findOne({
      _id: req.body.id,
      "chats.user": username,
    });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already added." });
    }
    const newUser = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { chats: { user: username, messages: [req.body.message] } } }
    );
    user = await userModel.updateOne(
      { username },
      {
        $push: {
          chats: { user: req.body.username, messages: [req.body.message] },
        },
      }
    );
    res.status(200).json({ message: "User added." });
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await userModel.findOne({ username });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logged out." });
  } catch (error) {
    next(error);
  }
};

const handleUpdate = async (req, res, next) => {
  try {
    const { id, password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Password and email is required. Either new or old.",
      });
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    const user = await userModel.findByIdAndUpdate(
      id,
      { password: hashedPass, email },
      { new: true }
    );
    const { password: notNeeded, ...restData } = user._doc;
    res.status(200).json(restData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLog,
  handleSign,
  fetchUser,
  addNewUser,
  getUser,
  handleLogout,
  handleUpdate,
};
