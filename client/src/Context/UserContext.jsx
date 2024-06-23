import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader/Loader";
import { useNavigate , useParams } from "react-router-dom";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const id= window.location.pathname
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  if (!token ) {
    if(id!='/login' && id!='/signup'){
      
      navigate("/login");
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get`,
        config
      );
      console.log(res.data);
      if (res.data.isverified === true) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
