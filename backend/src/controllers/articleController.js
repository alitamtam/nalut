import prisma from "../../prisma/index.js";

const articleController = {
  // Fetch and return homepage data (articles and topics)
  async getHomePageData(req, res, next) {
    try {
      const articles = await prisma.articles.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      });
      const topics = await prisma.publications.findMany();
      res.status(200).json({ articles, topics });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return all articles
  async findAllArticles(req, res, next) {
    try {
      const articles = await prisma.articles.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      });
      res.status(200).json(articles);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and return a specific article by ID
  async findArticleById(req, res, next) {
    try {
      const { id } = req.params;
      const article = await prisma.articles.findUnique({
        where: { id: parseInt(id) },
      });
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json(article);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default articleController;
