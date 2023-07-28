import axios from "axios";

const OPEN_WEATHER_KEY = "a5f41a2b2831c27a023da0a5de4d1907";

export async function fetchWeather(cityId) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?id=${cityId}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );

    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    if (error.response) {
      throw new Error(error.respnse.data);
    } else {
      throw new Error(error.message);
    }
  }
}
