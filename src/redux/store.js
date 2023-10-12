import { configureStore } from "@reduxjs/toolkit";
import cityInfoReducer from "../Pages/CityInfo/cityInfoSlice";

const store = configureStore({
  reducer: {
    cityInfo: cityInfoReducer,
  },
  devTools: true,
});

export default store;
