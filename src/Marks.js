export const Marks = ({ distances, xScale, yScale, xValue, yValue }) =>
  distances.map((d) => (
    <rect
      className="mark"
      key={d}
      x={0}
      y={yScale(d)}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <title>{xValue(d)}</title>
    </rect>
  ));
