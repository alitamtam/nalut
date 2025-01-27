import express from "express";
import peopleController from "../controllers/peopleController.js";

const router = express.Router();

// Route to get all people
router.get("/", peopleController.findAllPeople);

// Route to get a single person by ID
router.get("/:id", peopleController.getPersonById);

// Route to create a new person
router.post("/", peopleController.createPerson);

// Route to update a person's details
router.put("/:id", peopleController.updatePerson);

// Route to delete a person by ID
router.delete("/:id", peopleController.deletePerson);

export default router;
