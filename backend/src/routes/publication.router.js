import express from "express";
import publicationController from "../controllers/publicationController.js";

const router = express.Router();

// Route to fetch a list of publications/topics
router.get("/topics", publicationController.findAllTopics);

// Route to fetch a specific publication/topic by ID
router.get("/topics/:id", publicationController.findTopicById);

export default router;
