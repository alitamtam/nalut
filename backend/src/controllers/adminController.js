import prisma from "../../prisma/index.js";
import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";
import { generateToken } from "../middleware/auth.middleware.js";

const adminController = {
  async getDashboardData(req, res) {
    try {
      const allArticles = await prisma.articleModel.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 6,
      });

      // Send the articles data as JSON to be fetched by React
      res.status(200).json(allArticles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching dashboard data" });
    }
  },

  async registerUser(req, res) {
    try {
      const { first_name, last_name, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const registeredUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          username,
          email,
          password: hashedPassword,
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

  async createArticle(req, res) {
    try {
      const { title, article } = req.body;

      const newArticle = await prisma.articleModel.createArticle({
        data: {
          title,
          article,
          author: { connect: { id: req.user.id } }, // Connect to logged-in user
        },
      });

      res.status(201).json({ message: "Article created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating article" });
    }
  },

  async getArticleById(req, res) {
    const articleId = parseInt(req.params.id);

    try {
      const article = await prisma.articleModel.findUnique({
        where: { id: articleId },
      });

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving article" });
    }
  },

  async updateArticle(req, res) {
    const articleId = parseInt(req.params.id);
    const { title, article } = req.body;

    try {
      const updatedArticle = await prisma.articleModel.update({
        where: { id: articleId },
        data: { title, article },
      });

      res
        .status(200)
        .json({ message: "Article updated successfully", updatedArticle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating article" });
    }
  },

  async deleteArticle(req, res) {
    try {
      await prisma.articleModel.delete({
        where: { id: parseInt(req.params.id) },
      });

      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting article" });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
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
    const { first_name, last_name, username, email } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { first_name, last_name, username, email },
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
