import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router";
import TextLogo from "../../assets/blackLogo.png";
import { ButtonLoader } from "../Loader/Loader";

const VerifyPasswordOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

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

  const sendOTP = async () => {
    if (!email) return;
    
    setSendingOtp(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/user/forget-password`, {
        email: email,
      });
      toast.success("OTP resent to your email!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    } catch (err) {
      console.error("Error sending OTP:", err);
      const errorMessage = err.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerification = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

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
        `${import.meta.env.VITE_BASE_URL}/user/vefify-password-otp`,
        {
          email: email,
          otp: otp,
        }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        navigate("/reset-password", { state: { email: email } });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img className="h-12 w-auto" src={TextLogo} alt="ExamTime" />
        </div>
        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
              <svg
                className="h-8 w-8 text-indigo-600"
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
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Verify OTP
            </h1>
            <p className="text-gray-600">
              We&apos;ve sent a 6-digit code to your email. Please enter it below.
            </p>
            {email && (
              <p className="text-sm text-gray-500 mt-2">{email}</p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="label text-center block">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="000000"
                maxLength="6"
                pattern="\d{6}"
                title="Enter 6-digit OTP"
                className="input-field text-center text-2xl font-bold tracking-widest"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtp(value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && otp.length === 6) {
                    handleVerification();
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <button
              onClick={handleVerification}
              disabled={otp.length !== 6 || loading}
              className={`btn-primary w-full flex items-center justify-center gap-2 ${
                otp.length !== 6 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? (
                <>
                  <ButtonLoader size="small" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            <p className="text-sm text-center text-gray-600">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={sendOTP}
                disabled={sendingOtp}
                className={`font-semibold text-indigo-600 hover:text-indigo-700 ${
                  sendingOtp ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {sendingOtp ? (
                  <span className="flex items-center gap-1">
                    <ButtonLoader size="small" />
                    Sending...
                  </span>
                ) : (
                  "Resend"
                )}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPasswordOtp;

