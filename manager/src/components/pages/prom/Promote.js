import React from 'react';
import SearchForm from '../../../forms/SearchForm';

export default function Promote() {

  return (
    <div className='editHomes'>
      <h1>Edit Employee Status</h1>
      <SearchForm pathPrefix='/promote-demote' />
    </div>
  )
}