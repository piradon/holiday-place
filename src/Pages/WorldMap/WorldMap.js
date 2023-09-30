// import React, { useState } from "react";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from "react-simple-maps";
// import { topos } from "./topos";
// import { topo } from "./topo";

// import * as d3 from "d3";

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const MapChart = () => {
//   const [zoom, setZoom] = useState(1);
//   const [center, setCenter] = useState([0, 0]);

//   const handleGeographyClick = (geography, event) => {
//     event.persist();
//     const bounds = d3.geoBounds(geography);
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const x = (bounds[1][0] - bounds[0][0]) / width;
//     const y = (bounds[1][1] - bounds[0][1]) / height;
//     const zoomLevel = Math.max(x, y);
//     console.log(zoomLevel);
//     console.log(d3.geoCentroid(geography));
//     setZoom(zoomLevel*100);
//     setCenter(d3.geoCentroid(geography));
//   };

//   return (
//     <ComposableMap projectionConfig={{ scale: 200 }} width={980} height={551}>
//       <ZoomableGroup center={center} zoom={zoom}>
//         <Geographies geography={topos}>
//           {({ geographies }) =>
//             geographies &&
//             geographies.map((geography) => (
//               <Geography
//                 key={geography.rsmKey}
//                 geography={geography}
//                 onClick={(event) => handleGeographyClick(geography, event)}
//               />
//             ))
//           }
//         </Geographies>
//       </ZoomableGroup>
//     </ComposableMap>
//   );
// };

// export default MapChart;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Graticule,
//   ZoomableGroup,
//   Marker,
// } from "react-simple-maps";
// import { geoCentroid, geoPath } from "d3-geo";
// import { geoTimes } from "d3-geo-projection";
// import { shorte } from "./shorte";

// import "./WorldMap.css";

// const mapWidth = 400;
// const mapHeight = 300;

// const WorldMap = () => {
//   const [geographies, setGeographies] = useState(null);
//   const [center, setCenter] = useState([0, 0]);
//   const [zoom, setZoom] = useState(1);
//   const drawnCountry = useSelector((state) => state.wiki.drawnCountry);

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         height: "100%",
//         maxWidth: "1200px",
//         border: "1px solid red",
//         margin: "auto",
//       }}
//     >
//       <ComposableMap
//         projectionConfig={{
//           scale: 45,
//           rotation: [-11, 0, 0],
//         }}
//         width={mapWidth}
//         height={mapHeight}
//         projection="geoMercator"
//       >
//         {/* <Graticule stroke="white" strokeWidth={0.3} /> */}
//         <ZoomableGroup center={center} zoom={zoom}>
//           <Geographies geography={shorte}>
//             {({ geographies }) =>
//               geographies.map((geo) => {
//                 console.log(geo.properties.name);
//                 console.log(drawnCountry.n);
//                 return (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     stroke="black"
//                     strokeWidth={0.3}
//                     fill={
//                       drawnCountry.n === geo.properties.name
//                         ? "#F53"
//                         : "#ffffff"
//                     }
//                     style={{
//                       default: { outline: "none" },
//                       hover: {
//                         outline: "none",
//                         // fill: "#F53"
//                       },
//                       pressed: { outline: "none" },
//                     }}
//                   />
//                 );
//               })
//             }
//           </Geographies>
//           {/* <Marker coordinates={[-74.006, 40.7128]}>
//             <circle r={2} fill="#F53" />
//             <circle r={1} fill="#F53" />
//           </Marker> */}
//         </ZoomableGroup>
//       </ComposableMap>
//     </div>
//   );
// };

// export default WorldMap;


import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import albertusatopos from './albertusatopos.json';

function D3Map() {
  useEffect(() => {
    const width = 975;
    const height = 610;

    const svg = d3
      .select("#map")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);

    const path = d3.geoPath();
    const g = svg.append("g");

    const states = g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(feature(albertusatopos, albertusatopos.objects.states).features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);

    states.append("title").text((d) => d.properties.name);

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path(mesh(albertusatopos, albertusatopos.objects.states, (a, b) => a !== b)));

    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
    svg.call(zoom);

    function reset() {
      states.transition().style("fill", null);
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
    }

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      states.transition().style("fill", null);
      d3.select(this).transition().style("fill", "red");
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
    }

    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }
  }, []);

  return <div id="map" style={{ width: '100%' }} />;
}

export default D3Map;