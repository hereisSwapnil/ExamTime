import React, { useState } from 'react'
import MediHubBot from './MediHubBot'
import chatIcon from '../../assets/images/chat-bot.jpg'
import './bot.css';
 function Bot() {
 
  const [chatbotOpen,setChatbotOpen] = useState(false)
  const handleChatClick = () =>{
    setChatbotOpen(!chatbotOpen)
  }

  return (
    <div>
    <div className="bot-container" onClick={handleChatClick}>
      <div className="bot-button">
        <img src={chatIcon} alt="Chat Icon"/>
      </div>
    </div>
    {chatbotOpen? <MediHubBot show={chatbotOpen}/>:""}
  </div>
  )
}
export default Bot