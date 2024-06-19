import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required!"));
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create new user instance
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Save user to database
    await newUser.save();
    res.json("Signup successful");
  } catch (err) {
    next(err);
  }
};
