import React, { useEffect, useState } from "react";
import WorldMap from "../WorldMap/WorldMap";
import CityClimate from "../Weather/Weather";
import { getDrawnCityNameWeather, getCityWeather } from "./cityInfoSlice";
import { useSelector, useDispatch } from "react-redux";
import "./CityInfo.css";

const CityInfo = () => {
  const summary = useSelector((state) => state.cityInfo.summary);
  const wikiImage = useSelector((state) => state.cityInfo.wikiImage);
  const drawnCity = useSelector((state) => state.cityInfo.drawnCity);
  const drawnCityCoords = useSelector(
    (state) => state.cityInfo.drawnCityCoords
  );

  const [isImageLoaded, setImageLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (drawnCityCoords) {
      dispatch(
        getDrawnCityNameWeather({
          lat: drawnCityCoords.lat,
          lon: drawnCityCoords.lon,
        })
      );
      dispatch(
        getCityWeather({
          lat: drawnCityCoords.lat,
          lon: drawnCityCoords.lon,
        })
      );
    }
  }, [drawnCityCoords, dispatch]);

  return (
    <div className="city-container">
      <div className="city-info-wrapper">
        <div style={{ width: summary ? "400px" : "" }}>
          <WorldMap />
          {wikiImage && (
            <img
              src={wikiImage}
              width="400"
              alt="flag"
              className="city-img"
              style={
                isImageLoaded &&
                wikiImage !==
                  "https://upload.wikimedia.org/wikipedia/en/5/5f/Disambig_gray.svg"
                  ? {}
                  : { display: "none" }
              }
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
          )}
        </div>
        {summary !== null && (
          <div className="summary-wrapper">
            <h1 className="city-info-hdr">{drawnCity}</h1>
            <hr className="city-info-ur" />
            {<div className="summary-container">{summary}</div>}
          </div>
        )}
        {isImageLoaded && wikiImage && drawnCity && <CityClimate />}
      </div>
    </div>
  );
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
