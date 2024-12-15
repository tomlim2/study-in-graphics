"use client";
import React, { Component } from 'react';

class CounterReactClassExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Simple Counter</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment} style={{ margin: '5px' }}>
          Increment
        </button>
        <button onClick={this.reset} style={{ margin: '5px' }}>
          Reset
        </button>
      </div>
    );
  }
}

export default CounterReactClassExample;
