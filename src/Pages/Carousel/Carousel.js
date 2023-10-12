import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawnCountry } from "../CityInfo/cityInfoSlice";
import { listFlag } from "../../constants/countries";
import "./Carousel.css";

const Carousel = () => {
  const [countries, setCountries] = useState(null);
  const [isMounted, setIsMounted] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // wiki()
    //   .page("Germany")
    //   .then((page) => page.info())
    //   .then(console.log);

    const countries = listFlag.sort((a, b) => 0.5 - Math.random()).slice(0, 29);
    setCountries(countries);

    // wiki()
    //   .page(countries[26].n)
    //   .then((page) => page.summary())
    //   .then((summary) => dispatch(setWikiContent(summary)));

    // wiki()
    //   .page(countries[26].n)
    //   .then((page) => page.mainImage())
    //   .then((image) => dispatch(setWikiImage(image)));
  }, [dispatch]);

  const onDrawend = () => {
    dispatch(setDrawnCountry(countries[26]));
  };

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
  };

  if (!countries) {
    return <div>LOADER</div>;
  }

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
          className={`carousel-slides ${isMounted ? "" : "unmounted-style"}`}
        >
          {listFlag.map((x, i) => (
            <div style={{ padding: "20px" }}>
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${x.cd}.svg`}
                width="200"
                alt="flag"
              />
              <div className="flag-caption">{x.n}</div>
            </div>
          ))}
        </div>
        <div className="draw-indicator" />
        <div className="carousel-blur" />
      </div>
      <button
        style={{ width: "200px", marginTop: "125px" }}
        onClick={handleToggleClicked}
        className="my-button"
      >
        Draw Country!
      </button>
    </div>
  );
};

export default Carousel;
