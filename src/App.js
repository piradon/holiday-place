import React from "react";
import Main from "./Pages/Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
