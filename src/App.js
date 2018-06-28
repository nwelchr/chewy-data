import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';
import TestCase from './components/TestCase';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  parseTimeStamp(timeStamp) {
    const testDate = new Date(timeStamp);
    return testDate.toTimeString();
  }

  render() {
    const { app_name, test_run_id, time_stamp, test_cases } = this.props.data;

    return (
      <div className="app">
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
            <TestCase key={key} testCase={testCase} />
          ))}
        </main>
        <footer>Made by Nicholas Welch</footer>
      </div>
    );
  }
}

// const hi = new App(data);
// hi.render();

export default App;
