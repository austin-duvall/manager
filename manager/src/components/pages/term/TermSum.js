import React from 'react';
import { useEmployeeState } from '../../../context/EmployeeState';
import TermConfirmation from './TermConfirmation';

export default function TermSum() {
  const { chosen } = useEmployeeState();
  const fullName = `${chosen.firstName} ${chosen.lastName}`

  return (
    <div>
      <h1>Terminate Employment</h1>
      <p>{fullName}</p>
      <p>{chosen.position}</p>
      <div>
        <TermConfirmation chosen={chosen} />
      </div>
    </div>
  )
}