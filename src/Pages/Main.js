import React from "react";
import Carousel from "./Carousel/Carousel";
import CityInfo from "./CityInfo/CityInfo";
import { useSelector } from "react-redux";

function Main() {
  const drawnCountry = useSelector((state) => state.cityInfo.drawnCountry);

  return <>{drawnCountry ? <CityInfo /> : <Carousel />}</>;
}

export default Main;
