import React, { useEffect } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson-client";
import { shorte } from "./shorte.js";

function WorldMap() {
  useEffect(() => {
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
        "max-width: 100%; height: auto; background-color:dcb; border:1px solid #aaa"
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
      .attr("stroke-width", ".5px")
      .attr("class", "graticule")
      .attr("d", graticulePath);

    const countries = g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .attr("stroke", "white")
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
      console.log(this);
      countries.transition().style("fill", null);
      d3.select(this).transition().style("fill", "red");
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

    const markerDataSet = [];

    const gerCoord = shorte.features.filter(
      (x) => x.properties.name === "Germany"
    )[0];
    var gBounds = d3.geoBounds(gerCoord);

    function drawVertexSet(pointSet) {
      var transitions = pointSet.length;
      console.log(pointSet);
      g.selectAll("circle")
        .data(pointSet)
        .join("circle")
        .attr("cx", ([x, y]) => x)
        .attr("cy", ([x, y]) => y)
        .attr("r", 0.5)
        .attr("fill", "#3B38E5")
        .attr("fill-opacity", "1")
        .attr("stroke", "#fff")
        .attr("stroke-width", ".1px")
        // start the circle as invisible
        .attr("opacity", 0)

        .on("start", function () {
          transitions++;
        })
        .transition()
        // // how long it takes each circle to fade in
        .duration(1000)
        // // how long to wait before transition the circle
        .delay((d, i) => i * 500)
        // // make the circle visible
        .attr("opacity", 1)

        .on("end", function () {
          console.log(transitions);

          if (--transitions === 0) {
            console.log("FIRE");
            console.log(lastPoint);
            drawLastPoint(lastPoint);
          }
        });
    }

    function drawLastPoint(pointSet) {
      console.log(pointSet);
      g.append("circle")
        .data(pointSet)
        .join("circle")
        .attr("cx", ([x, y]) => x)
        .attr("cy", ([x, y]) => y)
        .attr("r", 0.5)
        .attr("fill", "green")
        .attr("fill-opacity", "1")
        .attr("stroke", "#fff")
        .attr("stroke-width", ".1px")
        // start the circle as invisible
        .attr("opacity", 0)
        .transition()
        // // how long it takes each circle to fade in
        .duration(1000)
        // // how long to wait before transition the circle
        .delay((d, i) => i * 500)
        // // make the circle visible
        .attr("opacity", 1);
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
      console.log(lold)
      d3.select(lold[0]).transition().style("fill", "#CC5A71");
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


    for (let index = 0; index < 40; index++) {
      let constx = getRandomInRange(lowX, highX);
      let consty = getRandomInRange(lowY, highY);

      if (
        d3.polygonContains(gerCoord.geometry.coordinates[0], [constx, consty])
      ) {
        if (index < 20) {
          console.log("DSDSD");

          const projCoords = projection([constx, consty]);
          markerDataSet.push(projCoords);
        } else {
          console.log("DSDSD");

          const projLastPoint = projection([constx, consty]);
          lastPoint.push(projLastPoint);
          console.log(lastPoint);
          console.log(markerDataSet);

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
