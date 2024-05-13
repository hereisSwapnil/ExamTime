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
          <Route path="/verifyOtp" element={<VerifyOtp/>} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </UserContextProvider>
    </>
  );
}

export default App;
