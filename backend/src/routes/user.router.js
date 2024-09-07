import express from "express";
import adminController from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.middleware.js"; // Make sure to add this middleware if you have it

const router = express.Router();

// Dashboard route
router.get("/dashboard", authenticate, adminController.getDashboardData);

// User management routes
router.post("/register", adminController.registerUser); // Create a user
router.post("/login", adminController.logIn); // User login
router.post("/logout", authenticate, adminController.logout); // User logout

// Article management routes
router.post("/articles", authenticate, adminController.createArticle); // Create an article
router.get("/articles/:id", adminController.getArticleById); // Get an article by ID

router.put("/articles/:id", authenticate, adminController.updateArticle); // Update an article
router.delete("/articles/:id", authenticate, adminController.deleteArticle); // Delete an article

export default router;
