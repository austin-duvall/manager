import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEmployeeState } from '../../../context/EmployeeState';
import { useNavigate } from 'react-router-dom';
import CorrForm from './CorrForm';

export default function OffenderSum() {
  const { chosen, setChosen } = useEmployeeState();
  const [addCorr, setAddCorr] = useState(false);
  const [totalStrikes, setTotalStrikes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedChosen = JSON.parse(sessionStorage.getItem('chosen'));
    if (storedChosen) {
      setChosen(storedChosen);
    }
  }, [setChosen]);

  useEffect(() => {
    sessionStorage.setItem('chosen', JSON.stringify(chosen));
  }, [chosen]);

  useEffect(() => {
    if (chosen && chosen.corr) {
      // Calculate the sum of all strike values
      const sumStrikes = chosen.corr.reduce((sum, offense) => sum + (offense.strike ? 1 : 0), 0);
      setTotalStrikes(sumStrikes);
    }
  }, [chosen, chosen?.corr]);

  const clickHandler = () => {
    setAddCorr(true);
  }

  const cancelHandler = () => {
    navigate(-1)
  }

  const click = () => {
    console.log(chosen.lastName)
  }

  const updateChosenWithNewCorr = (newCorrEntry) => {
    setChosen((prevChosen) => ({
      ...prevChosen,
      corr: [...prevChosen.corr, newCorrEntry]
    }));
  }

  return (
    <div>
      <h1>Offender Summary</h1>
      {chosen && (
        <div>
          <p>{chosen.firstName} {chosen.lastName}</p>
          {!addCorr && (
            <div>
              <p>Strikes: {totalStrikes}</p>
              <p>Log:</p>
              <ul>
                {chosen.corr.map((offense) => (
                  <li key={uuidv4()}>
                    Date: {offense.dateOfOffense},
                    Offense: {offense.offenseDescription},
                    Strike? {offense.strike === 1 ? 'Yes' : 'No'}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!addCorr && (
            <div>
              <button type='button' onClick={clickHandler}>Add New</button>
              <button type='button' onClick={cancelHandler}>Cancel</button>
            </div>
          )}
          {addCorr && (
            <CorrForm setAddCorr={setAddCorr} chosen={chosen} updateChosenWithNewCorr={updateChosenWithNewCorr} />
          )}
        </div>
      )}
      <button onClick={click}>console</button>
    </div>
  )
}