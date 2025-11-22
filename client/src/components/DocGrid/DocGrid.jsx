import { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router";
import axios from "axios";
import MyImage from "../MyImage/MyImage";
import LikeButton from "../LikeButton/LikeButton";
import { Loader } from "../Loader/Loader";
import { CiBookmark } from "react-icons/ci";
import { toast, Bounce } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FcBookmark } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import lang from "../../utils/langaugeConstant";
import { useSelector } from "react-redux";

// const colleges = {
//   harvard: false,
//   stanford: false,
//   mit: false,
//   oxford: false,
//   cambridge: false,
//   yale: false,
//   princeton: false,
//   caltech: false,
//   chicago: false,
//   columbia: false,
//   other: false,
// };

const DocGrid = () => {
  const [open, setOpen] = useState(false);
  const [note_, setNote_] = useState({});
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const { user, getUser } = useContext(UserContext);
  const langKey = useSelector((store) => store.config.lang);

  console.log(user);

  const [notes, setNotes] = useState([]);

  const handleNoteClick = (note) => {
    setOpen(true);
    setNote_(note);
  };

  const fetchNotes = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/note${search}`,
        config
      );
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleBookMark = async (noteID) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note/bookmark/${noteID}`,
        null,
        config
      );
      getUser();
    } catch (err) {
      console.error("Error bookmarking note:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to update bookmark. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  };

  const fetchBookMarkedNotes = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/note/bookmarks`,
        config
      );
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching bookmarked notes:", error);
      toast.error("Failed to load bookmarked notes. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "BookMarked") {
      fetchBookMarkedNotes();
    } else {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (loading) {
    return <Loader />;
  }

  if (notes.length == 0 && activeTab == "All") {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Search and Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch">
            {/* Search Input */}
            <div className="flex-1 relative">
              <label
                htmlFor="search-input-empty"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {lang[langKey].Searchcourses}
              </label>
              <div className="flex rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
                <input
                  id="search-input-empty"
                  type="text"
                  className="flex-1 py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none border-0"
                  placeholder="Search for notes, subjects, courses..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const searchTerm = e.target.value;
                      window.location.href = `?search=${encodeURIComponent(
                        searchTerm
                      )}`;
                    }
                  }}
                />
                <button
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 flex items-center justify-center min-w-[80px]"
                  onClick={() => {
                    window.location.href = `?search=${encodeURIComponent(
                      searchInput
                    )}`;
                  }}
                >
                  {lang[langKey].Go}
                </button>
              </div>
            </div>

            {/* Doubts Button */}
            <div className="flex items-end">
              <Link to="./questionNotifications" className="w-full sm:w-auto">
                <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Doubts
                </button>
              </Link>
            </div>
          </div>

          <div className="text-center py-16">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {lang[langKey].NoResultsFound}
            </h2>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Search and Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch">
            {/* Search Input */}
            <div className="flex-1 relative">
              <label
                htmlFor="search-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {lang[langKey].Searchcourses}
              </label>
              <div className="flex rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
                <input
                  id="search-input"
                  type="text"
                  className="flex-1 py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none border-0"
                  placeholder="Search for notes, subjects, courses..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const searchTerm = e.target.value;
                      window.location.href = `?search=${encodeURIComponent(
                        searchTerm
                      )}`;
                    }
                  }}
                />
                <button
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 flex items-center justify-center min-w-[80px]"
                  onClick={() => {
                    window.location.href = `?search=${encodeURIComponent(
                      searchInput
                    )}`;
                  }}
                >
                  {lang[langKey].Go}
                </button>
              </div>
            </div>

            {/* Doubts Button */}
            <div className="flex items-end">
              <Link to="./questionNotifications" className="w-full sm:w-auto">
                <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Doubts
                </button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("All")}
              className={`flex-1 rounded-lg px-3 py-1 text-lg font-bold transition-all duration-200 ${
                activeTab === "All"
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              {lang[langKey].AllNotes}
            </button>
            <button
              onClick={() => setActiveTab("BookMarked")}
              className={`flex-1 rounded-lg px-3 py-1 text-lg font-bold transition-all duration-200 ${
                activeTab === "BookMarked"
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              {lang[langKey].BookMarkedNotes}
            </button>
          </div>

          <h2 className="text-3xl font-bold tracking-tight gradient-text mb-8">
            {lang[langKey].FindYourNotesHere}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                onClick={() => handleNoteClick(note)}
              >
                <div className="card overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                    <MyImage
                      src="https://farm4.staticflickr.com/3789/10177514664_0ff9a53cf8_z.jpg"
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                      <FaHeart className="text-red-500 text-sm" />
                      <span className="text-sm font-semibold text-gray-700">
                        {note.likes || 0}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex-1">
                      {note.subject?.subjectName}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Click to view
                      </span>
                      <svg
                        className="w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activeTab !== "All" && notes.length === 0 ? (
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {lang[langKey].NoBookMarkedNotes}
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-4xl md:px-4 lg:max-w-5xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100">
                    <button
                      type="button"
                      className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                      {/* Left Section - Preview Image */}
                      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden">
                        <img
                          src={
                            "https://farm4.staticflickr.com/3789/10177514664_0ff9a53cf8_z.jpg"
                          }
                          alt={note_?.title}
                          className="object-contain w-full h-full p-4"
                        />
                      </div>

                      {/* Right Section - Note Details */}
                      <div className="flex flex-col p-6 lg:p-8">
                        {/* Title */}
                        <div className="flex items-center">
                          <h2 className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-6">
                            {note_.title}
                          </h2>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <LikeButton noteId={note_?._id} />
                            </div>
                            <button
                              onClick={() => handleBookMark(note_._id)}
                              className="p-1"
                              aria-label="Bookmark"
                            >
                              {user?.bookMarkedNotes?.includes(note_._id) ? (
                                <FcBookmark className="text-3xl lg:text-4xl font-bold mb-6  hover:bg-gray-100 rounded transition-colors" />
                              ) : (
                                <CiBookmark className="text-3xl lg:text-4xl font-bold mb-6 pr-8 text-red-500 hover:text-red-600  hover:bg-gray-100 rounded transition-colors" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Details Section */}
                        <div className="space-y-4 flex-1">
                          {/* Subject */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                              {lang[langKey].Subject}:
                            </label>
                            <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-gray-700">
                              {note_.subject?.subjectName || "N/A"}
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                              {lang[langKey].Description}:
                            </label>
                            <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-gray-700 min-h-[60px]">
                              {note_.description || "No description available"}
                            </div>
                          </div>

                          {/* Year and Course Row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                {lang[langKey].Year}:
                              </label>
                              <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-gray-700">
                                {note_.year || "N/A"}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                {lang[langKey].Course}:
                              </label>
                              <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-gray-700">
                                {note_.course || "N/A"}
                              </div>
                            </div>
                          </div>

                          {/* Likes and Actions Section */}
                          <div className="space-y-4">
                            {/* Likes Label */}
                            <div className="flex mr-5 items-center">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                    {lang[langKey].Likes}:
                                  </span>
                                </label>

                                {/* Heart Icon with Count */}
                                <div className="flex items-center gap-2 mb-3">
                                  <FaHeart className="text-red-500 text-xl" />
                                  <span className="text-lg font-semibold text-gray-900">
                                    {note_.likes || 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer Section */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-4">
                            Uploaded by{" "}
                            <span className="font-semibold text-indigo-600">
                              @{note_.author?.username || "Unknown"}
                            </span>
                          </p>
                          <a
                            href={note_?.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary w-full flex items-center justify-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            {lang[langKey].Download}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DocGrid;
