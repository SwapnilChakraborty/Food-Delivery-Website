import express from "express";
import { addProducts, getFoodItems, getFoodById, searchFoodItems } from "../controllers/Food.js";

const router = express.Router();

// Define routes in proper order: more specific routes first
router.post("/", addProducts);
router.get("/search", searchFoodItems); // <-- This should be before any dynamic route
router.get("/", getFoodItems);
router.get("/:id", getFoodById);

export default router;
