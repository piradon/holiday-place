import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import wiki from "wikijs";
import "./CityInfo.css";

const CityInfo = () => {
  const [info, setInfo] = useState();
  const [image, setImage] = useState();
  const [test, setTest] = useState();

  const drawnCountry = useSelector((state) => state.wiki.drawnCountry);
  const wikiContent = useSelector((state) => state.wiki.wikiContent);
  const wikiImage = useSelector((state) => state.wiki.wikiImage);

  useEffect(() => {
    // wiki()
    //   .page(drawnCountry.n)
    //   .then((page) => page.summary())
    //   .then(setInfo);

    wiki()
      .page(drawnCountry.n)
      .then((page) => page.mainImage())
      .then(setImage);
    // wiki()
    //   .page("Poland")
    //   .then((page) => page.content())
    //   .then(setTest);

    // wiki()
    //   .page("Warsaw")
    //   .then((page) => page.mainImage())
    //   .then((imageUrl) => {
    //     // Modify the image URL to get a lower resolution version
    //     const lowerResolutionUrl = imageUrl
    //       .replace("/commons/", "/commons/thumb/")
    //       .replace(".jpg", ".jpg/200px-Warsaw.jpg.png");
    //     setImage(lowerResolutionUrl);
    //     console.log(lowerResolutionUrl);
    //     // Do something with the lower resolution image URL
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    return () => {};
  }, []);

  if (wikiContent && wikiImage) {
    return (
      <div className="city-container">
        <div className="city-info-wrapper">
          <div className="city-info">
            <img
              src={wikiImage}
              alt="Girl in a jacket"
              style={{
                width: "40%",
                height: "auto",
                float: "right",
                padding: "2em",
              }}
            />
            <div>{wikiContent}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loader</div>;
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
