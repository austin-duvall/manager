import React from 'react';
import SearchForm from '../../forms/SearchForm';

export default function Search() {
  return (
    <div id='search'>
      <SearchForm pathPrefix='/find-employee' />
    </div>
  )
}