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