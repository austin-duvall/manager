import React, { useState, createContext, useContext } from 'react';

const EmployeeContext = createContext();

export default function EmployeeState({ children }) {
  const [chosen, setChosen] = useState('');


  return (
    <EmployeeContext.Provider value={{ chosen, setChosen }}>
      {children}
    </EmployeeContext.Provider>
  )
};

export const useEmployeeState = () => useContext(EmployeeContext);