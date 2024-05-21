import React from 'react'
import { IoIosLink } from "react-icons/io";
import { toast, Bounce } from "react-toastify"



const ShareButton = ({ noteID }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/open-note?id=${noteID}`)
    toast.success("Copied Link", {
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
  }

  return (
    <div className='cursor-pointer' onClick={handleCopy}>
      <IoIosLink size="25" />
    </div>
  )
}

export default ShareButton;