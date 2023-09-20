import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CityClimate from "./Pages/CityClimate";
import Draw from "./Pages/Draw/Draw";
import Carousel from "./Pages/Carousel";
import CityInfo from "./Pages/CityInfo/CityInfo";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      {/* <div className="wrapper"> */}
      {/*<Carousel /> */}
      {/* <CityInfo /> */}
      <CityClimate />
      {/* </div> */}
    </Provider>
  );
}

export default App;
