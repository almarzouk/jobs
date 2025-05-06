import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// ✅ Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }

  if (!imageFile) {
    return res
      .status(400)
      .json({ success: false, message: "Please upload an image" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Register Company Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Login company
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Login Company Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get company profile
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const newJob = await Job.create({
      title,
      description,
      location,
      salary,
      level,
      category,
      companyId,
      visible: true,
    });

    res.status(201).json({
      success: true,
      newJob,
    });
  } catch (error) {
    console.error("Post Job Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    const applications = await JobApplication.find({ companyId });
    return res.json({ success: true, applications });
  } catch (error) {
    console.error("Get Company Job Applicants Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// ✅ Get posted jobs by company (with applications count)
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applications = await JobApplication.find({ jobId: job._id });
        return {
          ...job._doc,
          applicationsCount: applications.length,
        };
      })
    );

    res.json({ success: true, jobsData: jobsData.reverse() });
  } catch (error) {
    console.error("Get Company Posted Jobs Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get applications for company jobs
export const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "fullName email resume")
      .populate("jobId", "title location level");

    res.json({ success: true, applications });
  } catch (error) {
    console.error("Get Company Job Applications Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Change job application visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.companyId.toString() !== companyId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    job.visible = !job.visible;
    await job.save();

    res.json({ success: true, job });
  } catch (error) {
    console.error("Change Job Visibility Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ (تُستكمل لاحقًا) Change application status
export const changeJobApplicationStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const application = await JobApplication.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    application.status = status;
    await application.save();

    return res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Change Job Application Status Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
