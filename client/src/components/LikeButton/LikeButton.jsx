// LikeButton.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Heart from "react-heart";

const LikeButton = ({ noteId }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/note/checklike/${noteId}`,
          config
        );
        setIsLiked(response.data?.isLiked);
      } catch (error) {
        console.error("Error checking if note is liked:", error);
      }
    };

    checkIfLiked();
  }, [noteId]);

  const likeNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      await axios.get(`${import.meta.env.VITE_BASE_URL}/note/like/${noteId}`, 
        config,
      );

      setIsLiked(true);
    } catch (error) {
      console.error("Error liking note:", error);
    }
  };

  const unlikeNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/note/unlike/${noteId}`,
        config
      );

      setIsLiked(false);
    } catch (error) {
      console.error("Error unliking note:", error);
    }
  };

  return (
    <Heart
      isActive={isLiked}
      onClick={isLiked ? unlikeNote : likeNote}
      animationScale={1.25}
      style={{ marginBottom: "1rem" }}
    />
  );
};

export default LikeButton;
