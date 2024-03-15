import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEmployeeState } from '../../../context/EmployeeState';
import { useFetchEmployees } from '../../../hooks/useFetchEmployees';
import carrot from './assets/carrot.svg';

export default function EmployeeList() {
  const { employees } = useFetchEmployees();
  const { setChosen } = useEmployeeState();
  const [sortBy, setSortBy] = useState('');
  const [alphToggle, setAlphToggle] = useState(false);
  const [numToggle, setNumToggle] = useState(false);
  const [posToggle, setPosToggle] = useState(false);
  const [alphStyle, setAlphStyle] = useState(false);
  const [numStyle, setNumStyle] = useState(false);
  const [posStyle, setPosStyle] = useState(false);

  const positionOrder = {
    'Store Manager': 1,
    'Assistant Manager': 2,
    'Senior Team Lead': 3,
    'Team Lead': 4,
    'Associate': 5,
  }

  const sortedEmployees = useMemo(() => {
    const sorted = [...employees];
    if (sortBy === 'aToZ') {
      sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (sortBy === 'zToA') {
      sorted.sort((a, b) => b.lastName.localeCompare(a.lastName));
    } else if (sortBy === 'countDown') {
      sorted.sort((a, b) => a.employeeNumber - b.employeeNumber);
    } else if (sortBy === 'countUp') {
      sorted.sort((a, b) => b.employeeNumber - a.employeeNumber);
    } else if (sortBy === 'posUp') {
      sorted.sort((a, b) => positionOrder[a.position] - positionOrder[b.position])
    } else if (sortBy === 'posDown') {
      sorted.sort((a, b) => positionOrder[b.position] - positionOrder[a.position])
    }
    return sorted;
  }, [employees, sortBy]);

  const handleSort = (type) => {
    setSortBy(type);
    if (type === 'aToZ' || type === 'zToA') {
      setAlphToggle(!alphToggle);
      setAlphStyle(true);
      setNumStyle(false);
      setPosStyle(false);
      setNumToggle(false);
      setPosToggle(false);
    } else if (type === 'countDown' || type === 'countUp') {
      setNumToggle(!numToggle);
      setNumStyle(true);
      setAlphStyle(false);
      setPosStyle(false);
      setAlphToggle(false);
      setPosToggle(false);
    } else {
      setPosToggle(!posToggle);
      setPosStyle(true);
      setAlphStyle(false);
      setNumStyle(false);
      setAlphToggle(false);
      setNumToggle(false);
    }
  };

  const handleClick = (employee) => {
    setChosen(employee);
  };

  return (
    <div className='employeeList'>
      <h1>Find Employee</h1>
      <div className='sortBy'>
        <h2>Sort by:</h2>
        <ul>
          <li>
            <button
              type='button'
              className={numStyle ? 'toggled' : ''}
              onClick={() => handleSort(numToggle ? 'countUp' : 'countDown')}>
                ID
                {numStyle ? (
                  <img src={carrot} className={sortBy === 'countUp' ? 'flip' : ''} />
                ) : (
                  ''
                )}
            </button>
            <button
              type='button'
              className={alphStyle ? 'toggled' : ''}
              onClick={() => handleSort(alphToggle ? 'zToA' : 'aToZ')}>
                Name
                {alphStyle ? (
                  <img src={carrot} className={sortBy === 'zToA' ? 'flip' : ''} />
                ) : (
                  ''
                )}
            </button>
            <button
              type='button'
              className={posStyle ? 'toggled' : ''}
              onClick={() => handleSort(posToggle ? 'posDown' : 'posUp')}>
                Position
                {posStyle ? (
                  <img src={carrot} className={sortBy === 'posDown' ? 'flip' : ''}/>
                ) : (
                  ''
                )}
            </button>
          </li>
        </ul>
      </div>
      <div className='employees'>
        <ul>
          <li>
            <p>Employee Number</p>
            <p>Name</p>
            <p>Position</p>
          </li>
          {sortedEmployees.map((employee) => (
            <li key={employee.employeeNumber}>
              <Link to={`/find-employee/${employee.employeeNumber}`} onClick={() => handleClick(employee)}>
                <p>{employee.employeeNumber}</p>
                <p>{employee.lastName}, {employee.firstName}</p>
                <p>{employee.position}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
