import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { fetchBalance, transfer } from "../controller/accountController.js";

const router = express.Router();

router.get("/balance", authMiddleware, fetchBalance);
router.post("/transfer", authMiddleware, transfer);

export default router;
