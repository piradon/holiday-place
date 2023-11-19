import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as ClearSky } from "../../icons/clear-sky.svg";
import { ReactComponent as Rain } from "../../icons/rain.svg";
import { ReactComponent as Thunderstorm } from "../../icons/thunderstorm.svg";
import { ReactComponent as Drizzle } from "../../icons/drizzle.svg";
import { ReactComponent as Snow } from "../../icons/snow.svg";
import { ReactComponent as Cloud } from "../../icons/cloud.svg";
import { ReactComponent as Overcast } from "../../icons/overcast.svg";
import { ReactComponent as Fog } from "../../icons/fog.svg";
import "./Weather.css";

function CityClimate() {
  const currentWeather = useSelector((state) => state.weather.currentWeather);

  const { temp, icon, windSpeed, humidity, description } = currentWeather;

  if (Object.keys(currentWeather).length !== 0) {
    return (
      <div className="weather-container">
        {icon === "01n" || icon === "01d" ? (
          <ClearSky width="24px" />
        ) : icon === "10n" ? (
          <Rain />
        ) : icon === "11n" || icon === "10d" ? (
          <Thunderstorm />
        ) : icon === "09n" ? (
          <Drizzle />
        ) : icon === "13n" ? (
          <Snow />
        ) : icon === "03n" || icon === "02n" || icon === "02d" ? (
          <Cloud />
        ) : icon === "04n" || icon === "04d" || icon === "03d" ? (
          <Overcast />
        ) : icon === "50n" || icon === "50d" ? (
          <Fog />
        ) : (
          <></>
        )}
        <div className="weather-info">
          <div style={{ fontSize: 18 }}>{temp} °C</div>
          <div>{windSpeed} m/s</div>
          <div>{humidity} %</div>
          <div>{description}</div>
        </div>
      </div>
    );
  }

  return <></>;
}

export default CityClimate;
