import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);
  const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-job`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message || "Failed to fetch jobs.");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  // chenge the date format to dd/mm/yyyy
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  // change visible job status
  const changeVisible = async (jobId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id: jobId },
        {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        }
      );
      if (data.success) {
        toast.success("Job visibility changed successfully.");
        fetchJobs();
      } else {
        toast.error(data.message || "Failed to change job visibility.");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    if (companyToken) {
      fetchJobs();
    }
  }, [companyToken]);
  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr className="text-gray-700" key={index}>
                <td className="px-4 pt-2 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="px-4 pt-2 border-b">{job.title}</td>
                <td className="px-4 pt-2 border-b max-sm:hidden">
                  {formatDate(job.date)}
                </td>
                <td className="px-4 pt-2 border-b max-sm:hidden">
                  {job.location}
                </td>
                <td className="px-4 pt-2 border-b text-center">
                  {job.applicants}
                </td>
                <td className="px-4 pt-2 border-b">
                  <input
                    className="scale-125 ml-4"
                    type="checkbox"
                    checked={job.visible}
                    onChange={() => changeVisible(job._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add new Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
