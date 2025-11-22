import React, { useContext, useState, useEffect } from "react";
import { Loader, ButtonLoader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useSelector } from "react-redux";
import lang from "../../utils/langaugeConstant";

const RequestPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const langKey = useSelector((store) => store.config.lang);
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

  const addRequest = async (data) => {
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/request`, data, config);
      toast.success("Request made successfully!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/");
    } catch (error) {
      console.error("Request error:", error);
      const errorMessage = error.response?.data?.message || "Failed to create request. Please try again.";
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
                <h1 className="text-3xl font-bold gradient-text mb-2">Request Notes</h1>
                <p className="text-gray-600">Can't find what you're looking for? Request it from the community</p>
              </div>
              <form
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  addRequest(data);
                })}
              >
                <div>
                  <label htmlFor="description" className="label">
                    {lang[langKey].Description}
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder={lang[langKey].RequestPlaceholder}
                    rows={8}
                    className="input-field resize-none"
                    {...register("description", {
                      required: "Description is required.",
                      maxLength: {
                        value: 250,
                        message: "Description should not exceed 250 characters.",
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
                        <span>Submitting request...</span>
                      </>
                    ) : (
                      lang[langKey].Request
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
export default RequestPage;
