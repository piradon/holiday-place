import React, { useEffect } from "react";
import Carousel from "./Carousel";
import {
  setDrawnCountry,
  getListOfCities,
  getCityImage,
  getCitySummary,
} from "../CityInfo/cityInfoSlice";
import { getWeather } from "../Weather/weatherSlice";
import { listFlag } from "../../constants/countries";
import { useDispatch, useSelector } from "react-redux";

const CarouselContainer = () => {
  const dispatch = useDispatch();
  const drawnCity = useSelector((state) => state.cityInfo.drawnCity);
  const cityCoordinates = useSelector(
    (state) => state.cityInfo.cityCoordinates
  );
  const citySummary = useSelector((state) => state.cityInfo.citySummary);

  useEffect(() => {
    const countries = listFlag.sort((a, b) => 0.5 - Math.random()).slice(0, 29);
    dispatch(getListOfCities(countries[26].n));
    dispatch(setDrawnCountry(countries[26]));
  }, [dispatch]);

  useEffect(() => {
    if (drawnCity) {
      dispatch(getCityImage(drawnCity));
    }

    if (!citySummary) {
      dispatch(getCitySummary(drawnCity));
    }

    if (cityCoordinates) {
      dispatch(
        getWeather({
          lat: cityCoordinates.latitude,
          lon: cityCoordinates.longitude,
        })
      );
    }
  }, [drawnCity, citySummary, cityCoordinates, dispatch]);

  return <Carousel />;
};

export default CarouselContainer;
