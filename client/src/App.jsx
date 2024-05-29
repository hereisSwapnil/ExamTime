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
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import Notifcation from "./components/NotifcationPage/Notifcation";
import Settings from "./components/Settings/Setting";
import About from "./components/About/About";
import Privacy from "./components/Privacy/Privacy";
import Licensing from "./components/Licensing/Licensing";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifcation />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
        <Footer />
      </UserContextProvider>
    </>
import QuestionPage from "./components/QuestionPage/QuestionPage";
import QuestionNotifcation from "./components/QuestionPage/QuestionNotification";
import AnswerPage from "./components/QuestionPage/AnswerPage";
import MasterPage from "./MasterPage";

function App() {
  return (
    <UserContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verifyOtp" element={<VerifyOtp />} />
            
            <Route path="/" element={<MasterPage/>}>
              <Route index element={<Dashboard />}/>
              <Route path="/notifications" element={<Notifcation />} />
              <Route path="/questionNotifications" element={<QuestionNotifcation />} />
              <Route path="/upload/:requestId" element={<UploadPage />} />
              <Route path="/answer/:requestId" element={<AnswerPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/question" element={<QuestionPage />} />  
              <Route path="/request" element={<RequestPage />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
          <Analytics />
          <SpeedInsights />
    </UserContextProvider>
  );
}

export default App;
