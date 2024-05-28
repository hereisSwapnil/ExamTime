import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";

const AnswerPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Storing the request id from the route path(may or may not be present)
  const { questionId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const answerQuestion = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      //handle answers

      // After successful upload


      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form
              className="py-6 px-9"
              onSubmit={handleSubmit((data) => {
                answerQuestion(data);
              })}
            >
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Question
                </label>
                {errors.title && (
                  <p
                    className="text-sm text-red-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: errors.title.message,
                    }}
                  ></p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Write your Answer
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="answer of the question is...."
                  rows={10}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("description", {
                    required: "Description is required.",
                    maxLength: {
                      value: 250,
                      message: "Description should not exceed 250 characters.",
                    },
                  })}
                />
                {errors.description && (
                  <p
                    className="text-sm text-red-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: errors.description.message,
                    }}
                  ></p>
                )}
              </div>

              <div>
                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Submit your Answer
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};
export default AnswerPage;
