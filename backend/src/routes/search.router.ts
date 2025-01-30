import express from "express";
import { searchDatabase } from "../controllers/searchController.js";

const router = express.Router();

// Route to search across multiple tables
router.get("/", searchDatabase);

export default router;
