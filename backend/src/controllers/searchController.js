import prisma from "../../prisma/index.js";
/**
 * Search across multiple tables in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const searchDatabase = async (req, res) => {
  const searchTerm = req.query.term;
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const results = await Promise.all([
      prisma.projects.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
            { link: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      }),
      prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: searchTerm, mode: "insensitive" } },
            { lastName: { contains: searchTerm, mode: "insensitive" } },
            { username: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      }),
      prisma.profile.findMany({
        where: {
          bio: { contains: searchTerm, mode: "insensitive" },
        },
      }),
      prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { location: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      }),
      prisma.publications.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        include: {
          topic: true,
        },
      }),
      prisma.topic.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { iconClass: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      }),
    ]);

    res.json({
      projects: results[0],
      users: results[1],
      profiles: results[2],
      events: results[3],
      publications: results[4],
      topics: results[5],
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
