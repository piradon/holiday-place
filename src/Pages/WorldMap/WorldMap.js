import React, { useEffect, useState } from "react";
import Nominatim from "nominatim-geocoder";
import { useSelector, useDispatch } from "react-redux";
import {
  setDrawnCityCoords,
  getSummary,
  getDrawnCityName,
  getWikiImage,
} from "../CityInfo/cityInfoSlice";
import * as d3 from "d3";
import { shorte } from "./shorte.js";
import "./WorldMap.css";

const geocoder = new Nominatim();

function WorldMap() {
  const wikiImage = useSelector((state) => state.cityInfo.wikiImage);
  const dispatch = useDispatch();
  dispatch(getSummary());
  dispatch(getDrawnCityName({ lat: 48, lon: 2 }));
  dispatch(getWikiImage("Germany"));

  useEffect(() => {
    let dCity = null;
    const width = window.innerWidth;
    const height = window.innerHeight - 20;
    const svg = d3
      .select("#map")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        "max-width: 100%; height: auto; background-color:rgb(30, 43, 66); border:.5px solid #aaa"
      )
      .on("click", reset);
    let projection = d3.geoMercator().fitSize([width, height], shorte);
    const path = d3.geoPath(projection);

    const g = svg.append("g");

    let graticuleGenerator = d3.geoGraticule();
    let graticules = graticuleGenerator();
    let geoGenerator = d3.geoPath().projection(projection);
    let graticulePath = geoGenerator(graticules);

    g.append("path")
      .datum(graticules)
      .attr("d", geoGenerator)
      .attr("stroke", "#888")
      .attr("stroke-opacity", "0.25")
      .attr("stroke-width", ".1px")
      .attr("class", "graticule")
      .attr("d", graticulePath);

    const countries = g
      .append("g")
      .attr("fill", "black")
      .attr("cursor", "pointer")
      .attr("stroke", "white")
      .attr("stroke-width", ".05px")
      .selectAll("path")
      .data(shorte.features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);

    const zoom = d3.zoom().scaleExtent([1, 20]).on("zoom", zoomed);
    svg.call(zoom);

    function reset() {
      countries.transition().style("fill", null);
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      countries.transition().style("fill", null);
      d3.select(this).transition().style("fill", "rgb(207 60 90)");
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node())
        );
    }

    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
      //marker.attr("transform", transform);
    }

    let markerDataSet = [];

    const gerCoord = shorte.features.filter(
      (x) => x.properties.name === "Germany"
    )[0];
    var gBounds = d3.geoBounds(gerCoord);

    function drawVertexSet(pointSet) {
      var transitions = pointSet.length;
      g.selectAll("circle")
        .attr("id", "int-marker")

        .data(pointSet)
        .join("circle")
        .attr("cx", ([x, y]) => x)
        .attr("cy", ([x, y]) => y)
        .attr("r", 0.06)
        .attr("fill", "white")
        .attr("fill-opacity", "1")
        // .attr("stroke", "#fff")
        // .attr("stroke-width", ".02px")
        // start the circle as invisible
        .attr("opacity", 0)

        .on("start", function () {
          transitions++;
        })
        .transition()
        // // how long it takes each circle to fade in
        .duration(500)
        // // how long to wait before transition the circle
        .delay((d, i) => i * 300)
        // // make the circle visible
        .attr("opacity", 1)

        .on("end", function () {
          if (--transitions === 0) {
            g.selectAll("circle").transition().duration(500).attr("opacity", 0);
            //d3.selectAll("circle").transition().opacity(0);

            drawLastPoint(lastPoint);
          }
        });
    }

    async function drawLastPoint(pointSet) {
      console.log("START DRAWING LAST POINT");
      g.append("circle")
        .data(pointSet)
        .join("circle")
        .classed("doKeep", true)
        .attr("cx", ([x, y]) => x)
        .attr("cy", ([x, y]) => y)
        .attr("r", 0.1)
        .attr("fill", "rgb(197, 34, 31)")
        .attr("fill-opacity", "1")
        .attr("stroke", "white")
        .attr("stroke-width", ".025px")
        // start the circle as invisible
        .attr("opacity", 0)
        .transition()
        // // how long it takes each circle to fade in
        .duration(1000)
        // // how long to wait before transition the circle
        .delay((d, i) => i * 500)
        // // make the circle visible
        .attr("opacity", 1);
      console.log(dCity);
      g.append("text")
        .text(dCity)
        .attr("x", pointSet[0][0])
        .attr("y", pointSet[0][1] - 3.3)
        .attr("text-anchor", "middle")
        .attr("class", "country-label")
        .attr("transform", `translate(0, 4)`)
        .attr("opacity", 0)
        .transition()
        .duration(2000)
        .delay(1000)
        .attr("opacity", 1);

      g.append("svg:path")
        .attr("id", "marker")
        .attr(
          "d",
          "M17.697 27.454c-1.444 1.583-3.126 3.002-5.014 4.149-.232.17-.548.191-.806.026-2.79-1.775-5.133-3.906-6.974-6.223C2.361 22.218.762 18.684.214 15.28-.344 11.828.178 8.507 1.896 5.807A11.66 11.66 0 0 1 4.492 2.93C6.915 1 9.681-.02 12.44 0c2.655.021 5.277 1.01 7.543 3.079.796.723 1.465 1.552 2.012 2.451 1.847 3.043 2.245 6.923 1.434 10.854-.801 3.885-2.79 7.832-5.732 11.061v.008z"
        )
        .attr("fill", "rgb(197, 34, 31)")
        .attr("stroke", "#fff")
        .attr("stroke-width", "1px")
        .attr(
          "transform",
          `translate(${pointSet[0][0] - 0.315}, ${
            pointSet[0][1] - 1
          }) scale(.025)`
        );

      g.append("svg:path")
        .attr("id", "marker")
        .attr(
          "d",
          "M11.913 6.138a5.93 5.93 0 0 1 5.928 5.928 5.93 5.93 0 0 1-5.928 5.928 5.93 5.93 0 0 1-5.928-5.928c-.003-3.275 2.653-5.928 5.928-5.928z"
        )
        .attr("fill", "white")
        .attr(
          "transform",
          `translate(${pointSet[0][0] - 0.315}, ${
            pointSet[0][1] - 1
          }) scale(.025)`
        );
    }

    const lowX = Math.floor(gBounds[0][0]);
    const highX = Math.floor(gBounds[1][0]);
    const lowY = Math.floor(gBounds[0][1]);
    const highY = Math.floor(gBounds[1][1]);
    const lastPoint = [];

    function zoomOnLoad(d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);

      let lold = countries._groups[0].filter((x) => {
        return x.__data__.properties.name === "Germany";
      });
      ///#E1BB80 , ecru , #C5221F red , rgb(191 169 107) yellow
      d3.select(lold[0]).transition().style("fill", "rgb(232 83 80)");
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
    }

    const dd = shorte.features.filter(
      (x) => x.properties.name === "Germany"
    )[0];
    zoomOnLoad(dd);

    for (let index = 0; index < 60; index++) {
      let constx = getRandomInRange(lowX, highX);
      let consty = getRandomInRange(lowY, highY);

      if (
        d3.polygonContains(gerCoord.geometry.coordinates[0], [constx, consty])
      ) {
        if (index < 30) {
          const projCoords = projection([constx, consty]);
          markerDataSet.push(projCoords);
        } else {
          const projLastPoint = projection([constx, consty]);
          const lastPointWg = { lon: constx, lat: consty };
          dispatch(setDrawnCityCoords({ lon: constx, lat: consty }));
          geocoder
            .reverse({ lat: lastPointWg.lat, lon: lastPointWg.lon })
            .then((response) => {
              let city =
                response.address.city ||
                response.address.town ||
                response.address.hamlet ||
                response.address.state;
              console.log(city);
              //dispatch(setDrawnCity(city));
              dCity = city;
            });
          lastPoint.push(projLastPoint);
          drawVertexSet(markerDataSet);
          return;
        }
      }
    }

    function getRandomInRange(from, to, fixed) {
      return (Math.random() * (to - from) + from).toFixed(4);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div id="map" />
    </div>
  );
}

export default WorldMap;
