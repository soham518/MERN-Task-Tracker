import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from './routes/user.routes.js';
dotenv.config({ path: './.env' });

const app = express();
const port = 1000;

// MIDDLEWARES
app.use(express.json());

// FIX CORS (must be before routes)
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// ROUTES
app.use("/api", taskRoutes);
app.use("/api/auth",userRoutes);
app.get('/', (req, res) => {
  res.json({
    "message": "Server is running"
  });
});

// MONGO CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  dbName: "taskTracker"
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// START SERVER (keep this at the end)
app.listen(port, () => {
  console.log('App is running on port', port);
});