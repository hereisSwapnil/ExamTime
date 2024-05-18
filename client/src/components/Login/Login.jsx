import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { UserContext } from "../../Context/UserContext";
import TextLogo from "../../assets/blackLogo.png";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { Loader } from "../Loader/Loader";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setloginError] = useState();
  const { user, setUser } = useContext(UserContext);
  const [passToggle, setPassToggle] = useState("password");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    if (passToggle === "password") {
      setPassToggle("text");
    } else {
      setPassToggle("password");
    }
  };

  const loginUser = async (data) => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/login`, data)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "login success") {
          localStorage.setItem("token", res.data.token);
          setUser(res.data.user);
          setloginError("");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          toast.success("Logged in successfully!", {
            position: "top-right",
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
      })
      .catch((err) => {
        if (err.response.data.message === "user not found") {
          setloginError("User not found");
          toast.warning("User not found!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setLoading(false);
        } else if (err.response.data.message === "Please verify email first") {
          setloginError("Please verify email first");
          localStorage.setItem("token", err.response.data.token);
          setLoading(false);
          navigate("/verifyotp");
        } else if (err.response.data.message === "Invalid credentials") {
          setloginError("Invalid Credentials");
          toast.error("Invalid Credentials!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setLoading(false);
        } else {
          setloginError("Something went wrong!");
          toast.error("An error occurred!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setLoading(false);
        }
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8">
        <ToastContainer />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="text-center m-auto h-[50px]"
            src={TextLogo}
            alt="ExamTime"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              loginUser(data);
            })}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", {
                    validate: {
                      matchPatern: (value) =>
                        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) ||
                        "Enter a valid email address",
                    },
                  })}
                />
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
                        !/^$|\s+/.test(value) || "please enter  password",
                    },
                  })}
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
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
