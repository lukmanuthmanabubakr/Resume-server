import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";

const generateToken = (userId) => {
  const token = jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

//controller for user registration
//POST: /api/users/register
export const registerUser = async () => {
  try {
    const { name, email, password } = req.body;

    //check if require fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //chekc if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //Return success message
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for user logining
//POST: /api/users/login

export const loginUser = async () => {
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

//Get user id
//controller for user logining
//GET: /api/users/data

export const getUserById = async () => {
  try {
    const userId = req.userId;

    //check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Login successfully", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
