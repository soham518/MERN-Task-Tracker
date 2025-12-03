import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
dotenv.config({ path: "../.env" });
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const exesistingUser = await User.findOne({ email });
    if (exesistingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    };
    const createdUser = await User.create(newUser);
    if (!createdUser) {
      return res.status(400).json({
        success: false,
        message: "failed to register user",
      });
    }
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: createdUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to create user",
      err,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "enter valid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES || "7d",
      }
    );
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to login",
      err,
    });
  }
};
