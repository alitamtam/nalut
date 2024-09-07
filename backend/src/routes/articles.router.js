import express from "express";
import articleController from "../controllers/articleController.js";

const router = express.Router();

// Route to fetch and render all articles
router.get("/articles", articleController.findAllArticles);

// Route to find and render an article by ID
router.get("/articles/:id", articleController.findArticleById);

export default router;
