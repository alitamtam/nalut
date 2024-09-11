import prisma from "../../prisma/index.js";

// Fetch all articles
export const getAllArticles = async () => {
  return await prisma.articles.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

// Fetch a single article by its ID
export const getArticleById = async (id) => {
  return await prisma.articles.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true, // Include the author relation
    },
  });
};

// Create a new article
export const createArticle = async ({ title, article, authorId }) => {
  return await prisma.articles.create({
    data: {
      title,
      article, // Corresponds to the 'article' column in the table
      authorId,
      created_at: new Date(), // Default to now
    },
  });
};

// Update an article by its ID
export const updateArticle = async (id, data) => {
  return await prisma.articles.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updated_at: new Date(), // Update the 'updated_at' field
    },
  });
};

// Delete an article by its ID
export const deleteArticle = async (id) => {
  return await prisma.articles.delete({
    where: { id: parseInt(id) },
  });
};
//     });
