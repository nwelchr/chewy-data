import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';
import TestCase from './components/TestCase';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showChart: false, showing: true };
    this.switchToChart = this.switchToChart.bind(this);
    this.switchToDashboard = this.switchToDashboard.bind(this);
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  parseTimeStamp(timeStamp) {
    const testDate = new Date(timeStamp);
    return testDate.toTimeString();
  }

  switchToChart(testCaseId) {
    this.setState({ showing: false });
    setTimeout(() => {
      this.setState({ showChart: true, showing: true, testCaseId });
    }, 3000);
  }

  switchToDashboard() {
    setTimeout(() => {
      this.setState({ showChart: false });
    }, 3000);
  }

  render() {
    const { app_name, test_run_id, time_stamp, test_cases } = this.props.data;
    const showing = this.state.showing ? 'fade-in' : 'fade-out';

    if (this.state.showChart) {
      return (
        <Chart
          testCaseId={this.state.testCaseId}
          testCase={test_cases[this.state.testCaseId]}
          switchToDashboard={this.switchToDashboard}
        />
      );
    } else {
      return (
        <div className={`app ${showing}`}>
          <header>
            <h1>{app_name}</h1>
            <p>
              Test run id: <strong>{test_run_id}</strong>
            </p>
            <p>
              Run at: <strong>{this.parseTimeStamp(time_stamp)}</strong>
            </p>
          </header>
          <main>
            {test_cases.map((testCase, key) => (
              <TestCase
                key={key}
                testCaseId={key}
                testCase={testCase}
                switchToChart={this.switchToChart}
              />
            ))}
          </main>
          <footer>Made by Nicholas Welch</footer>
        </div>
      );
    }
  }
}

// const hi = new App(data);
// hi.render();

export default App;
