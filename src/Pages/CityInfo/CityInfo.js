import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./CityInfo.css";

const CityInfo = () => {
  const wikiContent = useSelector((state) => state.wiki.wikiContent);
  const wikiImage = useSelector((state) => state.wiki.wikiImage);

  useEffect(() => {
    return () => {};
  }, []);

  if (wikiContent && wikiImage) {
    return (
      <div className="city-container">
        <div className="city-info-wrapper">
          <div className="city-info">
            <img
              src={wikiImage}
              alt="Girl in a jacket"
              style={{
                width: "40%",
                height: "auto",
                float: "right",
                padding: "2em",
              }}
            />
            <div>{wikiContent}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loader</div>;
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
