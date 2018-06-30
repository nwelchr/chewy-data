import React, { Component } from 'react';
import './Dashboard.css';
import ChartData from './ChartData';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: true,
      currChart: 0,
      currNavText: 'Aggregate Data',
      dropdownShowing: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
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
    const colors = [
      'rgba(232,83,82,.5)',
      'rgba(70,230,147,.5)',
      'rgb(94,82,232,.5)'
    ];

    // Organize aggregate data
    const avgData = {
      title: 'Aggregate Data',
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
        borderColor: colors[i],
        backgroundColor: colors[i]
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
              borderColor: colors[i],
              backgroundColor: colors[i]
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.setState({ dropdownShowing: false });
    }
  };

  switchToDashboard() {
    this.setState({ showing: false });
    this.props.switchToDashboard();
  }

  changeChart = idx => {
    this.setState({
      currChart: idx,
      currNavText: this.state.charts[idx].title
    });
    this.toggleDropdown();
  };

  toggleDropdown() {
    this.setState({ dropdownShowing: !this.state.dropdownShowing });
  }

  renderNavbar() {
    const dropdown = this.state.dropdownShowing ? 'showing' : 'hidden';
    return (
      <nav className="chart-nav" ref={node => (this.node = node)}>
        <ul className="dropdown-ul">
          <li onClick={this.toggleDropdown} className="dropdown-text">
            {this.state.currNavText}
          </li>
          <ul className={`content ${dropdown}`}>
            {this.state.charts
              .filter((chart, id) => id !== this.state.currChart)
              .map((chart, key) => (
                <li key={key} onClick={() => this.changeChart(key)}>
                  {chart.title}
                </li>
              ))}
          </ul>
        </ul>
      </nav>
    );
  }

  renderChart() {
    const chart = this.state.charts[this.state.currChart];
    return (
      <section className="charts">
        <ChartData
          key={this.state.currChart}
          title={chart.title}
          data={chart.data}
        />
      </section>
    );
  }

  render() {
    console.log(this.state);
    const showing = this.state.showing ? 'fade-in' : 'fade-out';

    return (
      <div className={`app ${showing}`}>
        <button className="back-button" onClick={this.switchToDashboard}>
          <img src={window.location.origin + `/images/arrow.png`} />
        </button>
        <main className="chart-main">
          {this.renderChart()}
          {this.renderNavbar()}
        </main>
      </div>
    );
  }
}
