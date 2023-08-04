import React from "react";
import Main from "./Pages/Main";
import Draw from "./Pages/Draw/Draw";
import Carousel from "./Pages/Carousel";
import "./App.css";

const data = [
  {
    title: "1111",
    description: "11111",
  },
  {
    title: "2222",
    description: "22222",
  },
  {
    title: "3333",
    description: "333",
  },
  {
    title: "55555",
    description: "55555",
  },
  {
    title: "6666",
    description: "6666",
  },
  {
    title: "7777",
    description: "7777",
  },
];

function App() {
  return (
    //<div className="wrapper">
      <Carousel slides={data} step={10} maxTransitions={10} />
    //</div>
  );
}

export default App;
