import React, { Fragment } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import './ChartData.css';

export default props => {
  defaults.global.defaultFontColor = '#fff';
  defaults.global.defaultFontFamily = "'HelveticaNeue-Light', 'Helvetica'";
  defaults.global.legend.onClick = null;
  return (
    <Fragment>
      <h1>{props.title}</h1>
      {props.data.map((data, key) => (
        <Bar
          key={key}
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
