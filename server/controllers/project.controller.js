import Project from "../models/project.model.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// Add new project (for admin use)
export const addProject = async (req, res) => {
  try {
    const { title, price, demoUrl, fullUrl } = req.body;

    const project = await Project.create({ title, price, demoUrl, fullUrl });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
