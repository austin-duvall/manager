import React from 'react';
import { useFetchEmployees } from '../../hooks/useFetchEmployees';
import FactModule from './FactModule';
import { differenceInDays } from 'date-fns/differenceInDays';

export default function Home() {
  const { employees } = useFetchEmployees();

  const employeeCount = employees.length
  const serviceDays = employees.reduce((acc, employee) => {
    const currentDate = new Date();
    const hireDate = new Date(employee.doh);
    const days = differenceInDays(currentDate, hireDate);
    return acc + days;
  }, 0)
  const averageDays = serviceDays / employeeCount
  const avgYears = Math.floor(averageDays / 365.25);
  const avgMonths = Math.floor((averageDays % 365.25) / 30.4375);

  return (
    <div>
      <h1>Welcome to Centric</h1>
      <h1>Fast Facts</h1>
      <ul>
        <FactModule header='Employees' content={employeeCount} />
        <FactModule header='Average Service Time' content={`${avgYears} years, ${avgMonths} months`} />
      </ul>
    </div>
  )
}