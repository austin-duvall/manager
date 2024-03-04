import React, { useEffect } from 'react';
import { usePost } from '../../../hooks/usePost';
import { useNavigate } from 'react-router-dom';

export default function CorrModal({ corrValues, employeeNumber, formikRef, setOpenModal }) {
  const { loading, error, postData, success } = usePost();
  const { dateOfOffense, offenseDescription, strike } = corrValues;
  const navigate = useNavigate();

  const newCorrEntry = {
    dateOfOffense: dateOfOffense,
    offenseDescription: offenseDescription,
    strike: strike ? 1 : 0,
  }

  const submitHandler = async () => {
    await postData(`http://localhost:3001/employees/${employeeNumber}/corr`, { newCorrEntry });
  };

  useEffect(() => {
    if (success) {
      console.log('Corrective action added');
      formikRef.current.resetForm();
    }
    if (error) {
      console.error('Failed to add corrective action:', error)
    }
  }, [success, error, navigate])

  const buttonLabel = () => {
    if (loading) return 'Submitting...';
    if (error) return 'Retry';
    return 'Submit';
  }

  const doneHandler = () => {
    navigate('/corrective-action');
  }

  const editHandler = () => {
    setOpenModal(false);
  }


  return (
    <div>
      {success ? (
        <div>
        <p>Corrective action logged!</p>
        <button type='button' disabled={loading} onClick={doneHandler}>Done</button>
        </div>
              ) : (
        <div>
          <h1>Corr Modal</h1>
          <p>Date: {newCorrEntry.dateOfOffense}</p>
          <p>Offense: {newCorrEntry.offenseDescription}</p>
          <p>Strikes applied: {newCorrEntry.strike}</p>
          {error && (<p>Could not add corrective action to log. Please try again.</p>)}
          <button type='submit' disabled={loading} onClick={submitHandler}>{buttonLabel()}</button>
          <button type='button' disabled={loading} onClick={editHandler}>Edit</button>
        </div>
      )}
    </div>
  )
}