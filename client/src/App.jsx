import { Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UploadPage from "./components/UploadPage/UploadPage";
import RequestPage from "./components/RequestPage/RequestPage";
import { UserContextProvider } from "./Context/UserContext";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
