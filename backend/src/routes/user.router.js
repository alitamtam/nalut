import express from "express";
import adminController from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.middleware.js"; // Make sure to add this middleware if you have it

const router = express.Router();

// all routes start with api/users
// Dashboard route
router.get("/dashboard", authenticate, adminController.getDashboardData);

// User management routes
router.post("/register", adminController.registerUser); // Create a user
// api for login API/USERS/LOGIN
router.post("/login", adminController.logIn); // User login
router.post("/logout", authenticate, adminController.logout); // User logout

router.delete("/user/:id", authenticate, adminController.deleteUser); // Delete a user
router.put("/users/:id", authenticate, adminController.updateUser); // Update a user

// Article management routes
router.post("/articles", authenticate, adminController.createArticle); // Create an article
router.get("/articles/:id", adminController.getArticleById); // Get an article by ID

router.put("/articles/:id", authenticate, adminController.updateArticle); // Update an article
router.delete("/articles/:id", authenticate, adminController.deleteArticle); // Delete an article

router.get("/users", authenticate, adminController.getAllUsers); // Get all users
export default router;
