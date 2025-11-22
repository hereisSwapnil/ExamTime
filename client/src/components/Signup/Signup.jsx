import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import MoonLoader from "react-spinners/MoonLoader";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useNavigate } from "react-router";
import TextLogo from "../../assets/blackLogo.png";
import { toast, Bounce } from "react-toastify";
import { Loader, ButtonLoader } from "../Loader/Loader.jsx";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState();
  const [passToggle, setPassToggle] = useState("password");
  const [confirmPassToggle, setConfirmPassToggle] = useState("password");
  const [checkUsernameLoading, setCheckUsernameLoading] = useState(null);
  const [usernameExists, setUsernameExists] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);

  const registerUser = async (data) => {
    setLoading(true);
    setRegisterError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        data
      );
      setRegisterError("");
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully! Please verify your email.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/verifyotp");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      if (errorMessage === "User already exists") {
        setRegisterError(
          "An account with this email already exists. Please sign in instead."
        );
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else if (error.code === "ERR_NETWORK") {
        setRegisterError(
          "Network error. Please check your connection and try again."
        );
        toast.error("Network error. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else {
        setRegisterError("Something went wrong. Please try again.");
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      }
    } finally {
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

  const toggleConfirmPassword = () => {
    if (confirmPassToggle === "password") {
      setConfirmPassToggle("text");
    } else {
      setConfirmPassToggle("password");
    }
  };

  const handleUsernameChange = async (event) => {
    const username = event.target.value;
    setUsernameExists(undefined);

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
        setUsernameExists(undefined);
      } finally {
        setCheckUsernameLoading(false);
      }
    } else {
      setCheckUsernameLoading(false);
      setUsernameExists(undefined);
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPasswordStrong(password);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/google-auth`,
        { credential: credentialResponse.credential }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Google signup error:", error);
      const errorMessage =
        error.response?.data?.message || "Google signup failed";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed!", {
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
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-8">
            <img className="h-12 w-auto" src={TextLogo} alt="ExamTime" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight gradient-text">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join ExamTime and start sharing knowledge
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="card p-8">
            <form
              className="space-y-5"
              onSubmit={handleSubmit((data) => {
                registerUser(data);
              })}
            >
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    autoComplete="username"
                    className="input-field"
                    placeholder="you@example.com"
                    {...register("email", {
                      validate: {
                        matchPatern: (value) =>
                          /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi.test(value) ||
                          "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="username" className="label">
                  Username
                </label>
                <div className="mt-2 relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="input-field pr-10"
                    placeholder="Choose a username"
                    {...register("username", {
                      validate: () =>
                        !usernameExists || "Username is already taken",
                    })}
                    onChange={handleUsernameChange}
                  />
                  <span className="absolute inset-y-1 right-0 pr-3 flex items-center">
                    {checkUsernameLoading ? (
                      <MoonLoader color="#6366f1" size={15} />
                    ) : usernameExists == true ? (
                      <ImCross className="text-red-500" />
                    ) : usernameExists == false ? (
                      <TiTick className="text-green-500" />
                    ) : null}
                  </span>
                  {!checkUsernameLoading && (
                    <p
                      className={`text-sm ${
                        usernameExists
                          ? "text-red-600"
                          : usernameExists === false
                          ? "text-green-600"
                          : ""
                      }`}
                    >
                      {usernameExists == true
                        ? "Username taken"
                        : usernameExists == false
                        ? "Username available"
                        : ""}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={passToggle}
                    autoComplete="new-password"
                    className="input-field pr-10"
                    placeholder="Create a strong password"
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {passToggle === "text" ? (
                      <GoEyeClosed className="h-5 w-5" />
                    ) : (
                      <GoEye className="h-5 w-5" />
                    )}
                  </button>
                  {passwordStrong && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <TiTick className="text-green-600" /> Password is strong
                    </p>
                  )}

                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="confirm_password" className="label">
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={confirmPassToggle}
                    autoComplete="new-password"
                    className="input-field pr-10"
                    placeholder="Confirm your password"
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {confirmPassToggle === "text" ? (
                      <GoEyeClosed className="h-5 w-5" />
                    ) : (
                      <GoEye className="h-5 w-5" />
                    )}
                  </button>
                  {errors.confirm_password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>

              {registerError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-800">{registerError}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ButtonLoader size="small" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>

              {/* Google Sign Up - Only show if client ID is configured */}
              {import.meta.env.VITE_GOOGLE_CLIENT_ID &&
                import.meta.env.VITE_GOOGLE_CLIENT_ID.trim() !== "" && (
                  <>
                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    {/* Google Sign Up Button */}
                    <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="outline"
                        size="large"
                        width="384"
                      />
                    </div>
                  </>
                )}
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;
