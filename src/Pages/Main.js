import React from "react";
import Carousel from "./Carousel/Carousel";
import CityInfo from "./CityInfo/CityInfo";
import { useSelector } from "react-redux";

function Main() {
  const inCarousel = useSelector((state) => state.cityInfo.inCarousel);

  return <>{inCarousel ? <Carousel /> : <CityInfo />}</>;
}

export default Main;