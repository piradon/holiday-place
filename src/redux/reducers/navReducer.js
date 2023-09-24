import { types } from "../types/nav";

const initialState = {
  inDrawnPhase: true,
  inWikiPhase: false,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GO_WIKI_PHASE: {
      return {
        ...state,
        inDrawnPhase: false,
        inWikiPhase: true,
      };
    }

    default:
      return state;
  }
};

export default weatherReducer;
