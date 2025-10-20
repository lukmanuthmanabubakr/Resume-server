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

// @desc Create a new resume
// @route POST /api/resumes
// @access Private