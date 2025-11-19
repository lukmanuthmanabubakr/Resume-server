import express from "express";
import protect from "../middlewares/authMiddleware";
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controllers/aiController";

const aiRoutes = express.Router();

aiRoutes.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRoutes.post("/enhance-job-desc", protect, enhanceJobDescription);
