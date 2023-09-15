import React, { useState, useEffect } from "react";
import { countryList, listFlag } from "../constants/countries";
import "./Carousel.css";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [countries, setCountries] = useState(null);
  const [bingo, setBingo] = useState(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // const countries = countryList.sort((a, b) => 0.5 - Math.random());
    // setCountries(countries);

    const countries = listFlag.sort((a, b) => 0.5 - Math.random());
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
        backgroundColor: "black",
      }}
    >
      <div className="carousel">
        {/* <div
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
        /> */}
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
            {/* {countryList.map((slide, i) => (
              <p key={i} className={index === i ? "active" : ""}>
                {slide}
              </p>
            ))} */}

            {listFlag.map((x, i) => (
              <div style={{ padding: "20px" }}>
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${x.cd}.svg`}
                  width="200"
                  alt="flag"
                ></img>
                <div className="flag-caption">{x.n}</div>
              </div>
              // <p key={i} className={index === i ? "active" : ""}>
              //   {x}
              // </p>
            ))}
          </div>
        )}
      </div>
      {/* <p>{lol}</p> */}
      <button
        style={{ width: "200px", marginTop: "125px" }}
        onClick={handleToggleClicked}
        className="my-button"
      >
        Draw Country!
      </button>
    </div>
  );
};

export default Carousel;
const lol =
  "London ( (listen)) is the capital and largest city of England and the United Kingdom, with a population of just under 9 million. It stands on the River Thames in south-east England at the head of a 50-mile (80 km) estuary down to the North Sea and has been a major settlement for two millennia. The City of London, its ancient core and financial centre, was founded by the Romans as Londinium and retains its mediaeval boundaries. The City of Westminster, to the west of the City of London, has for centuries hosted the national government and parliament. Since the 19th century, the name \"London\" also refers to the metropolis around this core, historically split among the counties of Middlesex, Essex, Surrey, Kent, and Hertfordshire, which since 1965 has largely comprised Greater London, which is governed by 33 local authorities and the Greater London Authority.As one of the world's major global cities, London exerts a strong influence on its arts, entertainment, fashion, commerce and finance, education, health care, media, science and technology, tourism, transport, and communications. Its GDP (\u20ac801.66 billion in 2017) makes it the largest urban economy in Europe, and it is one of the major financial centres in the world. With Europe's largest concentration of higher education institutions, it is home to some of the highest-ranked academic institutions in the world\u2014Imperial College London in natural and applied sciences, the London School of Economics in social sciences, and the comprehensive University College London. London is the most visited city in Europe and has the busiest city airport system in the world. The London Underground is the oldest rapid transit system in the world.London's diverse cultures encompass over 300 languages. The mid-2018 population of Greater London of about 9 million made it Europe's third-most populous city, accounting for 13.4% of the population of the United Kingdom and over 16% of the population of England. The Greater London Built-up Area is the fourth-most populous in Europe, with about 9.8 million inhabitants at the 2011 census. The London metropolitan area is the third-most populous in Europe, with about 14 million inhabitants in 2016, granting London the status of a megacity.\nLondon has four World Heritage Sites: the Tower of London; Kew Gardens; the combined Palace of Westminster, Westminster Abbey, and St Margaret's Church; and also the historic settlement in Greenwich, where the Royal Observatory, Greenwich, defines the prime meridian (0\u00b0 longitude) and Greenwich Mean Time. Other landmarks include Buckingham Palace, the London Eye, Piccadilly Circus, St Paul's Cathedral, Tower Bridge, and Trafalgar Square. London has many museums, galleries, libraries, and cultural venues, including the British Museum, National Gallery, Natural History Museum, Tate Modern, British Library, and numerous West End theatres. Important sporting events held in London include the FA Cup Final, the Wimbledon Tennis Championships, and the London Marathon. In 2012, London became the first city to host three Summer Olympic Games.";

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
