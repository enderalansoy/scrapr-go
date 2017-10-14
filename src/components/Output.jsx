import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: props.titleValue,
    };
  }

  render() {
    return (
      <div className="output">
        <div className="container">
          <div className="row">
            <Panel header="Page Title">
              <p>{this.props.titleValue}</p>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
