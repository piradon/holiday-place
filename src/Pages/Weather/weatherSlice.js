import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: {},
};

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async ({ lat, lon }) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=metric`
    );
    if (response.ok) {
      let json = await response.json();
      return json;
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      //state.isLoading = false;
      state.currentWeather = {
        temp: action.payload.main.temp,
        pressure: action.payload.main.pressure,
        humidity: action.payload.main.humidity,
        windSpeed: action.payload.wind.speed,
        windDeg: action.payload.wind.deg,
        icon: action.payload.weather[0].icon,
        description: action.payload.weather[0].description,
      };
    });
    builder.addCase(getWeather.rejected, (state, action) => {});
  },
});

export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
