const express = require("express");
const router = express.Router();
const {
  handleLog,
  handleSign,
  fetchUser,
  addNewUser,
  getUser,
  handleLogout,
  handleUpdate,
} = require("../Controllers/userController");
const verifyCookie = require("../middleware/verifyCookie");
const { validate } = require("../Models/userModel");

router.post("/log-in", handleLog);
router.post("/sign-up", handleSign);
router.get("/fetch-user/:username", verifyCookie, fetchUser);
router.get("/selected-user/:username", verifyCookie, getUser);
router.post("/add-user/:username", verifyCookie, addNewUser);
router.get("/logout", verifyCookie, handleLogout);
router.post("/update-user", verifyCookie, handleUpdate);
router.get("validate", validate);

module.exports = router;
