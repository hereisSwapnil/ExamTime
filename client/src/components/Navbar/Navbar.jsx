import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, Button } from "@material-tailwind/react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const loc = useLocation().pathname;
  const [uploadNav, setUploadNav] = useState(false);
  const [requestNav, setRequestNav] = useState(false);
  const [questionNav, setQuestionNav] = useState(false);
  const [leaderBoardNav, setleaderBoardNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigation = [
    { name: "Upload Notes", href: "/upload", current: uploadNav },
    { name: "Request Notes", href: "/request", current: requestNav },
    { name: "Ask a Question", href: "/question", current: questionNav },
    { name: "Leaderboard", href: "/leaderboard", current: leaderBoardNav },
  ];
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const handleSignout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };

  const getRequests = () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      if (token) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
    if (loc === "/request") {
      setRequestNav(true);
      setUploadNav(false);
    } else if (loc === "/upload") {
      setRequestNav(false);
      setUploadNav(true);
    } else if (loc === "/question") {
      setRequestNav(false);
      setUploadNav(false);
      setQuestionNav(true);
    } else if (loc === "/leaderboard") {
      setleaderBoardNav(true);
      setRequestNav(false);
      setUploadNav(false);
    }
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center">
                <div className="flex ml-[10px] flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-auto w-[150px]"
                      src="https://i.postimg.cc/m2qJB5J2/logo-1.png"
                      alt="Exam Time"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block self-center">
                  <div className="flex">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white flex gap-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white flex gap-2",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name === "Upload Notes" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                            />
                          </svg>
                        ) : item.name === "Ask a Question" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-question-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                          </svg>
                        ) : item.name === "Leaderboard" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492c.963-.203 1.934-.377 2.916-.52M4.5 15.75v6.75c0 1.035.84 1.875 1.875 1.875h9.75c1.035 0 1.875-.84 1.875-1.875v-6.75m-12.75 0h15m-9.75 0a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        )}
                        {item?.name}
                      </Link>
                    ))}

                    <div className="text-gray-200  mt-2 ml-2">
                      Coins:{user?.coins}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex gap-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-gray-400 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <Badge color="red">
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </Badge>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute w-[60vw] md:w-[30vw] right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {requests
                        .slice(0, 4)
                        .reverse()
                        .map((request, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 border-b-2"
                                )}
                              >
                                <p>{request?.description}</p>
                                <p className="text-[13px] text-end">
                                  @{request?.author?.username}
                                </p>
                              </a>
                            )}
                          </Menu.Item>
                        ))}

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/notifications"
                            className={classNames(
                              active ? "underline" : "",
                              "block px-4 py-2 text-sm text-end text-blue-700"
                            )}
                          >
                            View more...
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.userPhoto}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={handleSignout}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
