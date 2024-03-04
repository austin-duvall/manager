import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/centric - logo.png';
import fire from './assets/fire.svg';
import hire from './assets/hire.svg';
import promDem from './assets/promDem.svg';
import corr from './assets/corr.svg';
import find from './assets/find.svg';
import Choice from './Choice';

export default function Sidebar() {

  return (
    <nav id='sidebar'>
      <Link to='/'>
        <img src={logo} alt='Centric Human Resources'/>
      </Link>
      <ul>
        <Choice link='/find-employee' value='Find Employee' icon={find} />
        <Choice link='/hire-employee' value='New Employee' icon={hire} />
        <Choice link='/promote-demote' value='Edit Employee Status' icon={promDem} />
        <Choice link='/terminate-employment' value='Terminate Employment' icon={fire} />
        <Choice link='/corrective-action' value='Corrective Action' icon={corr} />
      </ul>
    </nav>
  )
}