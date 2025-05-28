import express from "express";
import * as orderController from "../controllers/order.controller";

const router = express.Router();

router.post("/can-fulfill", orderController.checkFulfillment);
router.post("/lowest-cost", orderController.getLowestCost);

export default router;