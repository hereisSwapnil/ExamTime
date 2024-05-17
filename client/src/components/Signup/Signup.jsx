import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import MoonLoader from "react-spinners/MoonLoader";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useNavigate } from "react-router";
import TextLogo from "../../assets/blackLogo.png";

import { Loader } from "../Loader/Loader";
import { UserContext } from "../../Context/UserContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUpSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(6, "Email must be at least 6 characters")
      .max(255, "Email must not be more than 255 characters"),

    username: z
      .string()
      .regex(
        Regex,
        "Username should contain at least one lowercase letter, one uppercase letter, and one special character"
      )
      .min(5, "Username must be at least 5 characters")
      .max(10, "Username must not be more than 10 characters"),

    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
      ),



    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });


import { Loader } from "../Loader/Loader";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const [passToggle, setPassToggle] = useState("password");
  const [checkUsernameLoading, setCheckUsernameLoading] = useState(null);
  const [usernameExists, setUsernameExists] = useState();
  const [loading, setLoading] = useState(false);

  const registerUser = async (data) => {
    setLoading(true);

    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        data
      );

      console.log("Registration response:", res.data); 
      if (res.data.message === "register success") {
        navigate("/login");
      if (res.status === 200) {
        setRegisterError("");
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      } else if (res.status === 409) {
        navigate("/");
      } else if (res.data.message === "user already exists") {
        setError("username", {
          type: "manual",
          message: "User already exists!",
        });
      } else {
        setError("form", {
          type: "manual",
          message: "Some error occurred!",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("form", {
        type: "manual",
        message: "Registration error. Please try again!",
      });
        throw new Error("Something went wrong!");

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
    setLoading(false);
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
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/checkusername/${username}`
        );
        if (res.data.message === "username taken") {
          setUsernameExists(true);
        } else {
          setUsernameExists(false);
        }
      } catch (error) {
        console.error("Error checking username:", error);
        // Handle error if the request fails
      } finally {
        setCheckUsernameLoading(false);
      }
    }
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
                  id="email"
                  name="email"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email")}
                />
                {errors.email && (

                  <p className="text-sm text-red-500 ">
                    {errors.email.message}
                  </p>

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
                  {...register("username")}
                  onChange={handleUsernameChange}
                />
                {checkUsernameLoading && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <MoonLoader color="#000000" size={15} />
                  </span>
                )}
                {!checkUsernameLoading && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {usernameExists ? <ImCross /> : <TiTick />}
                  </span>
                )}
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
              {errors.username && (
                <p className="text-sm text-red-500 ">
                  {errors.username.message}
                </p>
              )}
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
                <div className="flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={passToggle}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="flex items-center text-sm leading-5"
                    style={{ marginLeft: "-2.5rem" }}
                  >
                    {passToggle === "text" ? (
                      <GoEyeClosed className="text-lg" />
                    ) : (
                      <GoEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 ">
                    {errors.password.message}
                  </p>
                )}
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
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  id="confirm_password"
                  name="confirm_password"
                  type={passToggle}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 ">
                    {errors.confirmPassword.message}
                  </p>
                )}
                 <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {confirmPassToggle === "text" ? (
                    <GoEyeClosed className="text-lg" />
                  ) : (
                    <GoEye className="text-lg" />
                  )}
                </button>

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


              <p className="text-sm mt-5 text-red-500 text-center"></p>

              <p className="text-sm mt-5 text-red-500 text-center">
                {registerError && registerError}
              </p>

            </div>
            {errors.form && (
              <p className="text-sm text-red-500 ">{errors.form.message}</p>
            )}
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
