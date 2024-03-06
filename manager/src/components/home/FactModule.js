import React, { useEffect, useState } from 'react';

const easeOutQuad = t => t * (2 - t);
const frameDuration = 1000 / 60;

const CountUpAnimation = ({ number, duration = 7000 }) => {
  const countTo = parseInt(number, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / frameDuration);
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      setCount(countTo * progress);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [number, duration]);

  return <span>{Math.floor(count)}</span>;
};

export default function FactModule({ header, numberOne, numberTwo, id, dollars }) {


  return (
    <li key={id}>
      {!numberTwo ? (
        <p>
          {dollars}
          <CountUpAnimation number={numberOne}></CountUpAnimation>
        </p>
      ) : (
        <p>
          <CountUpAnimation number={numberOne}></CountUpAnimation> years, <CountUpAnimation number={numberTwo}></CountUpAnimation> months
        </p>
      )}
      <h1 id={id}>{header}</h1>
    </li>
  )
}