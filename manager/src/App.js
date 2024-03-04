import React from 'react';
import './App.scss'
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import Search from './components/search/Search';
import EmployeeState from './context/EmployeeState';

export default function App() {
  return (
    <div className='app'>
      <EmployeeState>
        <Sidebar />
        <Search />
        <Content />
      </EmployeeState>
    </div>
  )
}