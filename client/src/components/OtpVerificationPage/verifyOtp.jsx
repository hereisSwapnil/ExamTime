import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router";
import TextLogo from "../../assets/blackLogo.png";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/homepage");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/sendotp`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("OTP sent!", {
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
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to send OTP", {
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
      });
  }, []);

  const handleVerification = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verifyOtp`,
        {
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("OTP verified successfully", {
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
      console.log("Verification successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Invalid OTP") {
        toast.error(error.response.data.message, {
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
      } else if (error.response.data.message === "User not found") {
        toast.error(error.response.data.message, {
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
      } else {
        toast.error(error.response.data.message, {
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
        {/* <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
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
