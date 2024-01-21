import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";

const UploadPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFileSeleted, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    setSelectedFile(file);
    setIsFileSelected(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getSubjects();
    setLoading(false);
  }, [user, navigate]);

  const getSubjects = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/subject`, {
        withCredentials: true,
      })
      .then((res) => {
        setSubjects(res.data);
      });
  };

  const uploadNotes = async (data) => {
    console.log(selectedFile);
    if (selectedFile.length == 0) {
      console.log("no file selected");
      setIsFileSelected(false);
      return;
    }
    console.log(data);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form
              className="py-6 px-9"
              onSubmit={handleSubmit((data) => {
                uploadNotes(data);
              })}
            >
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="COA Notes Btech. 2nd Year"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("title", {
                    required: "Title is required.",
                    minLength: {
                      value: 8,
                      message: "Title should be a minimum of 8 characters.",
                    },
                  })}
                />
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
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Handwritten COA notes with all units complete"
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

              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Subject
                </label>
                <select
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="COA Notes Btech. 2nd Year"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("subject", {
                    required: "Please select a subject.",
                  })}
                >
                  {subjects &&
                    subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.subjectName}
                      </option>
                    ))}
                </select>
                {errors.subject && (
                  <p
                    className="text-sm text-red-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: errors.subject.message,
                    }}
                  ></p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="course"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  placeholder="Btech."
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("course", {
                    required:
                      "Please enter a course for which these notes are for.",
                  })}
                />
                {errors.course && (
                  <p
                    className="text-sm text-red-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: errors.course.message,
                    }}
                  ></p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="year"
                  className="mb-3 block text-base font-small text-[#07074D]"
                >
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  placeholder="Year"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("year", {
                    required: "Enter a year of college these notes are for.",
                  })}
                />
                {errors.year && (
                  <p
                    className="text-sm text-red-500 mt-1"
                    dangerouslySetInnerHTML={{
                      __html: errors.year.message,
                    }}
                  ></p>
                )}
              </div>

              <div className="mb-6 pt-4 cursor-pointer">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload File
                </label>

                <div className="mb-8 cursor-pointer">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                    className="sr-only cursor-pointer"
                    multiple={false}
                  />
                  <label
                    htmlFor="file"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div className="cursor-pointer">
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        {selectedFile.name || "Drop files here"}
                      </span>
                      <span className="mb-2 block text-base font-small text-[#6B7280]">
                        Or
                      </span>
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-small text-[#07074D]">
                        Browse
                      </span>
                    </div>
                  </label>
                </div>

                {selectedFile && isFileSeleted ? (
                  ""
                ) : (
                  <p className="text-sm text-red-500 mt-1">
                    Please select a file to upload
                  </p>
                )}

                {selectedFile.name && (
                  <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-small text-[#07074D]">
                        {selectedFile?.name || "wef"}
                      </span>
                      <button
                        className="text-[#07074D]"
                        onClick={() => setSelectedFile([])}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Upload Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default UploadPage;
