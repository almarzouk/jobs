import express from "express";
import {
  getUserData,
  applyForJob,
  getUserJobAppications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";
const router = express.Router();
// get user data
router.get("/user", getUserData);
// apply for job
router.post("/apply", applyForJob);
// get user applied applications
router.get("/applications", getUserJobAppications);
// update user profile(resume)
router.post("/update-resume", upload.single("resume"), updateUserResume);
export default router;
