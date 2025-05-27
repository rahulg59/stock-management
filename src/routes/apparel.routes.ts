import express from "express";
import * as apparelController from "../controllers/apparel.controller";
import "./swagger.doc"

const router = express.Router();

router.post("/update", apparelController.updateSingle);
router.post("/batch-update", apparelController.batchUpdate);
router.post("/can-fulfill", apparelController.checkFulfillment);
router.post("/lowest-cost", apparelController.getCost);

export default router;