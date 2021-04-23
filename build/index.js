"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var route1_1 = require("./routes/route1");
var route2_1 = require("./routes/route2");
var app = express_1.default();
// db
var DATABASE = "Your connections string";
// mongoose
//   .connect(DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB CONNECTED"))
//   .catch((err: any) => console.log("DB CONNECTION ERR", err));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    // origin: "allowing domain",
    maxAge: 600,
    credentials: true,
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
    ],
    methods: "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
}));
app.use("/api/router1", route1_1.router1);
app.use("/api/router2", route2_1.router2);
app.listen(3000, function () {
    console.log("Running on port 3000");
});
