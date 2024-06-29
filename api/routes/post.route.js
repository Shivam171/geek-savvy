import express from "express";

const router = express.Router();

import { createPost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createPost);
router.get("/getposts", getPosts);

export default router;
