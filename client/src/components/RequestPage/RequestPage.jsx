import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const RequestPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      <Navbar />
      <div>
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form
              className="py-6 px-9"
              onSubmit={handleSubmit((data) => {
                addRequest(data);
              })}
            >
              <h2 className="text-xl md:text-2xl mb-[50px] font-bold tracking-tight text-gray-900">
                Request notes here...
              </h2>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="I am in need of COA notes for Btech. 2nd year..."
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
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RequestPage;
