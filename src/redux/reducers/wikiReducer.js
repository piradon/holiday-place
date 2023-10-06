import { types } from "../types/wiki";

const initialState = {
  drawnCountry: null,
  drawnCountries: null,
  wikiCountryInfo: null,
  wikiCityInfo: null,
  wikiImage: null,
  drawnCity: null,
  drawnCityCoords: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DRAWN_COUNTRY: {
      return {
        ...state,
        drawnCountry: action.payload,
      };
    }
    case types.SET_DRAWN_COUNTRIES: {
      return {
        ...state,
        drawnCountries: action.payload,
      };
    }
    case types.SET_WIKI_CONTENT: {
      return {
        ...state,
        wikiContent: action.payload,
      };
    }
    case types.SET_WIKI_IMAGE: {
      return {
        ...state,
        wikiImage: action.payload,
      };
    }
    case types.SET_DRAWN_CITY: {
      return {
        ...state,
        drawnCity: action.payload,
      };
    }
    case types.SET_DRAWN_CITY_COORDS: {
      return {
        ...state,
        drawnCityCoords: action.payload,
      };
    }
    case types.SET_WIKI_COUNTRY_INFO: {
      return {
        ...state,
        wikiCountryInfo: action.payload,
      };
    }
    case types.SET_WIKI_CITY_INFO: {
      return {
        ...state,
        wikiCityInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default weatherReducer;
