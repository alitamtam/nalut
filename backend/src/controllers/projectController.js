import prisma from "../../prisma/index.js";

const projectsController = {
  async getProjects(req, res) {
    try {
      const lang = req.query.lang || "en"; // Default to 'en' if no language is specified

      const projects = await prisma.project.findMany({
        take: 100, // Limit to 100 events
        include: {
          creator: {
            // Use 'creator' to match the relation name
            select: {
              firstName: true,
              lastName: true,
              profile: true, // Include the profile object
            },
          },
          translations: { where: { language: lang } },
        },
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getProjectById(req, res) {
    const { id } = req.params;
    const lang = req.query.lang || "en"; // Default to 'en' if no language is specified

    try {
      const project = await prisma.project.findUnique({
        where: { id: parseInt(id, 10) }, // Use parseInt with radix
        include: {
          creator: {
            // Use 'creator' to match the relation name
            select: {
              firstName: true,
              lastName: true,
              profile: true, // Include the profile object
            },
          },
          translations: { where: { language: lang } },
        },
      });

      // Handle the case where the project is not found
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async createProject(req, res) {
    try {
      const {
        title,
        link,
        content1,
        content2,
        content3,
        projectImage,
        creatorId,
        translations,
      } = req.body; // Add content2, content3, projectImage, and creator

      const project = await prisma.project.create({
        data: {
          title,
          link,
          content1,
          content2,
          content3,
          projectImage, // Update the field name to match the schema
          creatorId, // Map each user ID
          translations: {
            create: translations.map((translation) => ({
              language: translation.language,
              title: translation.title,
              content1: translation.content1,
              content2: translation.content2 || null,
              content3: translation.content3 || null,
            })),
          },
        },
      });
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateProject(req, res) {
    const { id } = req.params;

    // Check if req.body exists and contains required fields
    const {
      title,
      link,
      content1,
      content2,
      content3,
      projectImage,
      creatorId,
      translations,
    } = req.body || {};

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    try {
      const updatedProject = await prisma.project.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          link,
          content1,
          content2,
          content3,
          projectImage,
          creatorId,
          // Update translations
          translations: {
            upsert: translations.map((translation) => ({
              where: {
                projectId_language: {
                  // Using composite key (projectId and language)
                  projectId: parseInt(id, 10),
                  language: translation.language,
                },
              },
              update: {
                title: translation.title,
                content1: translation.content1,
                content2: translation.content2 || null,
                content3: translation.content3 || null,
              },
              create: {
                language: translation.language,
                title: translation.title,
                content1: translation.content1,
                content2: translation.content2 || null,
                content3: translation.content3 || null,
              },
            })),
          },
          include: {
            translations: true, // Ensure that translations are included
          },
        },
      });
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteProject(req, res) {
    const { id } = req.params;
    try {
      await prisma.project.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default projectsController;
