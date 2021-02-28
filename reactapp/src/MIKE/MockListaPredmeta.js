import React, { Component } from 'react';

class MockListaPredmeta extends Component {
  constructor(props){
    super(props);
    this.state={
      nazivPredmeta:"SI"
    }
  }
  render() {
    return (
      <div className="MockListaPredmeta">
        <p>Test liste predmeta</p>
        <button onClick={this.props.funkcija}>KLIK</button>
        <p>{this.props.nazivPredmeta}</p>
      </div>
    );
  }
}

export default MockListaPredmeta;
