import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ClearSky } from "../../icons/clear-sky.svg";
import { ReactComponent as Rain } from "../../icons/rain.svg";
import { ReactComponent as Thunderstorm } from "../../icons/thunderstorm.svg";
import { ReactComponent as Drizzle } from "../../icons/drizzle.svg";
import { ReactComponent as Snow } from "../../icons/snow.svg";
import { ReactComponent as Cloud } from "../../icons/cloud.svg";
import "./Weather.css";

function CityClimate() {
  const weather = useSelector((state) => state.cityInfo.weather);

  if (Object.keys(weather).length !== 0) {
    return (
      <div className="box">
        {weather.icon === "01n" ? (
          <ClearSky />
        ) : weather.icon === "10n" ? (
          <Rain />
        ) : weather.icon === "11n" ? (
          <Thunderstorm />
        ) : weather.icon === "09n" ? (
          <Drizzle />
        ) : weather.icon === "13n" ? (
          <Snow />
        ) : weather.icon === "03n" ||
          weather.icon === "04d" ||
          weather.icon === "02n" ? (
          <Cloud />
        ) : (
          <></>
        )}
        <div className="weather-info">
          <div style={{ fontSize: 18 }}>{weather.temp} °C</div>
          <div>{weather.windSpeed} m/s</div>
          <div>{weather.humidity} %</div>
          <div>{weather.description}</div>
        </div>
      </div>
    );
  }

  return <></>;
}

export default CityClimate;
