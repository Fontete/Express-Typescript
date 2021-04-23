import { generateSalesReport     } from "./../controllers/controller2";
import { Router } from "express";

const router2 = Router();

router2.get("/", generateSalesReport);
export { router2 };
