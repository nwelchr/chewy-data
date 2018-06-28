import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css';

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

  static getDerivedStateFromProps(props) {
    function findAvg(data) {
      return (
        Math.round(
          (data.reduce((acc, el) => (acc += el)) / data.length) * 10000
        ) / 10000
      );
    }

    let aggregateData = {};
    aggregateData.labels = [];
    aggregateData.dataSets = {};
    aggregateData.dataSets.avgLaunchTimes = [];
    aggregateData.dataSets.avgMemory = [];
    aggregateData.dataSets.avgCpu = [];

    let data = [];

    props.testCase.test_steps.forEach((testStep, idx) => {
      aggregateData.labels.push(testStep.step_name);

      const avgLaunchTime = findAvg(testStep.launch_times);
      const avgMemory = findAvg(testStep.memory);
      const avgCpu = findAvg(testStep.cpu);

      aggregateData.dataSets.avgLaunchTimes.push(avgLaunchTime);
      aggregateData.dataSets.avgMemory.push(avgMemory);
      aggregateData.dataSets.avgCpu.push(avgCpu);

      const currGraph = {};
      currGraph.label = testStep.step_name;
      currGraph.avgLaunchTime = avgLaunchTime;
      currGraph.avgMemory = avgMemory;
      currGraph.avgCpu = avgCpu;

      data.push(currGraph);
    });

    console.log(aggregateData, 'aggData');
    console.log(data, 'data');
  }

  switchToDashboard = () => {
    this.setState({ showing: false });
    this.props.switchToDashboard();
  };

  render() {
    const showing = this.state.showing ? 'fade-in' : 'fade-out';

    return (
      <div className={`app ${showing}`}>
        <button className="back-button" onClick={this.switchToDashboard}>
          Back
        </button>
        <Line
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
