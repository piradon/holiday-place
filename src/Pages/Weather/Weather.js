import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as ClearSky } from "../../icons/clear-sky.svg";
import { ReactComponent as Rain } from "../../icons/rain.svg";
import { ReactComponent as Thunderstorm } from "../../icons/thunderstorm.svg";
import { ReactComponent as Drizzle } from "../../icons/drizzle.svg";
import { ReactComponent as Snow } from "../../icons/snow.svg";
import { ReactComponent as Cloud } from "../../icons/cloud.svg";
import { ReactComponent as Overcast } from "../../icons/overcast.svg";

import "./Weather.css";

function CityClimate() {
  const weather = useSelector((state) => state.cityInfo.weather);

  if (Object.keys(weather).length !== 0) {
    return (
      <div className="box">
        {weather.icon === "01n" || weather.icon === "01d" ? (
          <ClearSky />
        ) : weather.icon === "10n" ? (
          <Rain />
        ) : weather.icon === "11n" || weather.icon === "10d" ? (
          <Thunderstorm />
        ) : weather.icon === "09n" ? (
          <Drizzle />
        ) : weather.icon === "13n" ? (
          <Snow />
        ) : weather.icon === "03n" ||
          weather.icon === "02n" ||
          weather.icon === "02d" ? (
          <Cloud />
        ) : weather.icon === "04n" ||
          weather.icon === "04d" ||
          weather.icon === "03d" ? (
          <Overcast />
        ) : (
          <></>
        )}
        <div className="weather-info">
          <div style={{ fontSize: 18, marginBottom: 6, marginTop: -12 }}>
            {weather.temp} °C
          </div>
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
