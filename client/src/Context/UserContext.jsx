import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  const getUser = async () => {
    if (token) {
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
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
