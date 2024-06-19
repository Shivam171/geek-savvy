import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    // Find user in database
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    // Check if password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );

    // Remove password from response
    const { password: pass, ...rest } = validUser._doc;

    // Set JWT token in cookie
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};
