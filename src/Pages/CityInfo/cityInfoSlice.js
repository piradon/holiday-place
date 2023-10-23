import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Nominatim from "nominatim-geocoder";
import wiki from "wikijs";
const OPEN_WEATHER_KEY = "a5f41a2b2831c27a023da0a5de4d1907";

const geocoder = new Nominatim();

const initialState = {
  summary: null,
  isLoading: false,
  error: null,
  drawnCountry: null,
  drawnCountries: null,
  drawnCity: null,
  drawnCityCoords: null,
  wikiImage: null,
  weather: {},
};

export const getDrawnCityNameWeather = createAsyncThunk(
  "drawnCity/getDrawnCityNameWeather",
  async ({ lat, lon }) => {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPEN_WEATHER_KEY}`
    );
    if (response.ok) {
      console.log("DRAWN CITY NAME ");
      let json = await response.json();
      console.log(JSON.stringify(json, null, 2));
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }
);

export const getCityWeather = createAsyncThunk(
  "drawnCity/getCityWeather",
  async ({ lat, lon }) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    if (response.ok) {
      console.log("WEATHER");
      let json = await response.json();
      console.log(JSON.stringify(json, null, 2));
      return json;
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }
);

export const getDrawnCityName = createAsyncThunk(
  "drawnCity/getDrawnCityName",
  async ({ lat, lon }) => {
    const drawnCityName = await geocoder
      .reverse({ lat: lat, lon: lon })
      .then((response) => {
        const city =
          response.address.city ||
          response.address.town ||
          response.address.village ||
          response.address.county ||
          response.address.hamlet ||
          response.address.state;
        return city;
      });
    return drawnCityName;
  }
);

export const getSummary = createAsyncThunk(
  "summary/getSummary",
  async (drawnCity) => {
    const summary = await wiki()
      .page(drawnCity)
      .then((page) => page.summary())
      .then((summary) => {
        return summary;
      });

    return summary;
  }
);

export const getWikiImage = createAsyncThunk(
  "wikiImage/getWikiImage",
  async (drawnCity) => {
    const wikiImage = await wiki()
      .page(drawnCity)
      .then((page) => page.mainImage())
      .then((image) => {
        console.log(image);
        return image;
      });

    return wikiImage;
  }
);

const cityInfoSlice = createSlice({
  name: "cityInfo",
  initialState,
  reducers: {
    setDrawnCountry: (state, action) => {
      state.drawnCountry = action.payload;
    },
    setDrawnCountries: (state, action) => {
      state.drawnCountries = action.payload;
    },
    setDrawnCityCoords: (state, action) => {
      state.drawnCityCoords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDrawnCityName.pending, (state, action) => {
      //state.isLoading = false;
      //state.error = action.error.message;
    });
    builder.addCase(getDrawnCityName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.drawnCity = action.payload;
    });
    builder.addCase(getDrawnCityName.rejected, (state, action) => {
      //state.isLoading = false;
      //state.error = action.error.message;
    });
    builder.addCase(getDrawnCityNameWeather.fulfilled, (state, action) => {
      //state.isLoading = false;
      //state.drawnCity = action.payload;
    });
    builder.addCase(getDrawnCityNameWeather.rejected, (state, action) => {
      //state.isLoading = false;
      //state.error = action.error.message;
    });
    builder.addCase(getCityWeather.fulfilled, (state, action) => {
      //state.isLoading = false;
      state.weather = {
        temp: action.payload.main.temp,
        pressure: action.payload.main.pressure,
        humidity: action.payload.main.humidity,
        windSpeed: action.payload.wind.speed,
        windDeg: action.payload.wind.deg,
        icon: action.payload.weather[0].icon,
        description: action.payload.weather[0].description,
      };
    });
    builder.addCase(getCityWeather.rejected, (state, action) => {
      //state.isLoading = false;
      //state.error = action.error.message;
    });
    builder.addCase(getSummary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSummary.fulfilled, (state, action) => {
      console.log(state, action);
      state.isLoading = false;
      state.summary = action.payload;
    });
    builder.addCase(getSummary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getWikiImage.pending, (state, action) => {
      //state.isLoading = false;
      //state.error = action.error.message;
    });
    builder.addCase(getWikiImage.fulfilled, (state, action) => {
      //state.isLoading = false;
      state.wikiImage = action.payload;
    });
    builder.addCase(getWikiImage.rejected, (state, action) => {
      //state.isLoading = false;
      //state.error = action.error.message;
    });
  },
});

export const {
  setDrawnCountry,
  setDrawnCountries,
  setDrawnCity,
  setDrawnCityCoords,
} = cityInfoSlice.actions;

export default cityInfoSlice.reducer;
