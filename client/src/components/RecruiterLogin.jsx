import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function RecruiterLogin() {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const { setShowRecruiterLogin } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
      return;
    }
  };
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black-30 flex justify-center items-center ">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
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
              <label htmlFor="image">
                <img
                  className="w-16 h-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Complany <br /> Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  type="text"
                  placeholder="Company Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="outline-none text-sm"
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none text-sm"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 mb-5">
              <img src={assets.lock_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none text-sm"
              />
            </div>{" "}
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 mb-4 cursor-pointer">
            Forgot password?
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mb-5"
        >
          {state === "Login"
            ? "login"
            : isTextDataSubmited
            ? "create account"
            : "Next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            do not have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Alaready have an account{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 cursor-pointer right-5"
        />
      </form>
    </div>
  );
}

export default RecruiterLogin;
