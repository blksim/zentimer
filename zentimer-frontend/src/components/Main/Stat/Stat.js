import React from 'react'

const stat = (props) => {
  return <div>
    <Chart />
    <Report totalHours={1000} distractor="twittering with no reason"/>
  </div>;
};

export default stat;