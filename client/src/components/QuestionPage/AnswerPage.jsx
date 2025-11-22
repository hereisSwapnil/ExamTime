import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Loader, ButtonLoader } from "../Loader/Loader";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";

const AnswerPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Storing the question id from the route path
  const { questionId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const answerQuestion = async (data) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/question/answer/${questionId}`,
        { answer: data.description },
        config
      );

      toast.success("Answer submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/questionNotifications");
    } catch (error) {
      console.error("Error submitting answer:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit answer. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen py-12">
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-2xl">
            <div className="card p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold gradient-text mb-2">Answer Question</h1>
                <p className="text-gray-600">Share your knowledge and help others learn</p>
              </div>
              <form
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  answerQuestion(data);
                })}
              >
                <div>
                  <label htmlFor="description" className="label">
                    Your Answer
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Write a detailed answer to help the community..."
                    rows={10}
                    className="input-field resize-none"
                    {...register("description", {
                      required: "Answer is required.",
                      maxLength: {
                        value: 500,
                        message: "Answer should not exceed 500 characters.",
                      },
                    })}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <ButtonLoader size="small" />
                        <span>Submitting answer...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Submit Answer
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AnswerPage;
