import React, { useEffect } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson-client";
import worldtopo from "./worldtopo.json";
import { shorte } from "./shorte.js";

function WorldMap() {
  useEffect(() => {
    console.log(shorte);
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
    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
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
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%", border: "1px solid red" }}
    />
  );
}

export default WorldMap;
