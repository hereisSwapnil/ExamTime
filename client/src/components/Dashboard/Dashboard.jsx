import React, { useContext, useEffect, useState } from "react";
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
      return;
    }
    
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/get`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.isverified) {
          navigate("/verifyotp");
        } else {
          setUser(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        const errorMessage = err.response?.data?.message;
        if (
          errorMessage === "Unauthorized" ||
          errorMessage === "Failed to verify token" ||
          errorMessage === "User not found"
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setLoading(false);
        }
      });
  }, [navigate, setUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <DocGrid />
    </>
  );
};
export default Dashboard;
