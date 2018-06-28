import React, { Component } from 'react';
import './TestCase.css';
import Carousel from 'nuka-carousel';

export default class TestCase extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, fadeOut: false };
    this.toggleSize = this.toggleSize.bind(this);
  }

  renderImages = () => {
    const images = this.props.testCase.test_steps;
    return images.map((testStep, idx) => (
      <div key={idx} className="img-container">
        <img
          key={idx}
          className="test-case-img"
          src={window.location.origin + `/images/${testStep.screenshot}`}
        />
      </div>
    ));
  };

  toggleSize = e => {
    e.stopPropagation();
    console.log(e.currentTarget);
    const clickedTestCase = e.currentTarget.classList.contains('test-case');
    e.currentTarget.classList.contains('images');
    switch (e.type) {
      case 'mousedown':
        if (clickedTestCase) {
          this.setState({ active: true });
        }
        break;
      case 'mouseup':
        this.setState({ active: false });
        if (clickedTestCase) {
          this.props.switchToChart(this.props.testCaseId);
        }
        break;
      default:
        break;
    }
  };

  render() {
    const active = this.state.active ? 'active' : '';
    return (
      <section
        className={`test-case ${active}`}
        onMouseDown={this.toggleSize}
        onMouseUp={this.toggleSize}>
        <section className="info">
          <h1>{this.props.testCase.test_name}</h1>
          <h2>
            Status: Test {this.props.testCase.status ? 'passed' : 'failed'}.
          </h2>
        </section>
        <section
          className="images"
          onMouseDown={this.toggleSize}
          onMouseUp={this.toggleSize}>
          <Carousel autoplay={true} cellAlign={'center'} wrapAround={true}>
            {this.renderImages()}
          </Carousel>
        </section>
      </section>
    );
  }
}
