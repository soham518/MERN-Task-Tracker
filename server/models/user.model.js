import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "name is required"],
        trim: true,
        minLength: [2,"Name must be at least 2 characters"]
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    password: {
        type: String,
        require: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
});

export const User = new mongoose.model("User", userSchema);