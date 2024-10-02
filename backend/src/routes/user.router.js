import express from "express";
import adminController from "../controllers/adminController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js"; // Make sure to add this middleware if you have it

const router = express.Router();

// all routes start with api/users

// User management routes
router.post(
  "/register",
  authenticate,
  authorizeAdmin,
  adminController.registerUser
); // Create a user
// api for login API/USERS/LOGIN
router.post("/login", adminController.logIn); // User login

router.post("/logout", authenticate, adminController.logout); // User logout

router.delete(
  "/user/:id",
  authenticate,
  authorizeAdmin,
  adminController.deleteUser
); // Delete a user

router.put("/users/:id", authenticate, adminController.updateUser); // Update a user

// Article management routes

router.get("/users", authenticate, adminController.getAllUsers); // Get all users
export default router;
