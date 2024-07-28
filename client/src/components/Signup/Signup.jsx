import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import MoonLoader from "react-spinners/MoonLoader";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useNavigate } from "react-router";
import TextLogo from "../../assets/blackLogo.png";
import { toast, Bounce } from "react-toastify";
import { Loader } from "../Loader/Loader.jsx";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const isPasswordStrong = (password)=>{
    return password.length>=8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const [registerError, setRegisterError] = useState();
  const [passToggle, setPassToggle] = useState("password");
  const [checkUsernameLoading, setCheckUsernameLoading] = useState(null);
  const [usernameExists, setUsernameExists] = useState();
  const [loading, setLoading] = useState(false);
  const [Focused,setFocused] = useState(false);
  const [passwordStrong , setPasswordStrong] = useState(false);



  const registerUser = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        data
      );
      setRegisterError("");
      localStorage.setItem("token", res.data.token);
      navigate("/verifyotp");
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response.data.message === "User already exists") {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setLoading(false);
    }
  };

  const togglePassword = () => {
    if (passToggle === "password") {
      setPassToggle("text");
    } else {
      setPassToggle("password");
    }
  };

  const handleUsernameChange = async (event) => {
    const username = event.target.value;
    setUsernameExists(false);

    if (username.trim() !== "") {
      setCheckUsernameLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/checkusername/${username}`
      );
      if (res.data.message === "username taken") {
        setUsernameExists(true);
        setCheckUsernameLoading(false);
      } else {
        setUsernameExists(false);
        setCheckUsernameLoading(false);
      }
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPasswordStrong(isPasswordStrong(password));

  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="text-center m-auto h-[50px]"
            src={TextLogo}
            alt="ExamTime"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              registerUser(data);
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", {
                    validate: {
                      matchPatern: (value) =>
                        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                        "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p
                    className="text-sm text-red-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: errors.email.message,
                    }}
                  ></p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="block w-full pr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("username", {
                    validate: (value) =>
                      !usernameExists || "Username is already taken",
                  })}
                  onChange={handleUsernameChange}
                />
                {!checkUsernameLoading ? (
                  <p
                    className={`text-sm ${
                      usernameExists ? "text-red-500" : "text-green-500"
                    }  `}
                  >
                    {checkUsernameLoading
                      ? ""
                      : usernameExists == true
                      ? "Username taken"
                      : usernameExists == false
                      ? "Username available"
                      : ""}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 ">Checking...</p> // instead of empty space showing checking will not decrease the height
                )}
                <span
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${
                    checkUsernameLoading
                      ? ""
                      : usernameExists == true
                      ? "mb-[20px]"
                      : usernameExists == false
                      ? "mb-[20px]"
                      : ""
                  }`}
                >
                  {checkUsernameLoading ? (
                    <MoonLoader color="#000000" size={15} />
                  ) : usernameExists == true ? (
                    <ImCross />
                  ) : usernameExists == false ? (
                    <TiTick />
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>

              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passToggle}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password", {
                    validate: {
                      matchPatern: (value) =>
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                          value
                        ) ||
                        "- at least 8 characters <br />- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number<br />- Can contain special characters",
                    },
                  })}
                  onChange={handlePasswordChange}
                  onFocus={()=>setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passToggle === "text" ? (
                    <GoEyeClosed className="text-lg" />
                  ) : (
                    <GoEye className="text-lg" />
                  )}
                </button>
                {passwordStrong && (<p className="text-sm text-green-500">Password is Strong</p>)}
                {!passwordStrong && (<p className="text-sm text-red-500">Password is not Strong</p>)}
                {Focused && (<div className="text-sm text-gray-500 mt-2">
                <p>Password Must Include</p>
              <ul className="list-disc list-inside">
              <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>

                </ul>
                </div>)}
              </div>
              {errors.password && (
                <p
                  className="text-sm text-red-500 mt-1"
                  dangerouslySetInnerHTML={{
                    __html: errors.password.message,
                  }}
                ></p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={passToggle}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("confirm_password", {
                    required: "Enter confirm password",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors.confirm_password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
              <p className="text-sm mt-5 text-red-500 text-center">
                {registerError && registerError}
              </p>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;
