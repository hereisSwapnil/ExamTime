import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";
import TextLogo from "../../assets/blackLogo.png";
import { toast, Bounce } from "react-toastify";
import { ButtonLoader } from "../Loader/Loader";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [loading, setLoading] = useState(false);
  const [passToggle, setPassToggle] = useState("password");
  const [confirmPassToggle, setConfirmPassToggle] = useState("password");

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please start over.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/forgot-password");
    }
  }, [email, navigate]);

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

  const handleResetPassword = async (data) => {
    if (!email) {
      toast.error("Email not found. Please start over.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/forgot-password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/update-password`,
        {
          email: email,
          newPassword: data.password,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <img className="h-12 w-auto" src={TextLogo} alt="ExamTime" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight gradient-text">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card p-8">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              handleResetPassword(data);
            })}
          >
            <div>
              <label htmlFor="password" className="label">
                New Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passToggle}
                  autoComplete="new-password"
                  className="input-field pr-10"
                  placeholder="Enter your new password"
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
              <label htmlFor="confirm_password" className="label">
                Confirm New Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={confirmPassToggle}
                  autoComplete="new-password"
                  className="input-field pr-10"
                  placeholder="Confirm your new password"
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (val) => {
                      if (watch("password") !== val) {
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirm_password.message}
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
                    <span>Resetting password...</span>
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
