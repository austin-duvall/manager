import React from 'react';

export default function FactModule({ header, content }) {
  return (
    <li>
      <p>{header}</p>
      <h2>{content}</h2>
    </li>
  )
}