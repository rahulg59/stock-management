import express from "express";
import * as vendorController from "../controllers/vendor.controller";

const router = express.Router();

router.post("/:vendorId/update", vendorController.updateSingle);
router.post("/:vendorId/update-batch", vendorController.batchUpdate);

export default router;