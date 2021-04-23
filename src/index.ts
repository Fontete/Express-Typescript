import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import { router1 } from "./routes/route1";
import { router2 } from "./routes/route2";

const app = express();

// db
const DATABASE: string =
  "Your connections string";

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err: any) => console.log("DB CONNECTION ERR", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
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
  })
);
app.use("/api/router1", router1);
app.use("/api/router2", router2);

app.listen(3000, () => {
  console.log("Running on port 3000");
});
