import prisma from "../../prisma/index.js";

const projectsController = {
  async getProjects(req, res) {
    try {
      const projects = await prisma.projects.findMany();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getProject(req, res) {
    const { id } = req.params;
    try {
      const project = await prisma.projects.findUnique({
        where: { id: parseInt(id) },
        include: {
          project_images: true,
        },
      });
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async createProject(req, res) {
    const { title, content1, content2, content3, project_image, actors } =
      req.body; // Add content2, content3, project_image, and actors
    try {
      const project = await prisma.projects.create({
        data: {
          title,
          link: "https://www.example.com",
          content1,
          content2,
          content3,
          project_image, // Update the field name to match the schema
          actors: {
            connect: { id: actors }, // Assuming 'actors' is the ID of the user you want to connect
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
    const { title, content1, content2, content3, project_image, actors } =
      req.body; // Add other fields as needed
    try {
      const project = await prisma.projects.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          content1,
          content2, // Include content2 if it's part of your model
          content3, // Include content3 if it's part of your model
          project_image, // Update to correct field name
          actors: {
            connect: { id: actors }, // Assuming you're connecting the actors as needed
          },
        },
      });
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteProject(req, res) {
    const { id } = req.params;
    try {
      await prisma.projects.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default projectsController;
