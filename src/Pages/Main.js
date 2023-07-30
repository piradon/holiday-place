import React, { useState, useEffect } from "react";
import {
  twentyPolandCities,
  fortyPolandCities,
} from "../constants/countryCodes";
import { fetchWeather } from "../api/weatherApi";
import { ReactComponent as Hot } from "../icons/hot.svg";
import "./Main.scss";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function Main() {
  const [weather, setWeather] = useState(null);
  const [countryName, setCountryName] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      let firstWeather = await fetchWeather(twentyPolandCities);
      let secondWeather = await fetchWeather(fortyPolandCities);

      //firstWeather.list.push(secondWeather.list);
      firstWeather = JSON.parse(firstWeather);
      //firstWeather.list.push(secondWeather.list);
      secondWeather = JSON.parse(secondWeather);

      console.log(firstWeather.list);
      console.log(secondWeather.list);
      const mergedCities = [...firstWeather.list, ...secondWeather.list];
      firstWeather.cnt = 40;
      firstWeather.list = mergedCities;

      console.log(firstWeather);
      const countryName = [];
      for (let index = 0; index < firstWeather.list.length; index++) {
        countryName.push(regionNames.of(firstWeather.list[index].sys.country));
      }
      setCountryName(countryName);
      setWeather(firstWeather);
      //console.log(weather);
    };

    getWeather();

    console.log(regionNames.of("US")); // "United States"
    return () => {};
  }, []);

  if (weather && countryName) {
    console.log(weather);
    //console.log(weather.coord)
    return (
      <div className="container">
        {/* <div className="box">
          {" "}
          {weather.name} 
          {weather.sys.country} {weather.main?.temp}{" "}
          {weather.main.humidity} {weather.wind.speed}{" "}
        </div> */}

        {weather.list.map((x, i) => {
          return (
            <div key={x.id} className="box">
              <div className="city-name">
                <p>{x.name}</p>
              </div>
              <div className="weather-info-container">
                <div>
                  <Hot />
                </div>
                <div className="weather-info">
                  <p>{x.main.temp} °C</p>
                  <p>{x.main.humidity} %</p>
                  <p>{x.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>Loader</div>;
}

export default Main;
