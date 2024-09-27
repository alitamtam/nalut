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
    const { title, content1, project_images } = req.body;
    try {
      const project = await prisma.projects.create({
        data: {
          title,
          link: "https://www.example.com",
          content1,
          content2: "",
          content3: "",

          project_images: {
            create: project_images,
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
    const { title, content1, project_images } = req.body;
    try {
      const project = await prisma.projects.update({
        where: { id: parseInt(id) },
        data: {
          title,
          content1,
          project_images: {
            update: project_images,
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
