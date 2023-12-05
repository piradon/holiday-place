import axios from "axios";

export async function fetchWeather(cityId) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?id=${cityId}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=metric`
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
