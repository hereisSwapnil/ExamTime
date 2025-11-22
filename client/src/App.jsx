import React from "react";
import { UserContextProvider } from "./Context/UserContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UploadPage from "./components/UploadPage/UploadPage";
import RequestPage from "./components/RequestPage/RequestPage";
import VerifyOtp from "./components/OtpVerificationPage/verifyOtp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyPasswordOtp from "./components/ForgotPassword/VerifyPasswordOtp";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import Notifcation from "./components/NotifcationPage/Notifcation";
import Settings from "./components/Settings/Setting";
import Profile from "./components/Profile/Profile";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import QuestionNotifcation from "./components/QuestionPage/QuestionNotification";
import AnswerPage from "./components/QuestionPage/AnswerPage";
import MasterPage from "./MasterPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const AppContent = () => (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-password-otp" element={<VerifyPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<MasterPage />}>
          <Route index element={<Dashboard />} />
          <Route path="/notifications" element={<Notifcation />} />
          <Route
            path="/questionNotifications"
            element={<QuestionNotifcation />}
          />
          <Route path="/upload/:requestId" element={<UploadPage />} />
          <Route path="/answer/:requestId" element={<AnswerPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <Analytics />
      <SpeedInsights />
    </UserContextProvider>
  );

  // Only wrap with GoogleOAuthProvider if client ID is available
  if (googleClientId && googleClientId.trim() !== "") {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        <AppContent />
      </GoogleOAuthProvider>
    );
  }

  // If no client ID, render without Google OAuth provider
  // The Login and Signup components will handle missing client ID gracefully
  return <AppContent />;
}

export default App;
