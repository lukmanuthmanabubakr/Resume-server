import express from "express";
import {
  forgotPassword,
  getUserById,
  getUserResumes,
  loginUser,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import verifyEmail from "../middlewares/verifyEmailMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/verify/:token", verifyUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.get("/data", protect, verifyEmail, getUserById);
userRouter.get("/resumes", protect, verifyEmail, getUserResumes);

export default userRouter;
