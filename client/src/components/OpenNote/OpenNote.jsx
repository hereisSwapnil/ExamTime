import React, { useEffect, useState,useContext } from 'react';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
import LikeButton from '../LikeButton/LikeButton';
import ShareButton from '../ShareButton/ShareButton';
import { FcBookmark } from 'react-icons/fc';
import { CiBookmark } from 'react-icons/ci';
import { UserContext } from "../../Context/UserContext";
import Navbar from "../Navbar/Navbar";
import { Loader } from '../Loader/Loader';
import Footer from "../Footer/index"

const OpenNote = () => {
    
  const [params,setSearchParams]=useSearchParams();

  const [note,setNote]=useState({});
  const [isLoading,setIsLoading]=useState(true);

  const { user} = useContext(UserContext);

  console.log(user);

  const fetchNote = async ()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/note/${params.get('id')}`)
    .then((res)=>{
      setNote(res.data)
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    })
  }

  useEffect(()=>{
    fetchNote();
  },[])



  return (
    <div>

      {user?<Navbar/>:""}

      {
        isLoading?<Loader />
        :
        <>
        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 h-screen">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={note.thumbnail}
                          alt={note.thumbnail}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7 flex flex-col justify-between h-full">
                        <section
                          aria-labelledby="information-heading"
                          className="mt-2 gap-4 flex flex-col"
                        >
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                            {note.title}
                          </h2>
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Subject:</span>{" "}
                            {note.subject?.subjectName}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Description:</span>{" "}
                            {note.description}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Year:</span>{" "}
                            {note.year}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Course:</span>{" "}
                            {note.course}
                          </p>

                          <p className="text-md text-gray-700">
                            <span className="font-bold mr-2">Likes:</span>{" "}
                            {note.likes}
                          </p>
                          <div className="flex gap-2">
                            <div style={{ width: "22px" }}>
                              <LikeButton noteId={note?._id} />
                            </div>
                            <div style={{ width: "22px" }}>
                              {user?.bookMarkedNotes?.includes(note._id) ? (
                                <FcBookmark
                                  onClick={() => handleBookMark(note._id)}
                                  className="text-2xl cursor-pointer"
                                />
                              ) : (
                                <CiBookmark
                                  onClick={() => handleBookMark(note._id)}
                                  className="text-2xl cursor-pointer"
                                />
                              )}
                            </div>
                            <div >
                              <ShareButton noteID={note._id}/>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="">
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>
                          <p className="text-sm mt-8 text-gray-700">
                            Uploaded by{" "}
                            <a
                              href="#"
                              className="hover:underline hover:text-gray-900"
                            >
                              @{note.author?.username}
                            </a>
                          </p>
                          <a
                            type="submit"
                            className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            href={user?(note?.fileUrl):"/login"}
                            target={user?"_blank":""}
                          >
                            {user?"Download":"Log in to Download"}
                          </a>
                        </section>
                      </div>
        </div>
        </>
      }
      
    </div>
  )
}

export default OpenNote