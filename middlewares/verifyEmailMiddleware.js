import User from "../models/User.js";

const verifyEmail = async (req, res, next) => {
  try {
    const userId = req.userId; // comes from protect middleware

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email to access this feature",
      });
    }

    next(); // user is verified → allow access
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default verifyEmail;
