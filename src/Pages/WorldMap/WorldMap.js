import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as turf from "@turf/turf";
import {
  getSummary,
  getDrawnCityName,
  getWikiImage,
  setDrawnCityCoords,
} from "../CityInfo/cityInfoSlice";
import * as d3 from "d3";
import { mediumAccuracyWorld } from "./mediumAccuracyWorld.js";
import "./WorldMap.css";

function WorldMap() {
  const drawnCity = useSelector((state) => state.cityInfo.drawnCity);
  const drawnCountry = useSelector((state) => state.cityInfo.drawnCountry);

  const [isDrawnCityReady, setDrawnCityReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (drawnCity && isDrawnCityReady) {
      dispatch(getSummary(drawnCity));
      dispatch(getWikiImage(drawnCity));
    }
  }, [drawnCity, isDrawnCityReady, dispatch]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3
      .select("#map")
      .append("svg")
      .attr("id", "world-map")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)

      .attr(
        "style",
        "max-width: 100%; min-width:400px; min-height:400px; max-height:100%; background-color:rgb(30, 43, 66); border:1px solid violet"
      )
      .on("click", reset);

    const projection = d3
      .geoMercator()
      .fitSize([width, height], mediumAccuracyWorld);
    const path = d3.geoPath(projection);

    const g = svg.append("g");

    const graticuleGenerator = d3.geoGraticule();
    const graticules = graticuleGenerator();
    const geoGenerator = d3.geoPath().projection(projection);
    const graticulePath = geoGenerator(graticules);

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
      .data(mediumAccuracyWorld.features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);

    const zoom = d3.zoom().scaleExtent([1, 20]).on("zoom", zoomed);
    svg.call(zoom);

    const countryCoords = mediumAccuracyWorld.features.filter(
      (x) => x.properties.name === drawnCountry
    )[0];

    const gBounds = d3.geoBounds(countryCoords);

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
    }

    let markerDataSet = [];

    async function drawLastPoint(pointSet) {
      const lineGenerator = d3.line().curve(d3.curveBundle.beta(1.25));
      const pathDataa = lineGenerator(markerDataSet);
      const markerPath = g
        .append("path")
        .attr("d", pathDataa)
        .attr("stroke", "red")
        .attr("stroke-width", 0)
        .attr("fill", "none");

      const totalLengthh = markerPath.node().getTotalLength();
      const startPointLong = markerDataSet[0][0];
      const startPointLat = markerDataSet[0][1];
      const movingMarker = g
        .append("circle")
        .data(markerDataSet)
        .join("circle")
        .classed("doKeep", true)
        .attr("cx", ([x, y]) => x)
        .attr("cy", ([x, y]) => y)
        .attr("r", 0.3)
        .attr("fill", "rgb(197, 34, 31)")
        .attr("fill-opacity", "1")
        .attr("stroke", "white")
        .attr("stroke-width", ".08px");

      movingMarker
        .transition()
        .duration(totalLengthh * 80)
        .attrTween("transform", function () {
          return function (t) {
            const p = markerPath.node().getPointAtLength(t * totalLengthh);

            return (
              "translate(" +
              (p.x - startPointLong) +
              "," +
              (p.y - startPointLat) +
              ")"
            );
          };
        })
        .on("end", function () {
          g.append("svg:path")
            .attr("class", "exclude-zoom")
            .attr(
              "d",
              "M17.697 27.454c-1.444 1.583-3.126 3.002-5.014 4.149-.232.17-.548.191-.806.026-2.79-1.775-5.133-3.906-6.974-6.223C2.361 22.218.762 18.684.214 15.28-.344 11.828.178 8.507 1.896 5.807A11.66 11.66 0 0 1 4.492 2.93C6.915 1 9.681-.02 12.44 0c2.655.021 5.277 1.01 7.543 3.079.796.723 1.465 1.552 2.012 2.451 1.847 3.043 2.245 6.923 1.434 10.854-.801 3.885-2.79 7.832-5.732 11.061v.008z"
            )
            .attr("fill", "rgb(197, 34, 31)")
            .attr("stroke", "#fff")
            .attr("stroke-width", "1px")
            .attr(
              "transform",
              `translate(${pointSet[pointSet.length - 1][0] - 1.23}, ${
                pointSet[pointSet.length - 1][1] - 3.9
              }) scale(.1)`
            );

          g.append("svg:path")
            .attr("class", "exclude-zoom")
            .attr(
              "d",
              "M11.913 6.138a5.93 5.93 0 0 1 5.928 5.928 5.93 5.93 0 0 1-5.928 5.928 5.93 5.93 0 0 1-5.928-5.928c-.003-3.275 2.653-5.928 5.928-5.928z"
            )
            .attr("fill", "white")
            .attr(
              "transform",
              `translate(${pointSet[pointSet.length - 1][0] - 1.23}, ${
                pointSet[pointSet.length - 1][1] - 3.9
              }) scale(.1)`
            )
            .attr("opacity", 0)
            .transition()
            .attr("opacity", 1)
            .on("end", function () {
              d3.select("#world-map")
                .transition()
                .duration(2000)
                .attr("height", 400)
                .attr("width", 400)
                .on("end", function () {
                  setDrawnCityReady(true);
                });
            });
        });
    }

    const lowX = Math.floor(gBounds[0][0]);
    const highX = Math.floor(gBounds[1][0]);
    const lowY = Math.floor(gBounds[0][1]);
    const highY = Math.floor(gBounds[1][1]);

    function zoomOnLoad(countryCoords) {
      const [[x0, y0], [x1, y1]] = path.bounds(countryCoords);

      let zoomedCountry = countries._groups[0].filter((x) => {
        return x.__data__.properties.name === drawnCountry;
      });
      ///#E1BB80 , ecru , #C5221F red , rgb(191 169 107) yellow
      d3.select(zoomedCountry[0]).transition().style("fill", "rgb(232 83 80)");

      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(
                28,
                0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
              )
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
    }

    zoomOnLoad(countryCoords);

    const amountOfCountryElems = countryCoords.geometry.coordinates.length;

    for (let index = 0; index < 50; index++) {
      let constx = getRandomInRange(lowX, highX);
      let consty = getRandomInRange(lowY, highY);
      const point = turf.point([constx, consty]);

      let poly = null;
      if (amountOfCountryElems === 1) {
        poly = turf.polygon(countryCoords.geometry.coordinates);
      } else {
        poly = turf.multiPolygon(countryCoords.geometry.coordinates);
      }
      const isMarkerInside = turf.booleanPointInPolygon(point, poly);

      if (isMarkerInside && index < 25) {
        const projCoords = projection([constx, consty]);
        markerDataSet.push(projCoords);
      } else if (isMarkerInside && index > 24) {
        const projLastPoint = projection([constx, consty]);
        g.append("path")
          .attr("d", markerDataSet)
          .attr("fill", "red")
          .attr("stroke-width", 2)
          .attr("stroke", "darkgrey");

        markerDataSet.push(projLastPoint);
        drawLastPoint(markerDataSet);
        dispatch(setDrawnCityCoords({ lat: consty, lon: constx }));
        dispatch(getDrawnCityName({ lat: consty, lon: constx }));
        return;
      }
    }

    function getRandomInRange(from, to) {
      return (Math.random() * (to - from) + from).toFixed(4);
    }
  }, []);

  return <div id="map" />;
}

export default WorldMap;
