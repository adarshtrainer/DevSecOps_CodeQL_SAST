import express from "express";
import { getUserPurchases, verifyPurchase } from "../controllers/purchase.controller.js";

const router = express.Router();

router.post("/verify", verifyPurchase);

// New route to fetch all purchased projects
router.post("/all", getUserPurchases);

export default router;
