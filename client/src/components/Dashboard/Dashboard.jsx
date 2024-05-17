import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import DocGrid from "../DocGrid/DocGrid";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";
import axios from "axios";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/get`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.isverified) {
          navigate("/verifyotp");
        } else {
          setUser(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (
          err.response.data.message === "Unauthorized" ||
          err.response.data.message === "Failed to verify token" ||
          err.response.data.message === "User not found"
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, []);

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
