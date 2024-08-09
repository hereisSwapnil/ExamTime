import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { UserContext } from "./Context/UserContext";

const MasterPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MasterPage;
