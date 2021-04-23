"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router2 = void 0;
var controller2_1 = require("./../controllers/controller2");
var express_1 = require("express");
var router2 = express_1.Router();
exports.router2 = router2;
router2.post("/", controller2_1.generateSalesReport);
