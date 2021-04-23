import { generateSalesReport     } from "./../controllers/controller2";
import { Router } from "express";

const router2 = Router();

router2.post("/", generateSalesReport);
export { router2 };
