import express from "express";
const router = express.Router();
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobs,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeVisibility,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

// Register company
router.post("/register", upload.single("image"), registerCompany);
// Login company
router.post("/login", loginCompany);
// Get company data
router.get("/company", protectCompany, getCompanyData);
// Post new job
router.post("/post-job", protectCompany, postJob);
// Get company jobs application
router.get("/jobs", protectCompany, getCompanyJobs);
// Get company posted jobs
router.get("/applications", protectCompany, getCompanyPostedJobs);
// get company job list
router.get("/list-job", protectCompany, getCompanyPostedJobs);
// get company job applications
router.get("/applicants", protectCompany, getCompanyJobs);
// change job application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);
// change job visibility status
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
