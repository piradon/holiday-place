import React, { useState, useEffect } from "react";
import { countryList } from "../../constants/countries";
import "./Draw.css";

function Draw() {
  const [country, setCountry] = useState("Shuffle");
  const [countries, setCountries] = useState([]);
  const [index, setIndex] = useState(100);
  const [delay, setDelay] = useState(100);

  useEffect(() => {
    //const randomSteps = Math.floor(Math.random() * 100);
    const shuffledArray = shuffle(countryList);
    // pickRandomElement(countryList, 100);
    //pickRandomElementTimeDelay(countryList, 10);
    //console.log(countryList[Math.floor(Math.random() * countryList.length)]);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (delay > 2000) {
        return;
      }
      setIndex(index - 1);
      console.log(index);
      setDelay(delay * 1.1); // decrease delay by 10%
    }, delay);

    return () => clearTimeout(timeoutId); // clean up on unmount
  }, [delay]);

  const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  };

  const pickRandomElement = (arr, steps) => {
    if (steps === 0) {
      return;
    }
    //let randomIndex = Math.floor(Math.random() * arr.length);
    //console.log(arr[randomIndex]);

    //const drawnCountry = arr[randomIndex];
    //setCountry(drawnCountry);
    //let listOfCountries = countries;

    //listOfCountries.push(drawnCountry);

    //setCountries(listOfCountries);
    setIndex(steps);
    setTimeout(() => pickRandomElement(arr, steps - 1), 100);
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const pickRandomElementTimeDelay = (arr, steps) => {
    if (steps === 0) {
      return;
    }
    // let randomIndex = Math.floor(Math.random() * arr.length);
    // console.log(arr[randomIndex]);
    // setCountry(arr[randomIndex]);
    setIndex(steps);
    console.log(delay * 0.9);
    setDelay(0.9 * delay);
    setTimeout(() => pickRandomElementTimeDelay(arr, steps - 1), 0.9 * delay);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: 100 }}>{countryList[index - 1]}</div>
        <div style={{ width: 100 }}>{countryList[index]}</div>
        <div style={{ width: 100 }}>{countryList[index + 1]}</div>

        {/* {countries.map((x, i) => {
        return (
          <
            // style={{
            //   border: "1px solid black",
            //   position: "absolute",
            //   left: i * 100,
            // }}
          >
            {x}
          </>
        );
      })} */}
      </div>
    </div>
  );
}

export default Draw;
