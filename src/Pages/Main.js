import React from "react";
import CarouselContainer from "./Carousel/CarouselContainer";
import CityInfo from "./CityInfo/CityInfo";
import { useSelector } from "react-redux";

function Main() {
  const inCarousel = useSelector((state) => state.cityInfo.inCarousel);

  return <>{inCarousel ? <CarouselContainer /> : <CityInfo />}</>;
}

export default Main;
