import prisma from "../../prisma/index.js";

const newsController = {
  // Fetch all news entries
  async findAllNews(req, res) {
    const lang = req.query.lang || "ar"; // Default to 'ar' if no language is specified

    try {
      const news = await prisma.news.findMany({
        take: 100, // Limit to 100 news entries
        include: {
          author: true, // Fetch author details
        },
        orderBy: {
          createdAt: "desc", // Sort by creation time in descending order
        },
      });

      res.status(200).json(news);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to fetch news" });
    }
  },

  // Fetch a specific news entry by its ID
  async getNewsById(req, res) {
    const { id } = req.params;

    try {
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          author: true, // Include the author of the news
        },
      });

      if (!news) {
        return res.status(404).json({ error: "News not found" });
      }

      res.status(200).json(news);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to fetch news" });
    }
  },

  // Create a new news entry
  async createNews(req, res) {
    try {
      const { title, content, image, authorId } = req.body;

      const newNews = await prisma.news.create({
        data: {
          title,
          content,
          image,
          author: {
            connect: { id: authorId }, // Link to an existing author (User)
          },
        },
      });

      res.status(201).json(newNews); // Success response with new news data
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create news" });
    }
  },

  // Update an existing news entry
  async updateNews(req, res) {
    const { id } = req.params;
    const { title, content, image, authorId } = req.body;

    try {
      const updatedNews = await prisma.news.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          image,
          author: {
            connect: { id: authorId }, // Update author relation if provided
          },
        },
      });

      res.status(200).json(updatedNews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update news" });
    }
  },

  // Delete a news entry
  async deleteNews(req, res) {
    const { id } = req.params;

    try {
      await prisma.news.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(204).end(); // No content response for successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete news" });
    }
  },
};

export default newsController;
