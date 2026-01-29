import express from "express";
import {
  getProjects,
  addProject,
  getProjectById,
} from "../controllers/project.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Fetch all projects
router.get("/", getProjects);

// Fetch single project by ID
router.get("/:id", getProjectById);

// Add new project (later restrict to Admin only)
router.post("/", authMiddleware, isAdmin, addProject);

export default router;
