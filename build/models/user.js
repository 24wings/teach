"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var playerSchema = new mongoose.Schema({
    name: String
});
var playerModel = mongoose.model('Player', playerSchema);
exports.playerModel = playerModel;
