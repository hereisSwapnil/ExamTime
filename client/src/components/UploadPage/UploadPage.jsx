import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase/firebase";
import { toast, Bounce } from "react-toastify";

const UploadPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFileSeleted, setIsFileSelected] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [addSubject_, setAddSubject_] = useState("");

  // Storing the request id from the route path(may or may not be present)
  const { requestId } = useParams();
  
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
    setIsFileSelected(true);
    uploadFile(file, (fileUrl) => {
      setFileUrl(fileUrl); 
    });
  };

 

  const addSubject = () => {
    if (addSubject_ === "") {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/subject`,
          { subjectName: addSubject_ },
          config
        )
        .then((res) => {
          getSubjects();
        });
      toast.success("Subject added successfully", {
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
      setAddSubject_("");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (file, callback) => {
    const storageRef = ref(storage, "notes/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setFileUploadProgress(0);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(Math.trunc(progress));
      },
      (error) => {
        // Handle errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          callback(downloadURL); // Call the callback function with the file URL
        });
      }
    );
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log("file: ",file);
  //   setSelectedFile(file);
  //   setIsFileSelected(true);
  //   uploadFile(file);
  // };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
    uploadFile(file, (fileUrl) => {
      // Callback function called with the file URL
      // console.log("File URL:", fileUrl); // Example: Log the file URL to the console
      setFileUrl(fileUrl); // Update state with the file URL if needed
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getSubjects();
    setLoading(false);
  }, [user, navigate]);

  const getSubjects = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/subject`, config)
      .then((res) => {
        setSubjects(res.data);
      });
  };

  const deleteRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      // Make a DELETE request to delete the request with the given requestId
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/request/delete/${requestId}`,
        config
      );
      console.log(`Request with ID ${requestId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting request with ID ${requestId}:`, error);
    }
  };

  const uploadNotes = async (data) => {
    try {
      if (selectedFile.length == 0) {
        setIsFileSelected(false);
        return;
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note`,
        {
          title: data.title,
          description: data.description,
          subject: data.subject,
          year: data.year,
          course: data.course,
          fileUrl: fileUrl,
        },
        config
      );
  
      // After successful upload
      if (requestId) {
        // If requestId is present, delete the associated request
        await deleteRequest(requestId);
      }
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
          <div className="mx-auto bg-white">
            <form
              className="py-6 px-9"
              onSubmit={handleSubmit((data) => {
                uploadNotes(data);
              })}
            >
            <div className="flex flex-col lg:flex-row gap-6">
              <div>
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-semibold text-[#07074D]"
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
                  className="mb-3 block text-base font-semibold text-[#07074D]"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Handwritten COA notes with all units complete"
                  rows={3}
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
                  className="mb-3 block text-base font-semibold text-[#07074D]"
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

              <div className="mb-5 mt-10">
                <label
                  htmlFor="subject"
                  className="mb-1 block text-base text-[14px] text-red-500"
                >
                  Didn't find the subject add your own
                </label>
                <div className="flex flex-col md:flex-row justify-center gap-5">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={addSubject_}
                    onChange={(e) => setAddSubject_(e.target.value)}
                    placeholder="Add a subject..."
                    className="rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-small text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  ></input>
                  <div
                    className="hover:shadow-form rounded-md cursor-pointer bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none"
                    onClick={addSubject}
                  >
                    Add Subject
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
              <div className="mb-5">
                <label
                  htmlFor="course"
                  className="mb-3 block text-base font-semibold text-[#07074D]"
                >
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  placeholder="BTech IT"
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
                  className="mb-3 block text-base font-semibold text-[#07074D]"
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
              </div>
              </div>

              <div>
              <div className="mb-6 pt-4 cursor-pointer lg:w-96">
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
                    accept="application/pdf"
                  />
                  <label
                    htmlFor="file"
                    className={`relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center ${
                      isDragging && 'border-2 border-green-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="cursor-pointer">
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        {selectedFile.name || 'Drop File here'}
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
                    Please select a file to upload <br /> Allowed format - .pdf
                  </p>
                )}

                {selectedFile.name && (
                  <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-small text-[#07074D]">
                        {selectedFile?.name || "No file selected"}
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

                    {fileUploadProgress != 100 ? (
                      <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                        <div
                          style={{ width: `${fileUploadProgress}%` }}
                          className={`hover:shadow-form rounded-md bg-[#6A64F1] py-1 px-8 text-center text-base font-semibold text-white outline-none`}
                        ></div>
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="green"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>

              <div>
                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Upload Notes
                </button>
              </div>
              </div>
              </div>
            </form>
          </div>
        </div>
      
    </>
  );
};
export default UploadPage;
