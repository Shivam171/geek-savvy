import express from "express";

const router = express.Router();

import { test } from "../controllers/user.controller.js";
router.get("/test", test);

import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.put("/update/:userId", verifyToken, updateUser);

export default router;
