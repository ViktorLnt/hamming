import React from "react";
import { scaleBand, scaleLinear } from "d3";
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from "./Marks";

export const Graph = ({ data }) => {
  const width = 700;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 65, left: 30 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
    const xValue = (d) => d.id;
    const yValue = (d) => d.value;

  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .paddingInner(0.15);
    
    const yScale = scaleLinear()
    .domain([0, 5])
    .range([innerHeight, 0]);

  return (
    <>
      {data.length > 0 && (
        <svg className="barChart" width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
                <Marks
                data={data}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
                innerHeight={innerHeight}
              />            
          </g>
        </svg>
      )}
    </>
  );
};

export default Graph;
