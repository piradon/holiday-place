import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wiki from "wikijs";

const initialState = {
  summary: null,
  isLoading: false,
  error: null,
  drawnCountry: null,
  drawnCountries: null,
  drawnCity: null,
  drawnCityCoords: null,
  wikiSummary: null,
  wikiImage: null,
};

export const getSummary = createAsyncThunk("summary/getSummary", async () => {
  await wiki()
    .page("Germany")
    .then((page) => page.summary())
    .then((summary) => {
      return summary;
    });
});

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
    setDrawnCity: (state, action) => {
      state.drawnCity = action.payload;
    },
    setDrawnCityCoords: (state, action) => {
      state.drawnCityCoords = action.payload;
    },
    setWikiImage: (state, action) => {
      state.wikiImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSummary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSummary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.summary = action.payload;
    });
    builder.addCase(getSummary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  setDrawnCountry,
  setDrawnCountries,
  setDrawnCity,
  setDrawnCityCoords,
  setWikiSummary,
  setWikiImage,
} = cityInfoSlice.actions;

export default cityInfoSlice.reducer;
