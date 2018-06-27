import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';
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
    console.log(testDate);
    return testDate.toTimeString();
  }

  render() {
    const { app_name, test_run_id, time_stamp } = this.props;
    const time = this.parseTimeStamp(time_stamp);
    time; //?
    return <div>hi</div>;
  }
}

const hi = new App(data);
hi.render();

export default App;
