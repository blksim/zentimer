import React from 'react';

const barGroup = (props) => {
  let barPadding = 10;
  let barColor = '#fff';
  let heightScale = d => d*5;

  let height = heightScale(props.d.value);
  let xMid = props.barWidth * 0.5; // 각 바의 중간

  return <g className="bar-group">
    <rect
      x={xMid}
      height={height} 
      width={props.barWidth - barPadding} 
      fill={barColor} />
    <text 
      className="name-label" 
      x={xMid * -1.8}
      >{props.d.name}</text>
    <text 
      className="value-label"
      x={xMid * -1.8}
      y={-height * 1.1}
      >{props.d.value}</text>
  </g>
};

export default barGroup;