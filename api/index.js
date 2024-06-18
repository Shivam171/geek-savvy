import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const app = express();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server running on port ${process.env.SERVER_PORT}!`)
);

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
