import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { user, isLoaded } = useUser(); // ✅ التحقق من جاهزية Clerk user
  const { getToken, isLoaded: authLoaded } = useAuth(); // ✅ التحقق من جاهزية auth

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [userApplications, setUserApplications] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // ✅ جلب بيانات المستخدم
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      console.log("Token in fetchUserData:", token); // للمساعدة في التشخيص
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data response:", data);

      if (data.success) {
        setUserData(data.user);
        console.log("User data fetched successfully:", data.user);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    } finally {
      setLoadingUserData(false);
    }
  };

  // ✅ جلب بيانات الشركة
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      if (data.success) {
        setCompanyData(data.company);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data.");
    }
  };

  // ✅ جلب كل الوظائف من الـ API
  const fetchAllJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      toast.error("Failed to fetch all jobs.");
      console.error("Error fetching all jobs:", error);
    }
  };
  const getUserApplicationsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserApplications(data.applications);
      }
    } catch (error) {
      console.error("Error fetching user applications:", error);
      toast.error("Failed to fetch user applications.");
    }
  };
  // ✅ وظائف تجريبية محلية
  const fetchJobs = () => {
    setJobs(jobsData);
  };
  const logoutCompany = () => {
    localStorage.removeItem("companyToken");
    setCompanyToken(null);
    setCompanyData(null);
  };
  // ✅ تحميل بيانات المستخدم عند توفر Clerk
  useEffect(() => {
    if (user) {
      fetchUserData();
      getUserApplicationsData();
    }
  }, [user]);

  // ✅ تحميل كل الوظائف
  useEffect(() => {
    fetchAllJobs();
  }, []);

  // ✅ تحميل بيانات الشركة إذا كان هناك توكن
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // ✅ عند بداية التشغيل: استرجاع توكن الشركة من localStorage
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    fetchCompanyData,
    fetchUserData,
    userData,
    setUserData,
    loadingUserData,
    userApplications,
    setUserApplications,
    getUserApplicationsData,
    logoutCompany,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
