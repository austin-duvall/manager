import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TermModal from './TermModal';

export default function TermConfirmation({ chosen }) {
  const { firstName, lastName, employeeNumber, position } = chosen;
  const [reason, setReason] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const currentDateString = useMemo(() => new Date().toDateString(), []);
  const navigate = useNavigate();

  const body = {
    firstName,
    lastName,
    employeeNumber,
    position,
    status: 'Inactive',
    reason,
    dateOfTerm: currentDateString,
  };

  const openModal = () => {
    setModalOpen(true);
  }

  const cancelHandler = () => {
    navigate(-1)
  }

  return (
    <div>
      {modalOpen ? (
        <TermModal termBody={body} chosen={chosen} setModalOpen={setModalOpen} />
      ) : (
        <div>
          <textarea
            type="textarea"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
          />
          <p>{currentDateString}</p>
          <button type='button' disabled={reason.trim().length === 0} onClick={openModal}>Next</button>
          <button type='button' onClick={cancelHandler}>Cancel</button>
        </div>
      )}
    </div>
  );
}
