import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const TOTAL_SLIDES = 3; // n-1 in Array

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const next = () => {
    if (current >= TOTAL_SLIDES) return;
    else setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 0) return;
    else setCurrent(current - 1);
  };

  const desired = (e) => {
    setCurrent(Number(e.target.id));
  };

  useEffect(() => {
    ref.current.style.transition = "all 0.2s ease-in-out";
    ref.current.style.transform = `translateX(-${current*50}%)`;
  }, [current]);

  return (
    <div className="wrapperr">
      <p>{current}</p>
      <div className="frame">
        <div className="box-container" ref={ref}>
          <div className="boxx">0</div>
          <div className="boxx">1</div>
          <div className="boxx">2</div>
          <div className="boxx">3</div>
        </div>
      </div>
      <div className="button-container">
        <div className="button" onClick={prev}>
          Left
        </div>
        <div className="button" onClick={next}>
          Right
        </div>
      </div>
      <div className="button-2-container">
        {[0, 1, 2, 3].map((num) => (
          <div
            className={`button-2 ${num === current && "active"}`}
            onClick={desired}
            id={num}
            key={num}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

////https://www.phind.com/agent?cache=clkvstygq001omm085isgqx59
