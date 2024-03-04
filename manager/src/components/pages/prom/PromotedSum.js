import React, { useEffect, useState } from 'react';
import { useEmployeeState } from '../../../context/EmployeeState';
import PromForm from './PromForm';


export default function PromotedSum() {
  const { chosen, setChosen } = useEmployeeState();
  const fullName = `${chosen.firstName} ${chosen.lastName}`

  useEffect(() => {
    const storedChosen = JSON.parse(sessionStorage.getItem('chosen'));

    if (storedChosen) {
      setChosen(storedChosen);
    }
    }, [setChosen]);

  useEffect(() => {
    sessionStorage.setItem('chosen', JSON.stringify(chosen));
  }, [chosen]);

  return (
    <div>
      <h1>Promote or Demote Employee</h1>
        <div>
          <div>
            <p>{fullName}</p>
            <ul>
              <li>
                Current position: {chosen.position}
              </li>
              <li>
                Current wage: {chosen.wage}
              </li>
              <li>
                Current schedule: {chosen.hours}
              </li>
            </ul>
          </div>
          <div>
            <PromForm
              chosen={chosen}
            />
          </div>
        </div>
    </div>
  )
}