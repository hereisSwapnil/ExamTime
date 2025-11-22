import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { UserContext } from "../../Context/UserContext";
import TextLogo from "../../assets/blackLogo.png";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { Loader, ButtonLoader } from "../Loader/Loader";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(UserContext);
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        data
      );
      if (res.data.message === "login success") {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred";

      if (errorMessage === "user not found") {
        toast.warning("User not found!", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else if (errorMessage === "Please verify email first") {
        localStorage.setItem("token", err.response.data.token);
        navigate("/verifyotp");
        return;
      } else if (errorMessage === "Invalid credentials") {
        toast.error("Invalid Credentials!", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else {
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/google-auth`,
        { credential: credentialResponse.credential }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Google login error:", error);
      const errorMessage =
        error.response?.data?.message || "Google authentication failed";
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
    toast.error("Google login failed!", {
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
        <ToastContainer />
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-8">
            <img className="h-12 w-auto" src={TextLogo} alt="ExamTime" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight gradient-text">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="card p-8">
            <form
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                loginUser(data);
              })}
            >
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
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
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={passToggle}
                    autoComplete="current-password"
                    className="input-field pr-10"
                    placeholder="Enter your password"
                    {...register("password", {
                      validate: {
                        matchPatern: (value) =>
                          !/^$|\s+/.test(value) || "please enter password",
                      },
                    })}
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
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ButtonLoader size="small" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              {/* Google Sign In - Only show if client ID is configured */}
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

                    {/* Google Sign In Button */}
                    <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
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
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
