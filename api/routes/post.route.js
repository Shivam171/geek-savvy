import express from "express";

const router = express.Router();

import { createPost } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createPost);

export default router;
