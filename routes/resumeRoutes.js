import express from "express";
import protect from "../middlewares/authMiddleware";
import { createResume } from "../controllers/resumeController";

const resumeRouter = express.Router()

resumeRouter.post('/create', protect, createResume)