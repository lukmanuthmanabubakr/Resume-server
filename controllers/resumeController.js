const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

// @desc Create a new resume
// @route POST /api/resumes
// @access Private
const createResume = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create reume", error: error.message });
  }
};

// @desc Get all resumes for logged-in-user
// @route GET /api/resumes
// @access Private
const getUserResumes = async (req, res) => {};

// @desc Get single resume by ID
// @route GET /api/resumes/:id
// @access Private
const getResumeById = async (req, res) => {};
// @desc Update a resume
// @route PUT /api/resumes/:id
// @access Private
const updateResume = async (req, res) => {};
// @desc Delete a resume
// @route DELETE /api/resumes/:id
// @access Private
const deleteResume = async (req, res) => {};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
