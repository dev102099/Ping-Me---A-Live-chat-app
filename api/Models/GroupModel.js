const mongoose = require("mongoose");

const groupScheme = new mongoose.Schema({
    users:[{username:,id:}]
    ,messages:
},{timestamps:true});

const groupModel = mongoose.model("group", groupScheme);

module.exports = groupModel;
