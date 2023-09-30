import React from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel/Carousel";
import CityInfo from "./CityInfo/CityInfo";
import WorldMap from "./WorldMap/WorldMap";

function Main() {
  const drawnCountry = useSelector((state) => state.wiki.drawnCountry);
  //return <>{drawnCountry ? <WorldMap /> : <Carousel />}</>;

  return <WorldMap />;
  //return <Carousel />;
}

export default Main;
