"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true }
});
var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;
