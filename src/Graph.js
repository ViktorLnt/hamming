import React from "react";
import { scaleBand, scaleLinear } from "d3";
// import { AxisBottom } from './AxisBottom';
// import { AxisLeft } from './AxisLeft';
import { Marks } from "./Marks";

export const Graph = ({ distances }) => {
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 65, left: 220 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(0, Math.max(distances))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear().domain([0, 32]).range([0, innerWidth]);

  

  return (
    <>
      {data ? (
        <svg className="barChart" width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} /> */}
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + 40}
              textAnchor="middle"
            >
              Comparison Graph
            </text>
            <Marks
              items={distances}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              innerHeight={innerHeight}
            />
          </g>
        </svg>
      ) : (
        <pre>Loading...</pre>
      )}
    </>
  );
};

export default Graph;
