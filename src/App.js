import React, { Component } from 'react';
import { Button, Col, FormControl, Panel } from 'react-bootstrap';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import Navigation from './components/Navigation';
import Output from './components/Output';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: 'http://localhost:3001/api',
      text: 'Welcome to Go Scrape',
      url: 'https://github.com',
      value: '',
    };
  }

  componentWillMount() {
    loadProgressBar();
  }

  onChange(e) {
    this.setState({ value: e.target.value }, () => {
      console.info(this.state.value);
    });
  }

  onClick() {
    this.setState({ url: this.state.value }, () => {
      this.scrape();
    });
  }

  scrape() {
    // Using axios to access our API:
    axios.get(`${this.state.api}?url=${this.state.url}`).then((res) => {
      console.info(res);
      this.setState({ text: res.data });
    }).catch((err) => {
      console.info(err);
    });
  }

  render() {
    return (
      <div className="App">
        <br />
        <Navigation />
        <div className="container">
          <div className="row">
            <Panel>
              <Col className="btn" md={10}>
                <FormControl
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                  type="text"
                  placeholder="https://github.com"
                />
              </Col>
              <Col className="btn" md={2}>
                <Button onClick={this.onClick.bind(this)} bsStyle="danger" block>Scrape</Button>
              </Col>
            </Panel>
          </div>
        </div>
        <Output
          titleValue={this.state.text.title}
        />
      </div>
    );
  }
}

export default App;
