import express from "express";
import {
  storyController,
  newsController,
  peopleController,
} from "../controllers/CoreController";
import { RoleController } from "../controllers/RoleController";
import AdminController from "../controllers/AdminController";
import {
  authenticate,
  authorizeSuperadmin,
  authorizeHealthEditor,
  authorizeStoryEditor,
  authorizeEventEditor,
} from "middleware/auth.middleware";
import asyncHandler from "express-async-handler";

const router = express.Router();



// **Admin User Management**
// User management routes
router.post("/register", AdminController.registerUser); // Create a user
router.post("/login", AdminController.logIn); // User login
router.post("/logout", authenticate, AdminController.logout); // User logout
router.put("/user/:id", authenticate, AdminController.updateUser); // Update a user
router.delete("/user/:id", authenticate, authorizeSuperadmin, AdminController.deleteUser); // Delete a user
router.get("/users", authenticate, AdminController.getAllUsers); // Get all users
router.get("/user/:id", authenticate, AdminController.getUserById); // Get user by ID

// **Health Editor Routes**
router.post("/news", authenticate, authorizeHealthEditor, asyncHandler(newsController.create));
router.put("/news/:id", authenticate, authorizeHealthEditor, asyncHandler(newsController.update));
router.delete("/news/:id", authenticate, authorizeHealthEditor, asyncHandler(newsController.delete));

// **Story Editor Routes**
router.post("/stories", authenticate, authorizeStoryEditor, asyncHandler(storyController.create));
router.put("/stories/:id", authenticate, authorizeStoryEditor, asyncHandler(storyController.update));
router.delete("/stories/:id", authenticate, authorizeStoryEditor, asyncHandler(storyController.delete));

// **Event Editor Routes**
router.post("/people", authenticate, authorizeEventEditor, asyncHandler(peopleController.create));
router.put("/people/:id", authenticate, authorizeEventEditor, asyncHandler(peopleController.update));
router.delete("/people/:id", authenticate, authorizeEventEditor, asyncHandler(peopleController.delete));


// roles routes (superadmin)
router.post("/", authenticate, authorizeSuperadmin, RoleController.create);
router.get("/", authenticate, authorizeSuperadmin, RoleController.getAll);
router.get("/:id", authenticate, authorizeSuperadmin, RoleController.getOne);
router.put("/:id", authenticate, authorizeSuperadmin, RoleController.update);
router.delete("/:id", authenticate, authorizeSuperadmin, RoleController.delete);

export default router;
