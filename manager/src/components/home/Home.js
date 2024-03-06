import React, { useEffect, useState } from 'react';
import { useFetchEmployees } from '../../hooks/useFetchEmployees';
import FactModule from './FactModule';
import { differenceInDays } from 'date-fns';

export default function Home() {
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
      setAverageWage(avgWage.toFixed(2));
    }
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('employeeCount', employeeCount.toString());
    localStorage.setItem('averageServiceYears', averageServiceYears);
    localStorage.setItem('averageServiceMonths', averageServiceMonths);
    localStorage.setItem('averageWage', averageWage.toString());
  }, [employeeCount, averageServiceYears, averageServiceMonths, averageWage]);

  return (
    <div className='home'>
      <h1>Welcome to Northbound Outfitters</h1>
      <h2>Powered by Centric</h2>
      <h3>Fast Facts</h3>
      <ul>
        <FactModule header='Employees' id='employeesFact' numberOne={employeeCount} />
        <FactModule header='Average Hourly Wage' id='wageFact' dollars='$' numberOne={averageWage} />
        <FactModule header='Average Service Time' id='serviceFact' numberOne={averageServiceYears} numberTwo={averageServiceMonths} content='years' />
      </ul>
    </div>
  );
}
