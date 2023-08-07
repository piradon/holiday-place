import React, { useState, useEffect } from "react";
import { countryList } from "../constants/countries";
import "./Carousel.css";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [countries, setCountries] = useState(null);
  const [bingo, setBingo] = useState(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const countries = countryList.sort((a, b) => 0.5 - Math.random());
    setCountries(countries);

    setBingo(randomNumber(8, 24));
  }, []);

  const shouldRenderChild = useDelayUnmount(isMounted, 500);

  const mountedStyle = {
    // transform: `translateX(-${bingo * 100}%)`,
    // transitionTimingFunction: "cubic-bezier(0,0,0.33,1)",
  };
  const unmountedStyle = {
    transform: `translateX(-${bingo * 100}%)`,
    transitionTimingFunction: "cubic-bezier(0,0,0.33,1)",
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => {
  //       const newIndex = prevIndex + 1;
  //       if (newIndex === countryList.length) {
  //         return 0; // Reset to the first slide once it reaches the last slide
  //       } else {
  //         return newIndex;
  //       }
  //     });
  //   }, 10000); // Change slides every 2 seconds

  //   return () => clearInterval(interval); // Clean up on component unmount
  // }, [countryList.length]);
  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
    setBingo(randomNumber(8, 24));
  };
  if (!countries) {
    return <div>LOADER</div>;
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="carousel">
        <div
          className="heart"
          style={{
            // height: "300px",
            // width: "200px",
            margin: "0 auto",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        />
        {shouldRenderChild && (
          <div
            className={"carousel-slides"}
            //style={isMounted ? mountedStyle : unmountedStyle}
            style={isMounted ? mountedStyle : unmountedStyle}
            // style={{
            //   isMounted?
            //   //transform: `translateX(-${-bingo*100}%)`,
            //   transform: `translateX(-${100}%)`,

            //   //transitionTimingFunction: "ease-out",
            //   //transitionDuration: "3s",
            //   transitionTimingFunction: "cubic-bezier(0,0,0.33,1)",
            // }}
          >
            {countryList.map((slide, i) => (
              <p key={i} className={index === i ? "active" : ""}>
                {slide}
              </p>
            ))}
          </div>
        )}
      </div>
      <button style={{ width: "200px" }} onClick={handleToggleClicked}>
        Click me!
      </button>
    </div>
  );
};

export default Carousel;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function useDelayUnmount(isMounted, delayTime) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(true), delayTime);
    }
    console.log(shouldRender);
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

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
