import { types } from "../types/wiki";

const initialState = {
  drawnCountry: null,
  drawnCountries: null,
  wikiContent: null,
  wikiImage: null,
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

    default:
      return state;
  }
};

export default weatherReducer;
