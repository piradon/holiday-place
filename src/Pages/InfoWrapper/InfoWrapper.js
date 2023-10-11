import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WorldMap from "../WorldMap/WorldMap";
import CityInfo from "../CityInfo/CityInfo";

function InfoWrapper() {
  const wikiCountryInfo = useSelector((state) => state.wiki.wikiCountryInfo);
  useEffect(() => {}, []);

  if (wikiCountryInfo !== null) {
    return <CityInfo />;
  }

  return <WorldMap />;
}

export default InfoWrapper;
