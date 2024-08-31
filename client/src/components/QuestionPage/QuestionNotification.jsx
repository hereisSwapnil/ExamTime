import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const QuestionNotifcation = () => {
  const { user, setUser } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const getQuestion = () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/question`, config)
        .then((ques) => {
          setQuestions(ques.data);
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
    getQuestion();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="max-w-screen-sm mx-auto m-2 p-4">
        <h1 className="text-2xl font-semibold">Questions...</h1>
        <div className="mt-4">
          {questions &&
            questions
              .slice()
              .reverse()
              .map((question, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 border-b-2"
                >
                  <p>{question?.description}</p>
                  <p className="text-[13px] text-end mt-1 text-blue-500">
                    Asked by: @{question?.author?.username}
                  </p>
                  <a
                    href={`/answer/${question?._id}`}
                    className="mt-1 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Ans
                  </a>
                </div>
              ))}
        </div>
      </main>
    </>
  );
};
export default QuestionNotifcation;
