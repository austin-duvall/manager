import React from 'react';
import { useEmployeeState } from '../../context/EmployeeState';
import { useNavigate } from 'react-router-dom';
import differenceInYears from 'date-fns/differenceInYears';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInDays from 'date-fns/differenceInDays';


export default function EmployeeSum() {
  const { chosen } = useEmployeeState();
  const { employeeNumber, doh, firstName, middleInit, lastName, position, hours, wage, phone, email, address, city, state, zip } = chosen;
  const navigate = useNavigate();

  const currentDate = new Date();
  const hireDate = new Date(doh);

  const years = differenceInYears(currentDate, hireDate);
  const months = differenceInMonths(currentDate, hireDate) % 12;
  const days = differenceInDays(currentDate, hireDate) % 30;


  return (
    <div className='employeeSummary'>
      <h1>Employee Summary</h1>
      {chosen && (
        <div>
          <ul>
            <li>
              <h2>Employee Number</h2>
              <p>#{employeeNumber}</p>
            </li>
            <li>
              <h2>Name</h2>
              <p>{firstName} {middleInit}. {lastName}</p>
            </li>
            <li>
              <h2>Position</h2>
              <p>{position}</p>
            </li>
            <li>
              <h2>Schedule and Wage</h2>
              <p>{hours === 'ft' ? 'Full-Time' : 'Part-Time'} at ${wage}/hour</p>
            </li>
            <li>
              <h2>Service Time</h2>
              <p>{years} years, {months} months, {days} days</p>
            </li>
            <li>
              <h2>Phone</h2>
              <p>{phone}</p>
            </li>
            <li>
              <h2>Email</h2>
              <p>{email}</p>
            </li>
            <li>
              <h2>Address</h2>
              <p>
                {address}<br />
                {city}, {state} {zip}
              </p>
            </li>
            </ul>
          <div className='buttonDiv'>
            <ul>
              <li>
                <button type='button' onClick={() => navigate(`/corrective-action/${employeeNumber}`)}>{firstName}'s Corrective Action</button>
              </li>
              <li>
                <button type='button' onClick={() => navigate(`/promote-demote/${employeeNumber}`)}>Edit {firstName}'s Status</button>
              </li>
              <li>
                <button type='button' onClick={() => navigate(`/terminate-employment/${employeeNumber}`)}>Terminate {firstName}'s Employment</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}