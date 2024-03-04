import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEmployeeState } from '../../../context/EmployeeState';
import { useFetchEmployees } from '../../../hooks/useFetchEmployees';

export default function EmployeeList() {
  const { employees } = useFetchEmployees();
  const { setChosen } = useEmployeeState();
  const [sortBy, setSortBy] = useState('');
  const [alphToggle, setAlphToggle] = useState(false);
  const [numToggle, setNumToggle] = useState(false);
  const [posToggle, setPosToggle] = useState(false);

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
    } else if (sortBy === 'posDown') {
      sorted.sort((a, b) => positionOrder[a.position] - positionOrder[b.position])
    } else if (sortBy === 'posUp') {
      sorted.sort((a, b) => positionOrder[b.position] - positionOrder[a.position])
    }
    return sorted;
  }, [employees, sortBy]);

  const handleSort = (type) => {
    setSortBy(type);
    if (type === 'aToZ' || type === 'zToA') {
      setAlphToggle(!alphToggle);
      setNumToggle(false);
      setPosToggle(false);
    } else if (type === 'countDown' || type === 'countUp') {
      setNumToggle(!numToggle);
      setAlphToggle(false);
      setPosToggle(false);
    } else {
      setPosToggle(!posToggle);
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
      <ul>
        <li>
          <button type='button' onClick={() => handleSort(numToggle ? 'countUp' : 'countDown')}>Employee number</button>
          <button type='button' onClick={() => handleSort(alphToggle ? 'zToA' : 'aToZ')}>Last name</button>
          <button type='button' onClick={() => handleSort(posToggle ? 'posDown' : 'posUp')}>Position</button>
        </li>
      </ul>
      <ul>
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
  );
}
