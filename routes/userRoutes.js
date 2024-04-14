import express from "express";
import {
  allUsers,
  authUser,
  register,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(authUser);
router.route("/").get(allUsers);

// router.route("/").post(register).get(allUsers);

export default router;
