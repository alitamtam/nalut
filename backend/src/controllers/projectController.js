import prisma from "../../prisma/index.js";

const projectsController = {
  async getProjects(req, res) {
    try {
      const projects = await prisma.project.findMany({
        include: {
          creator: {
            // Use 'creator' to match the relation name
            select: {
              firstName: true,
              lastName: true,
              profile: true, // Include the profile object
            },
          },
        },
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getProjectById(req, res) {
    const { id } = req.params;
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
          creatorId, // Map each user ID
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
