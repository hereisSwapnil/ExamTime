import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import TextLogo from "../../assets/blackLogo.png";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const Navigate = useNavigate();

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verifyOtp`,
        {
          email: email,
          otp: otp,
        }
      );

      // Display success toast

      toast.success("OTP verification successful");
        console.log("Verification successful:", response.data);
        Navigate("/login");
    } catch (error) {
      // Display error toast
      toast.error("Failed to verify OTP");
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img className="h-12 mb-8" src={TextLogo} alt="ExamTime" />
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter OTP"
          maxLength="6"
          pattern="\d{6}"
          title="Enter 6-digit OTP"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerification}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
