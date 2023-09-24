import React from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import CityInfo from "./CityInfo/CityInfo";

function Main() {
  const drawnCountry = useSelector((state) => state.wiki.drawnCountry);
  return <>{drawnCountry ? <CityInfo /> : <Carousel />}</>;
}

export default Main;
