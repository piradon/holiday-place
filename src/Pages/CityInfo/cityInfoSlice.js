import Nominatim from "nominatim-geocoder";
import wiki from "wikijs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const geocoder = new Nominatim();

const initialState = {
  citySummary: null,
  cityImage: null,
  cityPopulation: null,
  cityCoordinates: null,
  isCityLoading: false,
  error: null,
  drawnCountry: null,
  drawnCountries: null,
  drawnCity: null,
  drawnCityCoords: null,
  inCarousel: true,
  inCityInfo: false,
};

function getRandomInRange(from, to) {
  return (Math.random() * (to - from) + from).toFixed(0);
}

export const getListOfCities = createAsyncThunk(
  "drawnCity/getListOfCities",
  async (drawnCountry) => {
    let response = await fetch(
      `https://api.teleport.org/api/cities/?search=${drawnCountry}&limit=5`
    );
    if (response.ok) {
      let json = await response.json();
      const cityCount = json.count;

      const drawnElement = getRandomInRange(0, cityCount - 1);
      const drawnCityUrl =
        json._embedded["city:search-results"][drawnElement]._links["city:item"]
          .href;

      let responsee = await fetch(drawnCityUrl);
      let jsonn = await responsee.json();
      const cityName = jsonn.name;
      const cityPopulation = jsonn.population;
      const cityCoordinates = jsonn.location.latlon;

      return {
        cityName: cityName,
        cityPopulation: cityPopulation,
        cityCoordinates: cityCoordinates,
      };
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

export const getCitySummary = createAsyncThunk(
  "citySummary/getCitySummary",
  async (drawnCity) => {
    const citySummary = await wiki()
      .page(drawnCity)
      .then((page) => page.content())
      .then((content) => {
        return content;
      });

    return citySummary;
  }
);

export const getCityImage = createAsyncThunk(
  "cityImage/getCityImage",
  async (drawnCity) => {
    const cityImage = await wiki()
      .page(drawnCity)
      .then((page) => page.mainImage())
      .then((image) => {
        return image;
      });

    return cityImage;
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
    goCityInfo: (state, action) => {
      state.inCarousel = false;
      state.inCityInfo = true;
    },
    resetAll: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDrawnCityName.pending, (state, action) => {});
    builder.addCase(getDrawnCityName.fulfilled, (state, action) => {
      state.isCityLoading = false;
      state.drawnCity = action.payload;
    });
    builder.addCase(getDrawnCityName.rejected, (state, action) => {});
    builder.addCase(getCitySummary.pending, (state) => {
      state.isCityLoading = true;
    });
    builder.addCase(getCitySummary.fulfilled, (state, action) => {
      state.isCityLoading = false;
      state.citySummary = action.payload;
    });
    builder.addCase(getCitySummary.rejected, (state, action) => {
      state.isCityLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCityImage.pending, (state, action) => {});
    builder.addCase(getCityImage.fulfilled, (state, action) => {
      state.cityImage = action.payload;
    });
    builder.addCase(getCityImage.rejected, (state, action) => {});
    builder.addCase(getListOfCities.fulfilled, (state, action) => {
      state.drawnCity = action.payload.cityName;
      state.cityPopulation = action.payload.cityPopulation;
      state.cityCoordinates = action.payload.cityCoordinates;
    });
  },
});

export const {
  setDrawnCountry,
  setDrawnCountries,
  setDrawnCity,
  setDrawnCityCoords,
  goCityInfo,
  resetAll,
} = cityInfoSlice.actions;

export default cityInfoSlice.reducer;
