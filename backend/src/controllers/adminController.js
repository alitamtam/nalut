import prisma from "../../prisma/index.js";
import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";
import { generateToken } from "../middleware/auth.middleware.js";

const adminController = {
  async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        roleId,
        organizationId,
      } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with role and organization
      const registeredUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          roleId,
          organizationId,
        },
      });

      res
        .status(201)
        .json({ message: "User created successfully", user: registeredUser });
    } catch (error) {
      if (error.code === "P2002") {
        res.status(409).json({ message: "Username or email already exists" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async logIn(req, res) {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: { userRoles: true },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const token = generateToken(user);

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          userRoles: user.userRoles,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in" });
    }
  },

  async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  },

  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        include: {
          role: true,
          organization: true,
        },
        take: 100,
      });
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
        include: {
          role: true,
          organization: true,
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
    const userId = parseInt(req.params.id);
    const {
      firstName,
      lastName,
      username,
      email,
      oldPassword,
      newPassword,
      roleId,
      organizationId,
    } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let hashedPassword = user.password;
      if (oldPassword && newPassword) {
        const validOldPassword = await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!validOldPassword) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          username: username || user.username,
          email: email || user.email,
          password: hashedPassword,
          roleId: roleId || user.roleId,
          organizationId: organizationId || user.organizationId,
        },
      });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  },

  async deleteUser(req, res) {
    const userId = parseInt(req.params.id);

    try {
      await prisma.user.delete({ where: { id: userId } });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },
};

export default adminController;
