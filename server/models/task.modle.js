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
    isCOmpleted: {
        type: Boolean,
        default: false
    }
});

export const Task = new mongoose.model("Task", taskSchema);