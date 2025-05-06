import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RecruiterLogin() {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      setIsLoading(true);

      if (state === "Login") {
        const response = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        const data = response.data;

        if (data.success) {
          toast.success("Login successful!");
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setTimeout(() => {
            setShowRecruiterLogin(false);
            navigate("/dashboard");
          }, 500);
        } else {
          toast.error(data.message || "Login failed.");
        }
      } else if (state === "Sign Up") {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        const response = await axios.post(
          `${backendUrl}/api/company/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;

        if (data.success) {
          toast.success("Account created successfully!");
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setTimeout(() => {
            setShowRecruiterLogin(false);
            navigate("/dashboard");
          }, 500);
        } else {
          toast.error(data.message || "Registration failed.");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md mx-4"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">
          Welcome Back! Please {state === "Login" ? "Sign in" : "Sign up"} to
          continue
        </p>
        {(state === "Sign Up") & isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image" className="cursor-pointer">
                <img
                  className="w-16 h-16 rounded-full object-cover border"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Company logo"
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="Person icon" />
                <input
                  type="text"
                  placeholder="Company Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="outline-none text-sm w-full"
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="Email icon" />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none text-sm w-full"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 mb-5">
              <img src={assets.lock_icon} alt="Lock icon" />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none text-sm w-full"
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 mb-4 cursor-pointer">
            Forgot password?
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 w-full text-white py-2 rounded-full mb-5 ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isLoading
            ? "Processing..."
            : state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmited(false);
              }}
            >
              Login
            </span>
          </p>
        )}
        <button
          type="button"
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 p-1 hover:bg-gray-100 rounded-full"
        >
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
}

export default RecruiterLogin;
