import { combineReducers } from "redux";
import wiki from "./wikiReducer";
import weather from "./weatherReducer";

const RootReducer = combineReducers({
  wiki,
  weather,
});

export default RootReducer;
