import React, { useEffect } from "react";
import WorldMap from "../WorldMap/WorldMap";
import { useSelector } from "react-redux";
import "./CityInfo.css";

const CityInfo = () => {
  const summary = useSelector((state) => state.cityInfo.summary);
  const wikiImage = useSelector((state) => state.cityInfo.wikiImage);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="city-container">
      <div className="city-info-wrapper">
        {/* <img
              src={wikiImage}
              alt="Girl in a jacket"
              style={{
                width: "40%",
                height: "auto",
                float: "right",
                padding: "2em",
              }}
            /> */}

        <WorldMap />
        {summary !== null && <div className="summary-wrapper">{summary}</div>}
      </div>
    </div>
  );
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
