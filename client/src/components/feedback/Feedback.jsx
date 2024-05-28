import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import feedbackImage from '../../assets/feedback.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

const enlargeShrinkAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const FeedbackContainer = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const BackgroundContainer = styled.div`
  width: 50%;
  max-width: 100%; /* Added max-width */
  background: url(${feedbackImage});
  background-size: cover;
`;

const ContentContainer = styled.div`
  width: 50%;
  max-width: 50%; /* Added max-width */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;
git checkout -b feed


const FeedbackHeader = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Star = styled.span`
  font-size: 24px;
  color: ${(props) => (props.selected ? '#FFD700' : '#ccc')};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
  margin-top: 20px;
`;



const EnlargingLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #4caf50;
  margin-top: 20px;
  display: inline-block;
  animation: ${enlargeShrinkAnimation} 3s infinite;
`;

const PopupHeader = styled.h3`
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  padding: 20px;
  background: #003285;
  border-radius: 20px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/feedback/create`,
        { rating, feedbackMessage: feedback },
        config
      );

      if (response.status === 201) {
        setPopupMessage('Feedback submitted successfully!');
        setShowPopup(true);
        setRating(0);
        setFeedback('');
      } else {
        setPopupMessage('Error submitting feedback. Please try again later.');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      setPopupMessage('Error submitting feedback. Please try again later.');
      setShowPopup(true);
    }
  };


  const getGreeting = () => {
    if (rating > 3) {
      return 'Thank you for your positive feedback!';
    } else {
      return 'We appreciate your feedback.';
    }
  };

  return (
    <FeedbackContainer>
      <BackgroundContainer />
      <ContentContainer>
        <FeedbackHeader>{getGreeting()}</FeedbackHeader>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              selected={star <= rating}
              onClick={() => handleStarClick(star)}
            >
              &#9733;
            </Star>
          ))}
        </StarContainer>
        <TextArea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        <EnlargingLink to="/">Go to home</EnlargingLink>
      </ContentContainer>
      {showPopup && (
        <Popup>
          <PopupHeader>Feedback Submission Status</PopupHeader>
          <h4>{popupMessage}</h4>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </Popup>
      )}
    </FeedbackContainer>
  );
}

export default Feedback;
