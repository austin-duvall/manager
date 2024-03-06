import React, { useEffect, useState } from 'react';
import { useFetchEmployees } from '../../hooks/useFetchEmployees';
import FactModule from './FactModule';
import { differenceInDays } from 'date-fns';

export default function Home() {
  // Initialize state with values from localStorage if available
  const [employeeCount, setEmployeeCount] = useState(
    Number(localStorage.getItem('employeeCount')) || 0
  );
  const [averageServiceYears, setAverageServiceYears] = useState(
    localStorage.getItem('averageServiceYears') || ''
  );
  const [averageServiceMonths, setAverageServiceMonths] = useState(
    localStorage.getItem('averageServiceMonths') || ''
  );
  const [averageWage, setAverageWage] = useState(
    Number(localStorage.getItem('averageWage')) || 0
  );

  const { employees } = useFetchEmployees();

  useEffect(() => {
    if (employees.length > 0) {
      const employeeCount = employees.length;
      setEmployeeCount(employeeCount);

      const serviceDays = employees.reduce((acc, employee) => {
        const currentDate = new Date();
        const hireDate = new Date(employee.doh);
        const days = differenceInDays(currentDate, hireDate);
        return acc + days;
      }, 0);

      const averageDays = serviceDays / employeeCount;
      const avgYears = Math.floor(averageDays / 365.25);
      const avgMonths = Math.floor((averageDays % 365.25) / 30.4375);
      setAverageServiceYears(avgYears);
      setAverageServiceMonths(avgMonths);

      const hourlyWage = employees.reduce((acc, employee) => acc + parseFloat(employee.wage), 0);
      const avgWage = hourlyWage / employeeCount;
      setAverageWage(avgWage.toFixed(2)); // Keeping two decimal places for wage
    }
  }, [employees]); // Ensure effect runs when `employees` changes

  // Effect to store state changes in localStorage
  useEffect(() => {
    localStorage.setItem('employeeCount', employeeCount.toString());
    localStorage.setItem('averageServiceYears', averageServiceYears);
    localStorage.setItem('averageServiceMonths', averageServiceMonths);
    localStorage.setItem('averageWage', averageWage.toString());
  }, [employeeCount, averageServiceYears, averageServiceMonths, averageWage]); // Dependencies array includes the state variables to watch

  return (
    <div className='home'>
      <h1>Welcome to Centric</h1>
      <h1>Fast Facts</h1>
      <button onClick={() => console.log(averageServiceMonths)}>console</button>
      <ul>
        <FactModule header='Employees' numberOne={employeeCount} />
        <FactModule header='Average Service Time' numberOne={averageServiceYears} numberTwo={averageServiceMonths} content='years' />
        <FactModule header='Average Hourly Wage' numberOne={averageWage} />
      </ul>
    </div>
  );
}
