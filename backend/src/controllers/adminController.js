import prisma from "../../prisma/index.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/jwt.middleware.js";

const adminController = {
  async getDashboardData(req, res) {
    try {
      const allArticles = await prisma.articles.findMany({
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

  async createUser(req, res) {
    try {
      const { first_name, last_name, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const createUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          username,
          email,
          password: hashedPassword,
        },
      });

      console.log(createUser);
      res.status(201).json({ message: "User created successfully" });
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
      const user = await prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        return res
          .status(401)
          .json({ errorMessage: "Incorrect username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ errorMessage: "Incorrect username or password" });
      }

      // Generate JWT token
      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true }); // Store token in cookie

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  },

  async createArticle(req, res) {
    try {
      const { title, article } = req.body;

      const newArticle = await prisma.articles.create({
        data: {
          title,
          article,
          author: { connect: { id: req.user.id } }, // Connect to logged-in user
        },
      });

      console.log(newArticle);
      res.status(201).json({ message: "Article created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating article" });
    }
  },

  async getArticleById(req, res) {
    const articleId = parseInt(req.params.id);

    try {
      const article = await prisma.articles.findUnique({
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
      const updatedArticle = await prisma.articles.update({
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
      await prisma.articles.delete({
        where: { id: parseInt(req.params.id) },
      });

      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting article" });
    }
  },
};

export default adminController;
