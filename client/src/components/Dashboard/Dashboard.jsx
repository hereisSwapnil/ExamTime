import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import DocGrid from "../DocGrid/DocGrid";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <DocGrid />
    </>
  );
};
export default Dashboard;
