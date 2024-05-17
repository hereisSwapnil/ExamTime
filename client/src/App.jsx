import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UploadPage from "./components/UploadPage/UploadPage";
import RequestPage from "./components/RequestPage/RequestPage";
import { UserContextProvider } from "./Context/UserContext";
import VerifyOtp from "./components/OtpVerificationPage/verifyOtp";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Notifcation from "./components/NotifcationPage/Notifcation";
import Footer from "./components/Footer";
import Settings from "./components/Settings/Setting";

function App() {
  return (
    <UserContextProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notifications" element={<Notifcation />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Analytics />
          <SpeedInsights />
        </div>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
