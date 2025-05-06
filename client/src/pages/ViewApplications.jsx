import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applications, setApplications] = useState([]);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });

      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error(data.message || "Failed to fetch applications.");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications.");
    }
  };

  const handleApplicationAction = async (applicationId, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id: applicationId, status },
        {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(`Application marked as ${status}`);
        fetchCompanyJobApplications(); // refresh list
      } else {
        toast.error(data.message || "Action failed.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Action failed.");
    }
  };

  useEffect(() => {
    fetchCompanyJobApplications();
  }, []);

  const statusStyles = {
    accept: "bg-green-100 text-green-700",
    reject: "bg-red-100 text-red-600",
    pending: "bg-yellow-100 text-yellow-600",
  };

  const statusText = {
    accept: "Accepted",
    reject: "Rejected",
    pending: "Pending",
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4 max-sm:hidden">Job Title</th>
              <th className="py-3 px-4 max-sm:hidden">Location</th>
              <th className="py-3 px-4">Resume</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => {
              const status = application.status?.toLowerCase();

              return (
                <tr
                  key={application._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 border-b text-center font-medium text-gray-600">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 border-b">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-xs text-gray-500">
                          {application.userId.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 border-b max-sm:hidden text-gray-700">
                    {application.jobId?.title}
                  </td>

                  <td className="px-4 py-3 border-b max-sm:hidden text-gray-700">
                    {application.jobId?.location}
                  </td>

                  <td className="px-4 py-3 border-b">
                    <a
                      href={application.userId?.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                    >
                      <img
                        src={assets.resume_download_icon}
                        alt="resume"
                        className="w-4 h-4"
                      />
                      View
                    </a>
                  </td>

                  <td className="px-4 py-3 border-b">
                    <div className="flex flex-col gap-2 items-start">
                      {/* الحالة الحالية */}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}
                      >
                        {statusText[status] || "Unknown"}
                      </span>

                      {/* الأزرار الثلاثة متاحة دائمًا */}
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {["accept", "reject", "pending"].map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              handleApplicationAction(application._id, s)
                            }
                            className={`px-3 py-1 text-xs font-medium rounded transition ${
                              s === "accept"
                                ? status === "Accepted"
                                  ? "bg-green-600 text-white ring-2 ring-green-800"
                                  : "bg-green-500 text-white hover:bg-green-600"
                                : s === "Reject"
                                ? status === "Rejected"
                                  ? "bg-red-600 text-white ring-2 ring-red-800"
                                  : "bg-red-500 text-white hover:bg-red-600"
                                : status === "pending"
                                ? status === "pending"
                                  ? "bg-yellow-600 text-white ring-2 ring-yellow-800"
                                  : "bg-yellow-500 text-white hover:bg-yellow-600"
                                : ""
                            }`}
                          >
                            {statusText[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}

            {applications.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
