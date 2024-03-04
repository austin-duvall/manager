import React, { useState } from 'react';
import { usePost } from '../../../hooks/usePost';
import { useNavigate } from 'react-router-dom';
import TermResults from './TermResults';


export default function TermModal({ termBody, chosen, setModalOpen }) {
  const { postData, loading, error, data, success } = usePost();
  const { employeeNumber } = chosen;
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const editHandler = () => {
    setModalOpen(false);
  }

  const cancelHandler = () => {
    navigate('/terminate-employment')
  }

  const submitHandler = async () => {
    const url = `http://localhost:3001/employees/${employeeNumber}/term`;
    const body = termBody;

    await postData(url, body);
    setSubmitted(true);
  }

  const buttonLabel = () => {
    if (loading) return 'Submitting...';
    if (error) return 'Retry';
    return 'Submit';
  }

  return (
    <div>
      {submitted ? (
        <TermResults success={success} error={error} setModalOpen={setModalOpen} />
      ) : (
        <div>
          <p>{termBody.reason}</p>
          <p>{termBody.dateOfTerm}</p>
          <button type='button' disabled={loading} onClick={submitHandler}>{buttonLabel()}</button>
          {!loading && (
            <div>
              <button type='button' onClick={editHandler}>Edit</button>
              <button type='button' onClick={cancelHandler}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}