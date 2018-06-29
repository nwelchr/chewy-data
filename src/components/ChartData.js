import React, { Component, Fragment } from 'react';
import { Bar, Line, defaults } from 'react-chartjs-2';
import './ChartData.css';

export default props => {
  console.log(props);
  defaults.global.defaultFontColor = '#fff';
  defaults.global.defaultFontFamily = "'HelveticaNeue-Light', 'Helvetica'";
  return (
    <Fragment>
      <h1>{props.title}</h1>
      {props.data.map((data, idx) => (
        <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: data.title,
              fontSize: '30'
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
        />
      ))}
    </Fragment>
  );
};
