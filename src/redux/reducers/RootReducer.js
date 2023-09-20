import { combineReducers } from "redux";
import weather from "./weatherReducer";

const RootReducer = combineReducers({
  weather,
});

export default RootReducer;
