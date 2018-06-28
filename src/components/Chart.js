import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: true,
      chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }
        ]
      }
    };
  }

  findAvg(data) {
    return data.reduce((acc, el) => acc += el) / data.length;
  }

  static getDerivedStateFromProps(props) {
    debugger;
    let aggregateData = {};
    aggregateData.labels = [];
    aggregateData.avgLaunchTimes = [];
    aggregateData.avgMemory = [];
    aggregateData.avgCpu = [];
    props.testCase.test_steps.forEach((testStep, idx) => {
      aggregateData.labels.push(testStep.step_name);
      aggregateData.avgLaunchTimes.push(this.findAvg(testStep.launch_times))

      const currGraph = {};
      currGraph.label = testStep.step_name;
      currGraph. 
    });
    
  }

  render() {
    const showing = this.state.showing ? 'fade-in' : 'fade-out';

    return (
      <div className={`app ${showing}`}>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: 'Largest Cities in Massachusetts',
              fontSize: '25'
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    );
  }
}
