const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

// @desc Create a new resume
// @route POST /api/resume
// @access Private
const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    //Default Templates
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        description: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        github: "",
        website: "",
      },
      userExperiences: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interest: [""],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });
    res.status(201).json(newResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create reume", error: error.message });
  }
};

// @desc Get all resumes for logged-in-user
// @route GET /api/resume
// @access Private
const getUserResumes = async (req, res) => {};

// @desc Get single resume by ID
// @route GET /api/resume/:id
// @access Private
const getResumeById = async (req, res) => {};
// @desc Update a resume
// @route PUT /api/resume/:id
// @access Private
const updateResume = async (req, res) => {};
// @desc Delete a resume
// @route DELETE /api/resume/:id
// @access Private
const deleteResume = async (req, res) => {};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
