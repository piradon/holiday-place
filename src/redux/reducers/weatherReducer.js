import { types } from "../types/weather";

const initialState = {
  temperature: 100,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_WEATHER_DATA: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default weatherReducer;
