import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <div className="border p-6 shadow-sm rounded-lg">
      <div className="flex justify-between items-center">
        <img className="h-8" src={assets.company_icon} alt="" />
      </div>
      <h4 className="font-medium text-xl mt-2">{job.title}</h4>
      <div className="flex items-center mt-2 gap-3 text-xs">
        <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>
      <p
        className="text-sm mt-4 text-gray-500"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className="mt-4 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-500 border border-gray-500 rounded px-4 py-2 hover:bg-gray-500 hover:text-white transition duration-300"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

export default JobCard;
