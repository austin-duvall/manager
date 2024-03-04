import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// In this page, we want the item that is clicked to update the context/state so that whatever is chosen is then displayed on screen.

export default function Choice({ link, value, icon }) {
  const [previewOn, setPreviewOn] = useState(false);

  const mouseEnterHandler = () => {
    setPreviewOn(true);
  }

  const mouseLeaveHandler = () => {
    setPreviewOn(false);
  }

  return (
    <li>
      <Link onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} to={link}>
        <img src={icon} />
        <div className={previewOn ? 'previewOn' : 'previewOff'}>
          {value}
        </div>
      </Link>
    </li>
  )
}