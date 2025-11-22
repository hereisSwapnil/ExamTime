import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Public routes that don't require authentication
  const publicRoutes = [
    "/login",
    "/signup",
    "/verifyotp",
    "/forgot-password",
    "/verify-password-otp",
    "/reset-password",
  ];
  const isPublicRoute = publicRoutes.includes(location.pathname.toLowerCase());

  const getUser = async () => {
    const token = localStorage.getItem("token");
    
    // If no token and not on a public route, redirect to login
    if (!token) {
      if (!isPublicRoute) {
        navigate("/login");
      }
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get`,
        config
      );
      if (res.data.isverified === true) {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      const errorMessage = error.response?.data?.message;
      if (
        errorMessage === "Unauthorized" ||
        errorMessage === "Failed to verify token" ||
        errorMessage === "User not found"
      ) {
        localStorage.removeItem("token");
        // Only redirect if not already on a public route
        const currentPath = location.pathname.toLowerCase();
        if (!publicRoutes.includes(currentPath)) {
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Don't show loader on public routes
  if (loading && !isPublicRoute) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
