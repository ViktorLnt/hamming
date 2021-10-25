export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.domain().map((tickValue) => (
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <text
        style={{ textAnchor: "middle", fontSize: "smaller" }}
        dy=".60em"
        y={innerHeight + 10}
        dx={xScale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    </g>
  ));
