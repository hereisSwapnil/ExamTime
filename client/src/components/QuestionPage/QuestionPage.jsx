import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Loader, ButtonLoader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const QuestionPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const askQuestion = async (data) => {
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/question`, data, config);
      toast.success("Question submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/questionNotifications");
    } catch (error) {
      console.error("Question error:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit question. Please try again.";
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
                <h1 className="text-3xl font-bold gradient-text mb-2">Ask a Question</h1>
                <p className="text-gray-600">Get help from the community with your study questions</p>
              </div>
              <form
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  askQuestion(data);
                })}
              >
                <div className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 hover:border-indigo-300 transition-colors">
                  <img
                    src={user?.userPhoto}
                    alt={`profile-${user?.username}`}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-200"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="label">
                    Your Question
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Ask a study question and get an answer in seconds..."
                    rows={8}
                    className="input-field resize-none"
                    {...register("description", {
                      required: "Question is required.",
                      maxLength: {
                        value: 250,
                        message: "Question should not exceed 250 characters.",
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
                        <span>Submitting question...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Submit Question
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
export default QuestionPage;
