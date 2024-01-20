import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import DocGrid from "../DocGrid/DocGrid";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    console.log(user);
  }, []);

  return (
    <>
      <Navbar />
      <DocGrid />
    </>
  );
};
export default Dashboard;
