import React, { useState, useEffect } from "react";
import wiki from "wikijs";
import { fetchWikiData } from "../../api/wikipediaApi";
import "./CityInfo.css";

const CityInfo = () => {
  const [info, setInfo] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    wiki()
      .page("Poland")
      .then((page) => page.summary())
      .then(setInfo);

    wiki()
      .page("Cracov")
      .then((page) => page.mainImage())
      .then(setImage);

    // wiki()
    //   .page("Cracov")
    //   .then((page) => page.images())
    //   .then(setImage); // Bruce Wayne

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

    // wiki()
    // .page("London")
    // .then((page) => page.content())
    // .then(console.log);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  if (info && image) {
    return (
      <div className="city-container">
        <div className="city-info-wrapper">
          {/* <div className="city-title">Warsaw</div> */}

          <div className="city-info">
            <img
              src={image}
              alt="Girl in a jacket"
              style={{
                width: "40%",
                height: "auto",
                float: "right",
                padding: "2em",
              }}
            />
            <div>{info}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loader</div>;
};

export default CityInfo;

////https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=London
