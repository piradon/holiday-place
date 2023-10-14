import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel/Carousel";
import CityInfo from "./CityInfo/CityInfo";
import WorldMap from "./WorldMap/WorldMap";
import InfoWrapper from "./InfoWrapper/InfoWrapper";
import UsMap from "./WorldMap/Usmap";

function Main() {
  const summary = useSelector((state) => state.cityInfo.summary);

  useEffect(() => {
    console.log(summary);
  }, []);

  //const drawnCountry = useSelector((state) => state.wiki.drawnCountry);
  //return <>{drawnCountry ? <WorldMap /> : <Carousel />}</>;
  return (
    <>
      {/* <InfoWrapper/> */}
      <CityInfo />
      {/* {summary && <CityInfo />} */}
      {/* <InfoWrapper /> */}
    </>
  );

  //return <Carousel />;
}

export default Main;
