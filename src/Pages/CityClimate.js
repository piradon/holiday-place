import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  twentyPolandCities,
  fortyPolandCities,
} from "../constants/countryCodes";

import { fetchWeather } from "../api/weatherApi";
import { ReactComponent as ClearSky } from "../icons/clear-sky.svg";
import { ReactComponent as Rain } from "../icons/rain.svg";
import { ReactComponent as Thunderstorm } from "../icons/thunderstorm.svg";
import { ReactComponent as Drizzle } from "../icons/drizzle.svg";
import { ReactComponent as Snow } from "../icons/snow.svg";
import { ReactComponent as Cloud } from "../icons/cloud.svg";

import "./CityClimate.css";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function CityClimate() {
  const [weather, setWeather] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const dispatch = useDispatch();
  const temperature = useSelector((state) => state.weather.temperature);

  useEffect(() => {
    const getWeather = async () => {
      let firstWeather = await fetchWeather(twentyPolandCities);
      let secondWeather = await fetchWeather(fortyPolandCities);

      //firstWeather.list.push(secondWeather.list);
      firstWeather = JSON.parse(firstWeather);
      //firstWeather.list.push(secondWeather.list);
      secondWeather = JSON.parse(secondWeather);

      console.log(secondWeather.list);
      const mergedCities = [...firstWeather.list, ...secondWeather.list];
      firstWeather.cnt = 40;
      firstWeather.list = mergedCities;

      //console.log(firstWeather);
      const countryName = [];
      for (let index = 0; index < firstWeather.list.length; index++) {
        countryName.push(regionNames.of(firstWeather.list[index].sys.country));
      }
      setCountryName(countryName);
      setWeather(firstWeather);
      //console.log(weather);
    };

    getWeather();

    return () => {};
  }, []);

  if (weather && countryName && temperature) {
    console.log(temperature);
    return (
      <div className="container">
        {weather.list.map((x, i) => {
          return (
            <div key={x.id} className="box">
              <div className="city-name">
                <p>{x.name}</p>
              </div>
              <div className="weather-info-container">
                <div className="weather-info">
                  {x.weather[0].icon === "01n" ? (
                    <ClearSky />
                  ) : x.weather[0].icon === "10n" ? (
                    <Rain />
                  ) : x.weather[0].icon === "11n" ? (
                    <Thunderstorm />
                  ) : x.weather[0].icon === "09n" ? (
                    <Drizzle />
                  ) : x.weather[0].icon === "13n" ? (
                    <Snow />
                  ) : x.weather[0].icon === "03n" ||
                    x.weather[0].icon === "04n" ? (
                    <Cloud />
                  ) : (
                    <></>
                  )}
                  <p style={{ fontSize: 18 }}>{x.main.temp} °C</p>
                  <p>{x.wind.speed} m/s</p>
                  <p>{x.main.humidity} %</p>
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

export default CityClimate;
