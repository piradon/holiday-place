import React, { useEffect } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson-client";
import worldtopo from "./worldtopo.json";
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
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);
    let projection = d3.geoMercator().fitSize([width, height], shorte);
    const path = d3.geoPath(projection);

    const g = svg.append("g");
    const countries = g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(shorte.features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        path(mesh(worldtopo, worldtopo.objects.countries, (a, b) => a !== b))
      );

    const coordinates = projection([0, 0]);

    const marker = svg
      .append("circle")
      .attr("cx", coordinates[0])
      .attr("cy", coordinates[1])
      .attr("r", 5)
      .style("fill", "red");
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
      marker.attr("transform", transform);
    }

    const gerCoord = shorte.features.filter(
      (x) => x.properties.name === "Germany"
    )[0];
    var gBounds = d3.geoBounds(gerCoord);

    function drawVertexSet(pointSet) {
      g.append("circle")
        //.data(pointSet)
        .join("circle")
        .attr("cx", projection(pointSet)[0])
        .attr("cy", projection(pointSet)[1])
        .attr("r", 1)
        .attr(
          "fill",
          d3.polygonContains(gerCoord.geometry.coordinates[0], pointSet)
            ? "blue"
            : "red"
        )
        // start the circle as invisible
        .attr("opacity", 0)
        .transition()
        // // how long it takes each circle to fade in
        .duration(100)
        // // how long to wait before transition the circle
        .delay((d, i) => i * 100)
        // // make the circle visible
        .attr("opacity", 1);
    }

    console.log(gBounds);
    const lowX = Math.floor(gBounds[0][0]);
    const highX = Math.floor(gBounds[1][0]);
    const lowY = Math.floor(gBounds[0][1]);
    const highY = Math.floor(gBounds[1][1]);

    console.log(lowX);
    for (let index = 0; index < 120; index++) {
      let constx = getRandomInRange(lowX, highX);
      let consty = getRandomInRange(lowY, highY);

      drawVertexSet([constx, consty]);
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
      <div id="map" style={{ border: "1px solid red" }} />
    </div>
  );
}

export default WorldMap;
