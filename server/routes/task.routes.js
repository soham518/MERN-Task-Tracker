import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Create Task
router.post("/tasks", createTask);

// Get All Tasks
router.get("/tasks", getAllTasks);

// Get Single Task by ID
router.get("/tasks/:id", getTaskById);

// Update Task
router.put("/tasks/:id", updateTask);

// Delete Task
router.delete("/tasks/:id", deleteTask);

export default router;