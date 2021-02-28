import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import {withRouter} from 'react-router-dom';

class ReturnButton extends Component {
  
    render() {
      var currentLocation = this.props.location.pathname;
      if(currentLocation === "/fox"){
        return (
          <Nav.Link disabled href="/fox" style={{color: "gray"}}>Nazad na početnu</Nav.Link>
        )
      }
      return (
        <Nav.Link href="/fox" style={{color: "white"}}>Nazad na početnu</Nav.Link>
      )
    }
  }
  export default withRouter(ReturnButton);