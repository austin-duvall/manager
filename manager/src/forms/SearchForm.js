import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEmployeeState } from '../context/EmployeeState';
import { useFetchEmployees } from '../hooks/useFetchEmployees';

export default function SearchForm({ pathPrefix }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { setChosen } = useEmployeeState();
  const { employees } = useFetchEmployees();
  const searchFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredList = searchTerm.length >= 1 ?
    employees.filter((employee) =>
      employee.employeeNumber.startsWith(searchTerm) || employee.lastName.toLowerCase().startsWith(searchTerm.toLowerCase())
    ) :
    [];

  const clickHandler = (employee) => {
    setChosen(employee);
    setSearchTerm('');
  };

  return (
    <div className='searchForm' ref={searchFormRef}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder='ID# or Last Name'
      />
      {searchTerm && (
        <ul>
          {filteredList.map((employee) => (
            <li key={employee.employeeNumber}>
              <Link to={`${pathPrefix}/${employee.employeeNumber}`} onClick={() => clickHandler(employee)}>
                {employee.employeeNumber} {employee.lastName}, {employee.firstName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
