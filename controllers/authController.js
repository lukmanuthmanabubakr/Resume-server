const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {};

// @desc Get User Profile
// @route GET /api/auth/profile
// @access Public(Required JWT)
const getUserProfile = async (req, res) => {};

module.exports = { registerUser, loginUser, getUserProfile };
