import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader/Loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/get`, {
        withCredentials: true,
      });
      // console.log(res.data);
      setUser(res.data);
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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
