import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import JobCard from "../components/JobCard";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

function ApplyJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useAuth();

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    loadingUserData,
    getUserApplicationsData,
  } = useContext(AppContext);

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  // ✅ جلب بيانات الوظيفة
  const fetchJobData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message || "Failed to fetch job data.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch job data.");
    }
  };

  // ✅ التحقق إذا المستخدم قدم على هذه الوظيفة
  const checkAlreadyApplied = (jobId) => {
    const hasApplied = userApplications.some((app) => app.jobId._id === jobId);
    setIsAlreadyApplied(hasApplied);
  };

  // ✅ تقديم الطلب
  const handleApplyJob = async () => {
    if (loadingUserData) {
      toast.info("Please wait, loading your profile...");
      return;
    }

    if (!userData || !userData._id) {
      toast.error("You must be logged in to apply for this job.");
      return;
    }

    if (!userData.resume) {
      toast.error("Please upload your resume to apply.");
      return;
    }

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: jobData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Application submitted successfully!");
        await getUserApplicationsData(); // تحديث قائمة التقديمات
        setIsAlreadyApplied(true);
        navigate("/applications");
      } else {
        toast.error(data.message || "Failed to apply.");
      }
    } catch (error) {
      console.error("Apply error:", error);
      toast.error("Failed to apply for job.");
    }
  };

  // ✅ تحميل بيانات الوظيفة
  useEffect(() => {
    fetchJobData();
  }, [id]);

  // ✅ التحقق من التقديم عند توفر البيانات
  useEffect(() => {
    if (jobData && userApplications.length > 0) {
      checkAlreadyApplied(jobData._id);
    }
  }, [jobData, userApplications]);

  if (!jobData || loadingUserData) return <Loader />;

  const relatedJobs = jobs
    .filter((job) => {
      const appliedJobsIds = new Set(
        userApplications.map((app) => app.jobId && app.jobId._id)
      );
      return !appliedJobsIds.has(job._id);
    })
    .slice(0, 4);

  const applyButton = (
    <button
      className={`bg-blue-600 p-2.5 px-10 text-white rounded ${
        loadingUserData || isAlreadyApplied
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
      onClick={handleApplyJob}
      disabled={loadingUserData || isAlreadyApplied}
    >
      {isAlreadyApplied ? "Already Applied" : "Apply Now"}
    </button>
  );

  return (
    <>
      <Navbar />
      <div className="container min-h-screen py-10 px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          {/* Header */}
          <div className="flex justify-center md:justify-between items-center flex-wrap gap-8 px-6 md:px-14 py-10 md:py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 w-24 object-contain bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={jobData.companyId?.image || assets.company_placeholder}
                alt="Company"
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {jobData.title}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {jobData.salary}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right text-sm">
              {applyButton}
              <p className="mt-1 text-gray-600">
                Posted {moment(jobData.createdAt || jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 items-start px-6 md:px-14 pb-10">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div
                className="prose prose-slate mb-10 max-w-none"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <div className="mt-6">{applyButton}</div>
            </div>

            <div className="w-full lg:w-1/3 space-y-5">
              <h2 className="text-lg font-semibold mb-2">
                More jobs from {jobData.companyId?.name}
              </h2>
              {relatedJobs.length > 0 ? (
                relatedJobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-gray-500 text-sm">
                  No other jobs from this company.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ApplyJob;
