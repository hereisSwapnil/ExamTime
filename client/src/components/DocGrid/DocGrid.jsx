import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router";
import axios from "axios";
import MyImage from "../MyImage/MyImage";
import LikeButton from "../LikeButton/LikeButton";
import { Loader } from "../Loader/Loader";
import { CiBookmark } from "react-icons/ci";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FcBookmark } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

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
  const [selectedColleges, setSelectedColleges] = useState({});
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const { user, setUser, getUser } = useContext(UserContext);

  console.log(user);

  const [notes, setNotes] = useState([]);

  const handleNoteClick = (note) => {
    setOpen(true);
    setNote_(note);
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/note${search}`,
      config
    );
    setNotes(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleBookMark = (noteID) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/note/bookmark/${noteID}`,
        null,
        config
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        getUser();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const fetchBookMarkedNotes = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/note/bookmarks`,
      config
    );
    setNotes(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "BookMarked") {
      fetchBookMarkedNotes();
    } else {
      fetchNotes();
    }
  }, [activeTab]);

  if (loading) {
    return <Loader />;
  }

  if (notes.length == 0 && activeTab == "All") {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-4">
          <div className="flex rounded-md overflow-hidden w-full">
            <input
              type="text"
              className="w-full rounded-md mt-3 mb-10 rounded-r-none text-black pl-4"
              placeholder="Search courses"
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
              className="rounded-md mt-3 mb-10 rounded-l-none pl-4 bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md"
              onClick={() => {
                window.location.href = `?search=${encodeURIComponent(
                  searchInput
                )}`;
              }}
            >
              Go
            </button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            No Results Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-4">
        <div className="flex gap-6 mb-2">
          <div className="flex rounded-md overflow-hidden w-full">
            <input
              type="text"
              className="w-full rounded-md mt-3 mb-10 rounded-r-none text-black pl-4"
              placeholder="Search courses"
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
              className="rounded-md mt-3 mb-10 rounded-l-none pl-4 bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md"
              onClick={() => {
                window.location.href = `?search=${encodeURIComponent(
                  searchInput
                )}`;
              }}
            >
              Go
            </button>
            </div>
            <Link to="./questionNotifications">
            <button
              className="rounded-md mt-3 mb-10 pl-4 bg-indigo-600 text-white px-6 text-lg font-semibold py-4"
            >
              Doubts
            </button>
            </Link>
            </div>
          <div className="flex gap-2 mb-2">
            <div
              onClick={() => {
                setActiveTab("All");
              }}
              className={`flex-1 border-2 ${
                activeTab === "All"
                  ? "bg-indigo-600 text-white"
                  : "border-black"
              } rounded-lg p-2 `}
            >
              <h2 className="text-2xl font-bold tracking-tight  justify-center flex text-center">
                All Notes
              </h2>
            </div>
            <div
              onClick={() => {
                setActiveTab("BookMarked");
              }}
              className={`flex-1 border-2 ${
                activeTab === "BookMarked"
                  ? "bg-indigo-600 text-white"
                  : "border-black"
              } rounded-lg p-2 `}
            >
              <h2 className="text-2xl font-bold tracking-tight first-center justify-center flex text-center">
                BookMarked Notes
              </h2>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Find Your Notes Here
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {notes.map((note, index) => (
              <div
                key={index}
                className="group relative hover:cursor-pointer"
                onClick={() => handleNoteClick(note)}
              >
                <div className="text-center shadow-xl rounded-lg bg-white py-2 px-2 bg-slate-100">
                  <div className="aspect-h-1 aspect-w-1 flex items-center w-full overflow-hidden bg-gray-800 lg:aspect-none group-hover:opacity-50 lg:h-80">
                    <MyImage
                      src={note.thumbnail}
                      alt={note.thumbnail}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg text-gray-800 font-bold">
                      <p>{note.title}</p>
                    </h3>
                    <p className="mt-1 pb-2 text-base text-gray-700">
                      {note.subject.subjectName}
                    </p>
                  </div>
                  <div className="mt-auto flex justify-center items-center">
                    {note.likes > 0 ? (
                      <p className="flex items-center">
                        <FaHeart className="text-red-500 mr-1" />
                        {note.likes}
                      </p>
                    ) : (
                      <p className="flex items-center">
                        <FaHeart className="text-red-500 mr-1" />0
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activeTab !== "All" && notes.length === 0 ? (
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              No BookMarked Notes
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
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-200 sm:col-span-4 lg:col-span-5">
                        <img
                          src={note_.thumbnail}
                          alt={note_.thumbnail}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7 flex flex-col justify-between h-full">
                        <section
                          aria-labelledby="information-heading"
                          className="mt-2 gap-4 flex flex-col"
                        >
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                            {note_.title}
                          </h2>
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Subject:</span>{" "}
                            {note_.subject?.subjectName}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Description:</span>{" "}
                            {note_.description}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Year:</span>{" "}
                            {note_.year}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Course:</span>{" "}
                            {note_.course}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Likes:</span>{" "}
                            {note_.likes}
                          </p>
                          <div className="flex gap-2 ">
                            <div style={{ width: "22px" }}>
                              <LikeButton noteId={note_?._id} />
                            </div>
                            <div style={{ width: "40px" }}>
                              {user?.bookMarkedNotes?.includes(note_._id) ? (
                                <FcBookmark
                                  onClick={() => handleBookMark(note_._id)}
                                  className="text-2xl cursor-pointer"
                                />
                              ) : (
                                <CiBookmark
                                  onClick={() => handleBookMark(note_._id)}
                                  className="text-2xl cursor-pointer"
                                />
                              )}
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="">
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>
                          <p className="text-sm mt-8 text-gray-700">
                            Uploaded by{" "}
                            <a
                              href="#"
                              className="hover:underline hover:text-gray-900"
                            >
                              @{note_.author?.username}
                            </a>
                          </p>
                          <a
                            type="submit"
                            className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            href={note_?.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download
                          </a>
                        </section>
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
