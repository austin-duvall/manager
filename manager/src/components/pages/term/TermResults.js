import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermResults({ success, error, setModalOpen }) {
  const navigate = useNavigate();

  const doneHandler = () => {
    navigate('/terminate-employment')
  }

  return (
    <div>
      {success ? (
        <div>
          <p>Employee terminated.</p>
          <button type='button' onClick={doneHandler}>Done</button>
        </div>
      ) : (
        <div>
          <p>Something went wrong</p>
          <p>Error {error.message}</p>
          <button type='button' onClick={() => setModalOpen(false)}>Retry</button>
        </div>
      )}
    </div>
  )
}