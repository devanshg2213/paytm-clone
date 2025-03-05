import express from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../controller/userController.js";
import { loginUser } from "../controller/userController.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/updateUser", authMiddleware, updateUser);
router.get("/bulk", getUser);

export default router;
