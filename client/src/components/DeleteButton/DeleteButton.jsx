// DeleteButton.js
import React from "react";
import axios from "axios";

const DeleteButton = ({ noteId }) => {
  const deleteNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.get(`${import.meta.env.VITE_BASE_URL}/note/delete/${noteId}`, {
        config,
      });

    //   await axios.delete(`http://localhost:5000/api/notes/delete/${noteId}`, config);
      // Refresh the page or remove the note from the state
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={deleteNote}>Delete</button>;
};

export default DeleteButton;