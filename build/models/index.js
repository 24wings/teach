"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.connect('mongodb://120.77.169.182/test');
var user_1 = require("./user");
exports.playerModel = user_1.playerModel;
