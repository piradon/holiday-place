import React, { useEffect, useState } from "react";
import WorldMap from "../WorldMap/WorldMap";
import { useSelector } from "react-redux";
import "./CityInfo.css";

const CityInfo = () => {
  const summary = useSelector((state) => state.cityInfo.summary);
  const wikiImage = useSelector((state) => state.cityInfo.wikiImage);
  const drawnCity = useSelector((state) => state.cityInfo.drawnCity);

  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

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
              style={isImageLoaded ? {} : { display: "none" }}
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
      </div>
    </div>
  );
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
