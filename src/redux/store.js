import { createStore, compose } from "redux";
import RootReducer from "./reducers/RootReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers());
export default store;
