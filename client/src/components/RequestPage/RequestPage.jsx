import React, { useContext, useState, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useSelector } from "react-redux";
import lang from "../../utils/langaugeConstant";

const RequestPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/request`, data, config)
      .then((res) => {
        toast.success("Request made successfully!", {
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
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
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
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center justify-center dark:bg-gray-900">
        <div className="mx-auto w-full max-w-[550px] bg-white dark:bg-gray-800">
          <form
            className="py-6 px-9"
            onSubmit={handleSubmit((data) => {
              addRequest(data);
            })}
          >
            <h2 className="text-xl md:text-2xl mb-[50px] font-bold tracking-tight text-gray-900 dark:text-gray-200">
              {lang[langKey].Requestnoteshere}...
            </h2>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-small text-[#07074D] dark:text-gray-200"
              >
                {lang[langKey].Description}
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder={lang[langKey].RequestPlaceholder}
                rows={10}
                className="w-full rounded-md border border-[#e0e0e0] bg-white dark:bg-gray-700 py-3 px-6 text-base font-small text-[#6B7280] dark:text-gray-200 outline-none focus:border-[#6A64F1] focus:shadow-md"
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
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none dark:bg-[#6A64F1] dark:hover:bg-indigo-600">
                {lang[langKey].Request}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RequestPage;
