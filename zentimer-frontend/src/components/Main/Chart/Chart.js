import React, { useState, useEffect } from 'react';

import './Chart.css';
import BarGroup from '../Chart/BarGroup';

const Chart = (props) => {
  const chart = {
    values: [
      { name: 'Mon', value: 20 },
      { name: 'Tue', value: 40 },
      { name: 'Wed', value: 35 },
      { name: 'Thu', value: 50 },
      { name: 'Fri', value: 55 },
      { name: 'Sat', value: 40 },
      { name: 'Sun', value: 30 }
    ]
  };

  const [data, setData] = useState(chart.values);
  const [width, setWidth] = useState({ width: window.innerWidth })
  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let barWidth = window.innerWidth * 0.8 / 8;
  let barGroup = data.map((d, i) => <g key={i} transform={`translate(${i * barWidth}, 0)`}> 
    <BarGroup className='bar_group' d={d} barWidth={barWidth}/></g>)
  return (
    <section>
      <select>
        <optgroup>
          <option>week</option>
          <option>month</option>
          <option>year</option>
        </optgroup>
      </select>
        <svg className="chart" width="80vw" height="50vh"><g className="container">{barGroup}</g></svg>
    </section>
  )};

export default Chart;