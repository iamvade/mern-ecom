import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  authUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser)

export default router;
