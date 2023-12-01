import React, { useState, useEffect } from "react";
import {
  getListOfCities,
  getCityImage,
  setDrawnCountry,
  getCitySummary,
} from "../CityInfo/cityInfoSlice";
import { getWeather } from "../Weather/weatherSlice";
import { listFlag } from "../../constants/countries";
import { goCityInfo } from "../CityInfo/cityInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Carousel.css";

const Carousel = () => {
  const dispatch = useDispatch();
  const drawnCity = useSelector((state) => state.cityInfo.drawnCity);
  const cityCoordinates = useSelector(
    (state) => state.cityInfo.cityCoordinates
  );
  const drawnCountry = useSelector((state) => state.cityInfo.drawnCountry);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const countries = listFlag.sort((a, b) => 0.5 - Math.random()).slice(0, 29);
    dispatch(getListOfCities(countries[26].n));
    dispatch(setDrawnCountry(countries[26]));
  }, [dispatch]);

  const handleToggleClicked = () => {
    dispatch(getCityImage(drawnCity));
    dispatch(getCitySummary(drawnCity));
    dispatch(
      getWeather({
        lat: cityCoordinates.latitude,
        lon: cityCoordinates.longitude,
      })
    );
    setIsMounted(!isMounted);
  };

  const onDrawend = () => {
    dispatch(goCityInfo());
  };

  return (
    <>
      {drawnCountry && (
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
          <div className="carousel" onAnimationEnd={onDrawend}>
            <div
              className={`carousel-slides ${
                isMounted ? "" : "unmounted-carousel"
              }`}
            >
              {listFlag.map((x, i) => (
                <div style={{ padding: "20px" }}>
                  <img
                    className="flag"
                    src={`https://hatscripts.github.io/circle-flags/flags/${x.cd}.svg`}
                    width="200"
                    alt="flag"
                  />
                  <div className="flag-caption">{x.n}</div>
                </div>
              ))}
            </div>
            <div className="draw-indicator" />
          </div>
          <button onClick={handleToggleClicked} className="draw-btn reset-btn">
            Draw Country!
          </button>
        </div>
      )}
    </>
  );
};

export default Carousel;
