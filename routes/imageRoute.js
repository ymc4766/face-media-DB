import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { ScanFineImage } from "../controllers/ImageController.js";

const router = express.Router();

router.route("/create").post(protect, ScanFineImage);

// router.route("/").post(register).get(allUsers);

export default router;
