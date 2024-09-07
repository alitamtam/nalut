import prisma from "../../prisma/index.js";

const articleController = {
  // Render the homepage with articles and topics
  async renderHomePage(req, res, next) {
    try {
      const articles = await prisma.articles.findMany({
        orderBy: { created_at: "desc" },
        take: 6,
      });
      const topics = await prisma.publications.findMany();
      res.render("index", { articles, topics });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Render the About page
  async renderAboutPage(req, res, next) {
    try {
      res.render("about", { currentRoute: "/about" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Fetch and render all articles
  async findAllArticles(req, res, next) {
    try {
      const articles = await prisma.articles.findMany({
        orderBy: { created_at: "desc" },
        take: 6,
      });
      res.render("index", { articles });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Find a specific article by ID
  async findArticleById(req, res) {
    try {
      const { id } = req.params;
      const article = await prisma.articles.findUnique({
        where: { id: parseInt(id) },
      });
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.render("fullArticle", { article });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default articleController;
