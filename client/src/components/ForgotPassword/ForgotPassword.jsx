import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import TextLogo from "../../assets/blackLogo.png";
import { toast, Bounce } from "react-toastify";
import { ButtonLoader } from "../Loader/Loader";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/forget-password`,
        { email: data.email }
      );

      if (response.status === 200) {
        setUserEmail(data.email);
        setEmailSent(true);
        toast.success("OTP sent to your email!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/verify-password-otp", { state: { email: userEmail } });
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <img className="h-12 w-auto" src={TextLogo} alt="ExamTime" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight gradient-text">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {emailSent
            ? "We've sent an OTP to your email"
            : "Enter your email to reset your password"}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card p-8">
          {!emailSent ? (
            <form
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                handleForgotPassword(data);
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
                    type="email"
                    autoComplete="email"
                    className="input-field"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
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
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ButtonLoader size="small" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  OTP has been sent to
                </p>
                <p className="text-sm font-semibold text-gray-900">{userEmail}</p>
              </div>

              <button
                onClick={handleContinue}
                className="btn-primary w-full"
              >
                Continue to Verify OTP
              </button>

              <button
                onClick={() => setEmailSent(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Change Email
              </button>
            </div>
          )}
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

export default ForgotPassword;

