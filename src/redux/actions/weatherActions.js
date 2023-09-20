import { types } from "../types/weather";

export function loadWeatherData(payload) {
  return {
    type: types.LOAD_WEATHER_DATA,
    payload,
  };
}
