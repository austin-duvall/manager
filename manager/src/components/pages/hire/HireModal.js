import React, { useEffect } from 'react';
import { usePost } from '../../../hooks/usePost';

export default function HireModal({ values, setOpenModal, formikRef, removeFocus }) {
  const { loading, error, postData, success, setSuccess } = usePost();
  const { doh, employeeNumber, firstName, middleInit, lastName, dob, address, city, state, zip, phone, email, position, wage, hours } = values;

  const submitHandler = async () => {
    await postData('http://localhost:3001/employees', values);
  };

  useEffect(() => {
    if (success) {
      console.log('New hire added!');
      formikRef.current.resetForm();
    }
  }, [success, setOpenModal, formikRef, setSuccess]);

  useEffect(() => {
    if (error) {
      console.error('Failed to add new hire:', error);
    }
  }, [error]);

  const backHandler = () => {
    setOpenModal(false);
  }

  const successHandler = () => {
    setOpenModal(false);
    removeFocus();
  }

  const buttonLabel = () => {
    if (loading) return 'Submitting...';
    if (error) return 'Retry';
    return 'Submit';
  }

  return (
    <div className='modalPage'>
      {success ? (
        <div className='modal successModal'>
          <h1>New hire added!</h1>
          <button type='button' onClick={successHandler}>Done</button>
        </div>
      ) : (
        <div className='modal confirmModal'>
          <h1>Verify all fields:</h1>
          <div className='confirmation'>
            <div className='confirm'>
              <ul>
                <li>
                  <p>{doh}</p>
                  <p>Date of Hire</p>
                </li>
                <li>
                  <p>{employeeNumber}</p>
                  <p>Employee Number</p>
                </li>
              </ul>
            </div>

            <div className='confirm'>
              <ul>
                <li>
                  <p>{firstName}</p>
                  <p>First Name</p>
                </li>
                <li>
                  <p>{middleInit}</p>
                  <p>Middle</p>
                </li>
                <li>
                  <p>{lastName}</p>
                  <p>Last Name</p>
                </li>
              </ul>
            </div>

            <div className='confirm'>
              <ul>
                <li>
                  <p>{address}</p>
                  <p>Address</p>
                </li>
                <li>
                  <p>{city}</p>
                  <p>City</p>
                </li>
                <li>
                  <p>{state}</p>
                  <p>State</p>
                </li>
                <li>
                  <p>{zip}</p>
                  <p>ZIP</p>
                </li>
              </ul>
            </div>

            <div className='confirm'>
              <ul>
                <li>
                  <p>{phone}</p>
                  <p>Phone Number</p>
                </li>
                <li>
                  <p>{email}</p>
                  <p>Email Address</p>
                </li>
              </ul>
            </div>

            <div className='confirm'>
              <ul>
                <li>
                  <p>{position}</p>
                  <p>Position</p>
                </li>
                <li>
                  <p>${wage}/hour</p>
                  <p>Wage</p>
                </li>
                <li>
                  <p>{hours === 'ft' ? 'Full-Time' : 'Part-Time'}</p>
                  <p>Schedule</p>
                </li>
              </ul>
            </div>
            <div>
              <button type='submit' onClick={submitHandler} disabled={loading}>{buttonLabel()}</button>
              <button type='button' onClick={backHandler} disabled={loading}>Edit</button>
            </div>
          </div>
      </div>
      )}
      {error && <p>Error adding employee. {error.message}</p>}
    </div>
  )
}