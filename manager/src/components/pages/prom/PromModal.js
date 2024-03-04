import React, { useEffect } from 'react';
import { usePut } from '../../../hooks/usePut';
import { useNavigate } from 'react-router-dom'

export default function PromModal({ values, employeeNumber, formikRef, setOpenModal }) {
  const { loading, error, updateData, success, setSuccess } = usePut();
  const { newHours, newWage, newPos } = values;
  const navigate = useNavigate();

  const submitHandler = async () => {
      if (newWage) { // Check if new wage is provided
        await updateData(`http://localhost:3001/employees/${employeeNumber}/wage*`, { wage: newWage });
      }

      if (newPos) { // Check if new position is provided
        await updateData(`http://localhost:3001/employees/${employeeNumber}/position`, { position: newPos });
      }

      if (newHours) { // Check if new hours are provided
        await updateData(`http://localhost:3001/employees/${employeeNumber}/hours`, { hours: newHours });
      }
  };

  useEffect(() => {
    if (success) {
      console.log('Employee successfully updated')
      formikRef.current.resetForm();
    }
  }, [success, setOpenModal, formikRef, setSuccess]);

  useEffect(() => {
    if (error) {
      console.error('Failed to update employee:', error)
    }
  }, [error])

  const successHandler = () => {
    navigate('/promote-demote')
  }

  const backHandler = () => {
    setOpenModal(false);
  };

  const buttonLabel = () => {
    if (loading) return 'Submitting...';
    if (error) return 'Retry';
    return 'Submit';
  }

  return (
    <div>
      {success ? (
        <div>
          <p>Employee updated!</p>
          <button type='button' onClick={successHandler}>Done</button>
        </div>
      ) : (
        <div>
          {(newHours || newWage || newPos) && (
            <dl>
              {newPos && (
                <>
                  <dt>{newPos}</dt>
                  <dd>New Position</dd>
                </>
              )}
              {newWage && (
                <>
                  <dt>{newWage}</dt>
                  <dd>New Wage</dd>
                </>
              )}
              {newHours && (
                <>
                  <dt>{newHours}</dt>
                  <dd>New Hours</dd>
                </>
              )}
            </dl>
          )}
          <button type='button' onClick={submitHandler} disabled={loading}>{buttonLabel()}</button>
          <button type='button' onClick={backHandler} disabled={loading}>Edit</button>
        </div>
      )}
      {error && <p>Error updating employee. {error.message}</p>}
    </div>
  )
}