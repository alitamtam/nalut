import prisma from "../../prisma/index.js";
import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";
import { generateToken } from "../middleware/auth.middleware.js";

const adminController = {
  async registerUser(req, res) {
    try {
      const { firstName, lastName, username, email, password, role } = req.body; // Include role in destructuring
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const registeredUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          role, // Save the role to the user data
        },
      });

      // Automatically create a profile for the registered user
      const userId = registeredUser.id;
      const bio = ""; // You can adjust the bio data or take it from the request
      const image = ""; // You can adjust the image data or take it from the request
      await prisma.profile.create({
        data: {
          userId,
          bio,
          image,
        },
      });

      res
        .status(201)
        .json({ message: "User and profile created successfully" });
    } catch (error) {
      if (error.code === "P2002") {
        res.status(409).json({ message: "User already exists" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async logIn(req, res) {
    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await userModel.findUserByUsername(username, {
        include: { role: true }, // Ensure the role is included in the user object
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Check the password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Generate JWT token
      const token = generateToken(user);

      // Respond with token and user data (including the role)
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role, // Assuming the role is in the form of { name: "admin" }
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  },

  async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  },

  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany(
        {
          take: 100,
        } // Limit the number of users returned
      );
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  async getUserById(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          password: false, // Exclude the password from the response
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, username, email, oldPassword, newPassword } =
      req.body;

    try {
      // Validate the user ID
      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Fetch the existing user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Only update password if both oldPassword and newPassword are provided
      let hashedPassword = user.password;
      if (oldPassword && newPassword) {
        const isPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      // Build the data object with only fields that are present in the request
      const updateData = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        username: username || user.username,
        email: email || user.email,
        password: hashedPassword,
      };

      // Update the user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  },
  async deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id);

      // Use a Prisma transaction to delete the profile first, then the user
      await prisma.$transaction([
        prisma.profile.delete({
          where: { userId: userId },
        }),
        prisma.user.delete({
          where: { id: userId },
        }),
      ]);

      res
        .status(200)
        .json({ message: "User and profile deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user and profile" });
    }
  },
};

export default adminController;
