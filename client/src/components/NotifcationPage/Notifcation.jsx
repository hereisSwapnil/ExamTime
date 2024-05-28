import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { Menu } from "@headlessui/react";
import { useSelector } from "react-redux";
import lang from "../../utils/langaugeConstant.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Notifcation = () => {
  const { user, setUser } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const langKey=useSelector((store)=>store.config.lang)

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const getRequests = () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/request`, config)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((error) => {
          toast.error("An error occurred", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="max-w-screen-sm mx-auto m-2 p-4">
        <h1 className="text-2xl font-semibold">{lang[langKey].Notifications}</h1>
        <div className="mt-4">
          {requests &&
            requests
              .slice()
              .reverse()
              .map((request, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 border-b-2"
                >
                  <p>{request?.description}</p>
                  <p className="text-[13px] text-end mt-1 text-blue-500">
                    Requested by: @{request?.author?.username}
                  </p>
                  <a
                    href={`/upload/${request?._id}`}
                    className="mt-1 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {lang[langKey].Contribute}
                  </a>
                </div>
              ))}
        </div>
      </main>
    </>
  );
};
export default Notifcation;
