import express from "express";
import { createCase, getAllCases } from "../controllers/caseControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(createCase);
router.route("/").get(getAllCases);

// router.route("/").post(register).get(allUsers);

export default router;
