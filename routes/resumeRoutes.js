const express = require("express");
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middlesware/authMiddleware");
// const { uploadResumeImages } = require("../controllers/uploadImages");

const router = express.Router();

router.post("/", protect, createResume);
router.post("/", protect, getUserResumes);
router.post("/:id", protect, getResumeById);
router.post("/:id", protect, updateResume);
router.post("/:id/upload-images", protect, uploadResumeImages);

router.post("/:id", protect, deleteResume);
