"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router1 = void 0;
var controller1_1 = require("../controllers/controller1");
var express_1 = require("express");
var router1 = express_1.Router();
exports.router1 = router1;
router1.get("/", controller1_1.func1);
