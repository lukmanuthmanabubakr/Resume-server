import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Resume from "../models/Resume.js";
import crypto from "crypto";
import VerificationToken from "../models/VerificationToken.js";
import { verificationEmailTemplate } from "../utils/emailTemplates.js";
import { transporter } from "../configs/nodemailer.js";
import { resetPasswordEmailTemplate } from "../utils/emailTemplates.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//controller for user registration
//POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    await VerificationToken.create({
      userId: newUser._id,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Verify Your Email",
      html: verificationEmailTemplate(newUser.name, token),
    });

    return res.status(201).json({
      message: "User created successfully. Verification email sent.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;

    const tokenDoc = await VerificationToken.findOne({ token });
    if (!tokenDoc) return res.status(400).json({ message: "Invalid token" });

    await User.findByIdAndUpdate(tokenDoc.userId, { isVerified: true });

    await tokenDoc.deleteOne();

    return res.json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for user logining
//POST: /api/users/login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //chekc if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //Check if password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //return success message

    //Return success message
    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successfully", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with this email" });

    // delete old tokens
    await PasswordResetToken.deleteMany({ userId: user._id });

    // generate new token
    const token = crypto.randomBytes(32).toString("hex");

    await PasswordResetToken.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      html: resetPasswordEmailTemplate(user.name, token),
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const tokenDoc = await PasswordResetToken.findOne({ token });

    if (!tokenDoc)
      return res.status(400).json({ message: "Invalid or expired token" });

    if (tokenDoc.expiresAt < Date.now())
      return res.status(400).json({ message: "Token expired" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(tokenDoc.userId, {
      password: hashedPassword,
    });

    await tokenDoc.deleteOne();

    res.json({ message: "Password reset successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Get user id
//controller for user logining
//GET: /api/users/data

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    //check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //return user
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for getting user resumes
//GET: /api/users/resumes

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    //return user resumes
    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
