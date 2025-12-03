import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
    type: mongoose.Schema.Types.ObjectId, // reference ID
    ref: "User",                          // model name we reference
    required: true                        // task must belong to a user
  }
});

export const Task = new mongoose.model("Task", taskSchema);