import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  // Get token from browser
  const token = req.cookies.access_token;
  // Check if token exists
  if (!token) {
    return next(errorHandler(401, "Unauthorized! Please login first!"));
  }
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Unauthorized! Please login first!"));
    req.user = user;
    next();
  });
};
