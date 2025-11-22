import React, { useEffect, useState } from "react";
import axios from "axios";
import lang from "../../utils/langaugeConstant";
import { useSelector } from "react-redux";
import { Loader, SkeletonLoader } from "../Loader/Loader";
import { toast, Bounce } from "react-toastify";

const LeaderBoardTable = () => {
  const [leaderData, setLeaderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const langKey = useSelector((store) => store.config.lang);

  const fetchLeaderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/leaderboard`
      );
      if (response.status === 200) {
        setLeaderData(response.data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to load leaderboard. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
      setLeaderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderData();
  }, []);

  const totalItems = leaderData.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const Pagination = () => (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
        }`}
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        {lang[langKey].First}
      </button>
      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {lang[langKey].Prev}
      </button>
      <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg">
        {lang[langKey].Page} {currentPage} {lang[langKey].of} {totalPages}
      </span>
      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {lang[langKey].Next}
      </button>
      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
        }`}
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        {lang[langKey].Last}
      </button>
    </div>
  );

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold shadow-lg">
          🥇
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-white font-bold shadow-lg">
          🥈
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold shadow-lg">
          🥉
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold">
        {rank}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SkeletonLoader className="h-10 w-64 mb-2" />
            <SkeletonLoader className="h-5 w-96" />
          </div>
          <div className="card overflow-hidden p-8">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonLoader key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">{lang[langKey].Leaderboard}</h1>
          <p className="text-gray-600">Top contributors and most active users</p>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">{lang[langKey].Rank}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">{lang[langKey].ProfilePhoto}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">{lang[langKey].Username}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">{lang[langKey].Coins}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">{lang[langKey].Notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((user, index) => {
                  const rank = indexOfFirstItem + index + 1;
                  const isTopThree = rank <= 3;
                  return (
                    <tr
                      key={user._id}
                      className={`hover:bg-indigo-50 transition-colors ${
                        isTopThree ? "bg-gradient-to-r from-indigo-50 to-purple-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        {getRankBadge(rank)}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={user.userPhoto}
                          alt={user.username}
                          className="w-12 h-12 rounded-full ring-2 ring-indigo-200 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">@{user.username}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-bold text-gray-900">{user.coins || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {user.notes?.length || 0} {lang[langKey].Notes}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {leaderData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No leaderboard data available yet.</p>
            </div>
          )}
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default LeaderBoardTable;
