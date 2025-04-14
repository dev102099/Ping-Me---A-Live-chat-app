const express = require("express");
const verifyCookie = require("../middleware/verifyCookie");
const {
  sendMessage,
  getMessages,
} = require("../Controllers/messageController");
const router = express.Router();

router.post("/send-message", verifyCookie, sendMessage);
router.get("/get-messages/:username/:currentUser", verifyCookie, getMessages);
module.exports = router;
