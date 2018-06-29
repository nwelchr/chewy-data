import React, { Component } from 'react';
import './Dashboard.css';
import ChartData from './ChartData';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: true,
      currChart: 0
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

    const charts = [];
    const dataProperties = ['launch_times', 'memory', 'cpu'];
    const colors = ['#81e', '#7e1', '#ff5'];

    // Organize aggregate data
    const avgData = {
      title: 'Aggregate data',
      data: []
    };
    const avgLabels = [
      'Average Launch Time (ms)',
      'Average Memory (kb)',
      'Average CPU (%)'
    ];

    avgLabels.forEach((label, i) => {
      const currData = {
        title: label,
        labels: [],
        datasets: []
      };
      const dataset = {
        label,
        data: [],
        borderColor: colors[i]
      };
      props.testCase.test_steps.forEach((testStep, j) => {
        currData.labels.push(testStep.step_name);
        dataset.data.push(findAvg(testStep[dataProperties[i]]));
      });
      currData.datasets.push(dataset);
      avgData.data.push(currData);
    });

    charts.push(avgData);

    // Organize individual data
    const labels = ['Launch Time (ms)', 'Memory (kb)', 'CPU (%)'];

    props.testCase.test_steps.forEach((testStep, idx) => {
      const currChart = {
        title: testStep.step_name,
        data: []
      };

      labels.forEach((label, i) => {
        const currData = {
          title: label,
          labels: ['Trial One', 'Trial Two', 'Trial Three'],
          datasets: [
            {
              label,
              data: testStep[dataProperties[i]],
              borderColor: colors[i]
            }
          ]
        };
        currChart.data.push(currData);
      });

      charts.push(currChart);
    });

    return {
      charts
    };
  }

  switchToDashboard = () => {
    this.setState({ showing: false });
    this.props.switchToDashboard();
  };

  changeChart = idx => {
    this.setState({ currChart: idx });
  };

  renderNavbar() {
    return (
      <ul className="chart-nav">
        {this.state.charts.map((chart, key) => (
          <li key={key} onClick={() => this.changeChart(key)}>
            {chart.title}
          </li>
        ))}
      </ul>
    );
  }

  renderChart() {
    const chart = this.state.charts[this.state.currChart];
    return (
      <section class="charts">
        <ChartData title={chart.title} data={chart.data} />
      </section>
    );
  }

  render() {
    console.log(this.state);
    const showing = this.state.showing ? 'fade-in' : 'fade-out';

    return (
      <div className={`app ${showing}`}>
        <button className="back-button" onClick={this.switchToDashboard}>
          Back
        </button>
        <main class="chart-main">
          {this.renderChart()}
          {this.renderNavbar()}
        </main>
      </div>
    );
  }
}
