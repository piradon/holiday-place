import React, { useState, useEffect } from "react";
import wiki from "wikijs";

import { fetchWikiData } from "../../api/wikipediaApi";
const CityInfo = () => {
  const [info, setInfo] = useState();

  useEffect(() => {
    wiki()
      .page("Warsaw")
      .then((page) => page.summary())
      .then(setInfo); // Bruce Wayne

    // wiki()
    // .page("London")
    // .then((page) => page.content())
    // .then(console.log);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  if (info) {
    return <div>{info}</div>;
  }

  return <div>Loader</div>;
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
