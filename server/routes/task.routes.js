import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Create Task
router.post("/tasks",isLoggedIn, createTask);

// Get All Tasks
router.get("/tasks",isLoggedIn, getAllTasks);

// Get Single Task by ID
router.get("/tasks/:id",isLoggedIn, getTaskById);

// Update Task
router.put("/tasks/:id",isLoggedIn, updateTask);

// Delete Task
router.delete("/tasks/:id",isLoggedIn, deleteTask);

export default router;