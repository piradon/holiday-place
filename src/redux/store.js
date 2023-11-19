import { configureStore } from "@reduxjs/toolkit";
import cityInfoReducer from "../Pages/CityInfo/cityInfoSlice";
import weatherReducer from "../Pages/Weather/weatherSlice";

const store = configureStore({
  reducer: {
    cityInfo: cityInfoReducer,
    weather: weatherReducer,
  },
  devTools: true,
});

export default store;
