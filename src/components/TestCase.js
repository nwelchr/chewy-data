import React, { Component } from 'react';
import './TestCase.css';
import Carousel from 'nuka-carousel';

export default class TestCase extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  renderImages() {
    const images = this.props.testCase.test_steps;
    return images.map((testStep, idx) => (
      <div class="img-container">
        <img
          class="test-case-img"
          src={window.location.origin + `/images/${testStep.screenshot}`}
        />
      </div>
    ));
  }

  toggleSize = e => {
    e.stopPropagation();
    switch (e.type) {
      case 'mousedown':
        if (e.currentTarget.classList.contains('test-case')) {
          this.setState({ active: true });
        }
        break;
      case 'mouseup':
        this.setState({ active: false });
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
        onMouseUp={this.toggleSize}
        onMouseDown={this.toggleSize}>
        <section class="info">
          <h1>{this.props.testCase.test_name}</h1>
          <h2>
            Status: Test {this.props.testCase.status === false ? 'not' : ''}{' '}
            passed.
          </h2>
        </section>
        <section className="images" onMouseDown={this.toggleSize}>
          <Carousel autoplay={true} cellAlign={'center'} wrapAround={true}>
            {this.renderImages()}
          </Carousel>
        </section>
      </section>
    );
  }
}
