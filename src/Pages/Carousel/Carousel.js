import React, { useState } from "react";
import { listFlag } from "../../constants/countries";
import { goCityInfo } from "../CityInfo/cityInfoSlice";
import { useDispatch } from "react-redux";
import "./Carousel.css";

const Carousel = () => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(true);

  const onDrawend = () => {
    dispatch(goCityInfo());
  };

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
  };

  return (
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
          className={`carousel-slides ${isMounted ? "" : "unmounted-carousel"}`}
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
      <button onClick={handleToggleClicked} className="draw-btn">
        Draw Country!
      </button>
    </div>
  );
};

export default Carousel;
