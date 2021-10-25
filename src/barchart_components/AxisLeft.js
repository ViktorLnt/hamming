export const AxisLeft = ({ yScale, innerWidth }) => 
  yScale.ticks().filter(Number.isInteger).map((tickValue) => (
    <g className="tick" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth}  />
      <text key={tickValue} dx="-1.6em" dy=".32em">
        {tickValue}
      </text>
    </g>
  ))