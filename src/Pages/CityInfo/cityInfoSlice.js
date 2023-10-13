import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Nominatim from "nominatim-geocoder";
import wiki from "wikijs";

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
};

export const getDrawnCityName = createAsyncThunk(
  "drawnCity/getDrawnCityName",
  async ({ lat, lon }) => {
    const drawnCityName = await geocoder
      .reverse({ lat: lat, lon: lon })
      .then((response) => {
        const city =
          response.address.city ||
          response.address.town ||
          response.address.hamlet ||
          response.address.state;
        return city;
      });

    return drawnCityName;
  }
);

export const getSummary = createAsyncThunk("summary/getSummary", async () => {
  const summary = await wiki()
    .page("Germany")
    .then((page) => page.summary())
    .then((summary) => {
      return summary;
    });

  return summary;
});

export const getWikiImage = createAsyncThunk(
  "wikiImage/getWikiImage",
  async (drawnCountry) => {
    const wikiImage = await wiki()
      .page(drawnCountry)
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
