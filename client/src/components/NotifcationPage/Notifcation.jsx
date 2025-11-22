import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import { Menu } from "@headlessui/react";
import { useSelector } from "react-redux";
import lang from "../../utils/langaugeConstant.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Notifcation = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const langKey = useSelector((store) => store.config.lang);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const getRequests = async () => {
    setRequestsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/request`, config);
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      const errorMessage = error.response?.data?.message || "Failed to load notifications. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
      setRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">{lang[langKey].Notifications}</h1>
            <p className="text-gray-600">View and respond to note requests from the community</p>
          </div>

          {requestsLoading ? (
            <div className="card p-12 text-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Loading notifications...</p>
              </div>
            </div>
          ) : requests && requests.length === 0 ? (
            <div className="card p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-gray-500 text-lg">No notifications yet</p>
              <p className="text-gray-400 text-sm mt-2">When someone requests notes, they&apos;ll appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests &&
                requests
                  .slice()
                  .reverse()
                  .map((request, index) => (
                    <div
                      key={index}
                      className="card p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium mb-3">{request?.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Requested by <span className="font-semibold text-indigo-600">@{request?.author?.username}</span></span>
                          </div>
                        </div>
                        <a
                          href={`/upload/${request?._id}`}
                          className="btn-primary whitespace-nowrap"
                        >
                          {lang[langKey].Contribute}
                        </a>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Notifcation;
