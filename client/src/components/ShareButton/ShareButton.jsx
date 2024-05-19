import React from 'react'
import ShareLogo from '../../assets/share.svg';

const ShareButton = ({noteID}) => {

  const handleShare=()=>{
    navigator.clipboard.writeText(`http://localhost:5173/open-note?id=${noteID}`)
  }

  return (
    <div className='cursor-pointer' onClick={handleShare}>
      <img src={ShareLogo} width="22px" alt="share" />
    </div>
  )
}

export default ShareButton;