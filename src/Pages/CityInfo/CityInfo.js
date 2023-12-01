import React from "react";
import CityClimate from "../Weather/Weather";
import { resetAll } from "./cityInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import "./CityInfo.css";

const CityInfo = () => {
  const dispatch = useDispatch();

  const citySummary = useSelector((state) => state.cityInfo.citySummary);
  const cityImage = useSelector((state) => state.cityInfo.cityImage);
  const drawnCity = useSelector((state) => state.cityInfo.drawnCity);
  const drawnCountry = useSelector((state) => state.cityInfo.drawnCountry);
  const cityPopulation = useSelector((state) => state.cityInfo.cityPopulation);
  const currentWeather = useSelector((state) => state.weather.currentWeather);

  if (citySummary && cityImage && drawnCity) {
    return (
      <>
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${cityImage})`,
            minHeight: "100%",
            backgroundPosition: "center",
          }}
        />

        <div className="sidebar-container">
          <div className="sidebar">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1>{drawnCity}</h1>
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${drawnCountry.cd}.svg`}
                  width="75"
                  alt="flag"
                />
              </div>
              {cityPopulation && (
                <p style={{ marginTop: "-8px" }}>
                  Population: {cityPopulation}
                </p>
              )}

              {citySummary.map((x, i) => {
                if (i < 5 && x.content !== "") {
                  return (
                    <div style={{ marginTop: "20px" }}>
                      <h4>{x.title}</h4>
                      <p>{x.content.split(".")[0]}.</p>
                    </div>
                  );
                }
                return <></>;
              })}
              {currentWeather && <CityClimate />}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="draw-btn reset-btn"
                onClick={() => dispatch(resetAll())}
              >
                Try Again!
              </button>
            </div>
          </div>
        </div>
        <div className="sidebar-pattern" />
      </>
    );
  }
  return <></>;
};

export default CityInfo;
