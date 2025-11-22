import React, { useContext, useState, useEffect } from "react";
import { Loader, ButtonLoader } from "../Loader/Loader";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import storage from "../../firebase/firebase";
import { toast, Bounce } from "react-toastify";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import lang from "../../utils/langaugeConstant";
import { useSelector } from "react-redux";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const langKey = useSelector((store) => store.config.lang);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFileSeleted, setIsFileSelected] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [addSubject_, setAddSubject_] = useState("");

  // Storing the request id from the route path(may or may not be present)
  const { requestId } = useParams();

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

  const createThumbnailFromPDF = async (pdf) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjs.getDocument({ data: typedarray }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;

          const thumbnailDataUrl = canvas.toDataURL("image/png");
          setThumbnailURL(thumbnailDataUrl);
        } catch (error) {
          console.error("Error processing PDF file: ", error);
        }
      };
      fileReader.readAsArrayBuffer(pdf);
    } catch (error) {
      console.error("Error reading file: ", error);
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
      async () => {
        try {
          const blob = await getBlob(uploadTask.snapshot.ref);
          await createThumbnailFromPDF(blob);
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUrl(downloadURL);
          callback(downloadURL);
        } catch (error) {
          console.error(
            "Error creating thumbnail or getting download URL:",
            error
          );
        }
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

  const getSubjects = async () => {
    setSubjectsLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/subject`,
        config
      );
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects. Please refresh the page.", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setSubjectsLoading(false);
    }
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
    if (!selectedFile || selectedFile.length === 0) {
      setIsFileSelected(false);
      toast.error("Please select a file to upload", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    if (fileUploadProgress !== 100) {
      toast.warning("Please wait for the file to finish uploading", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

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
        `${import.meta.env.VITE_BASE_URL}/note`,
        {
          title: data.title,
          description: data.description,
          subject: data.subject,
          year: data.year,
          course: data.course,
          fileUrl: fileUrl,
          thumbnail: thumbnailURL,
        },
        config
      );

      // After successful upload
      if (requestId) {
        try {
          await deleteRequest(requestId);
        } catch (error) {
          console.error("Error deleting request:", error);
        }
      }

      toast.success("Notes uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/");
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to upload notes. Please try again.";
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
                <h1 className="text-3xl font-bold gradient-text mb-2">
                  Upload Notes
                </h1>
                <p className="text-gray-600">
                  Share your study materials with the community
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  uploadNotes(data);
                })}
              >
                <div>
                  <label htmlFor="title" className="label">
                    {lang[langKey].Title}
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder={lang[langKey].uploadPlaceholder}
                    className="input-field"
                    {...register("title", {
                      required: "Title is required.",
                      minLength: {
                        value: 8,
                        message: "Title should be a minimum of 8 characters.",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="label">
                    {lang[langKey].Description}
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder={lang[langKey].uploadDescPlace}
                    rows={6}
                    className="input-field resize-none"
                    {...register("description", {
                      required: "Description is required.",
                      maxLength: {
                        value: 250,
                        message:
                          "Description should not exceed 250 characters.",
                      },
                    })}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="label">
                    {lang[langKey].Subject}
                  </label>
                  {subjectsLoading ? (
                    <div className="input-field flex items-center justify-center py-3">
                      <ButtonLoader size="small" />
                      <span className="ml-2 text-gray-600 text-sm">
                        Loading subjects...
                      </span>
                    </div>
                  ) : (
                    <select
                      name="subject"
                      id="subject"
                      className="input-field"
                      {...register("subject", {
                        required: "Please select a subject.",
                      })}
                    >
                      <option value="">Select a subject</option>
                      {subjects &&
                        subjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.subjectName}
                          </option>
                        ))}
                    </select>
                  )}
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <label className="label text-indigo-700">
                    {lang[langKey].noSubUp}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={addSubject_}
                      onChange={(e) => setAddSubject_(e.target.value)}
                      placeholder={lang[langKey].AddSubject}
                      className="input-field flex-1"
                    />
                    <button
                      type="button"
                      onClick={addSubject}
                      className="btn-secondary whitespace-nowrap"
                    >
                      {lang[langKey].AddSubject}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course" className="label">
                      {lang[langKey].Course}
                    </label>
                    <input
                      type="text"
                      name="course"
                      id="course"
                      placeholder="e.g., B.Tech, B.Sc"
                      className="input-field"
                      {...register("course", {
                        required: "Please enter a course.",
                      })}
                    />
                    {errors.course && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="year" className="label">
                      {lang[langKey].Year}
                    </label>
                    <input
                      type="number"
                      name="year"
                      id="year"
                      placeholder="e.g., 2024"
                      className="input-field"
                      {...register("year", {
                        required: "Enter a year.",
                      })}
                    />
                    {errors.year && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="label">{lang[langKey].UploadFile}</label>
                  <div className="mt-2">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleFileChange}
                      className="sr-only"
                      multiple={false}
                      accept="application/pdf"
                    />
                    <label
                      htmlFor="file"
                      className="relative flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
                    >
                      <div>
                        {selectedFile.name ? (
                          <div className="space-y-2">
                            <svg
                              className="mx-auto h-12 w-12 text-indigo-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <p className="text-lg font-semibold text-gray-900">
                              {selectedFile.name}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <div>
                              <p className="text-lg font-semibold text-gray-700">
                                Drop your PDF here
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                or click to browse
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  {!selectedFile.name && (
                    <p className="text-sm text-gray-500 mt-2">
                      {lang[langKey].selectfile} • {lang[langKey].Allowedformat}{" "}
                      - .pdf
                    </p>
                  )}

                  {selectedFile.name && (
                    <div className="mt-4 rounded-lg bg-indigo-50 border border-indigo-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <svg
                            className="h-8 w-8 text-indigo-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="truncate text-sm font-medium text-gray-900">
                            {selectedFile?.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFile([])}
                          className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {fileUploadProgress !== 100 ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Uploading...</span>
                            <span>{fileUploadProgress}%</span>
                          </div>
                          <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                            <div
                              style={{ width: `${fileUploadProgress}%` }}
                              className="absolute h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            Upload complete!
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      submitting ||
                      fileUploadProgress !== 100 ||
                      !selectedFile.name
                    }
                  >
                    {submitting ? (
                      <>
                        <ButtonLoader size="small" />
                        <span>Uploading notes...</span>
                      </>
                    ) : fileUploadProgress !== 100 ? (
                      <>
                        <ButtonLoader size="small" />
                        <span>Uploading file... {fileUploadProgress}%</span>
                      </>
                    ) : (
                      lang[langKey].UploadNotes
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
export default UploadPage;
