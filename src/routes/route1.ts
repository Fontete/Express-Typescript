import { func1 } from "../controllers/controller1";
import { Router } from "express";

const router1 = Router();

router1.get("/", func1);
export { router1 };
