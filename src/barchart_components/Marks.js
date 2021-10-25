export const Marks = ({ data, xScale, yScale, xValue, yValue, innerHeight}) =>
  data.map((d, idx) => (
    <rect
      className="mark"
      key={idx}
      x={xScale(xValue(d))}
      y={yScale(yValue(d))}
      width={xScale.bandwidth()}
      height={innerHeight - yScale(yValue(d))}
    >
        <title>{d.value}</title>
    </rect>
  ));
