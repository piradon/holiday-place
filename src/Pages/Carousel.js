import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = () => {
  const slides = [
    "Slide 1",
    "Slide 2",
    "Slide 3",
    "Slide 4",
    "Slide 5",
    "Slide 6",
    "Slide 7",
    "Slide 8",
    "Slide 9",
    "Slide 10",
    "Slide 11",
    "Slide 12",
    "Slide 13",
    "Slide 14",
    "Slide 15",
    "Slide 16",
    "Slide 17",
    "Slide 18",
    "Slide 19",
    "Slide 20",
    "Slide 20",
    "Slide 20",
    "Slide 20",
    "Slide 20",
    "Slide 20",
    "Slide 20",
    "Slide 20",
  ]; // Add your 20 slides here
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex === slides.length) {
          return 0; // Reset to the first slide once it reaches the last slide
        } else {
          return newIndex;
        }
      });
    }, 10000); // Change slides every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [slides.length]);

  return (
    <div className="carousel">
      <div
        className="carousel-slides"
        style={{
          transform: `translateX(-${index * 500}%)`,
          //transitionTimingFunction: "ease-out",
          transitionDuration: "3s",
          transitionTimingFunction: "cubic-bezier(0,.1)",
        }}
      >
        {slides.map((slide, i) => (
          <p key={i} className={index === i ? "active" : ""}>
            {slide}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

////https://www.phind.com/agent?cache=clkvstygq001omm085isgqx59

//// primary version

// const Carousel = () => {
//   const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5','Slide 6','Slide 7','Slide 8','Slide 9',]; // Add your slides here
//   const [index, setIndex] = useState(0);
//   const [stopIndex, setStopIndex] = useState(7);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => {
//         const newIndex = prevIndex + 1 === slides.length ? 0 : prevIndex + 1;
//         if (newIndex === stopIndex) {
//           clearInterval(interval); // Stop the interval when reaching the stopIndex
//         }
//         return newIndex;
//       });
//     }, 300); // Change slides every 2 seconds

//     //return () => clearInterval(interval); // Clean up on component unmount
//   }, [slides.length, stopIndex]);

//   return (
//     <div className="carousel">
//       <div className="carousel-slides" style={{ transform: `translateX(-${index * 33.33}%)` }}>
//         {slides.map((slide, i) => (
//           <p key={i} className={index === i ? 'active' : ''}>{slide}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;

///
