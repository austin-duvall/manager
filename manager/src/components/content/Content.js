import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hire from '../pages/hire/Hire';
import Find from '../pages/find/Find';
import Home from '../home/Home';
import Corrective from '../pages/corr/Corrective';
import EmployeeSum from '../employee/EmployeeSum';
import OffenderSum from '../pages/corr/OffenderSum';
import Promote from '../pages/prom/Promote';
import PromotedSum from '../pages/prom/PromotedSum';
import Term from '../pages/term/Term';
import TermSum from '../pages/term/TermSum';

export default function Content() {

  return (
    <main id='content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find-employee' element={<Find />} />
        <Route path='/find-employee/:employeeNumber' element={<EmployeeSum />} />
        <Route path='/hire-employee' element={<Hire />} />
        <Route path='/promote-demote' element={<Promote />} />
        <Route path='/promote-demote/:employeeNumber' element={<PromotedSum />} />
        <Route path='/terminate-employment' element={<Term />} />
        <Route path='/terminate-employment/:employeeNumber' element={<TermSum />} />
        <Route path='/corrective-action' element={<Corrective />} />
        <Route path='/corrective-action/:employeeNumber' element={<OffenderSum />} />
      </Routes>
    </main>
  )
}