import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import DocGrid from "../DocGrid/DocGrid";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    setLoading(false);

    if (!user) {
      navigate("/login");
    }
    console.log(user);
  }, [user, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <DocGrid />
    </>
  );
};
export default Dashboard;
