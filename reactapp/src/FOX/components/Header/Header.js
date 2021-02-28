import React, { Component } from 'react';
import NavbarFox from '../Navbar/Navbar';

class Header extends Component {
  constructor(props) {
    super(props);
    /*Promijeni na true za header početne stranice, false za header stranice predmeta */
    this.state = {isPocetna: props.isPocetna} 
   }

    render() {
      const isPocetna = this.state.isPocetna;
      let meni;

      if (isPocetna) {
        meni =
          <div
          style={{
            width: "100%",
            backgroundColor: "#2C3E50",
            float: "left",
            minHeight: "100vh"
          }}>
            
            <a href="https://drive.google.com/file/d/1eFYW6EY6kWefRpWBIkMhV-ocvDch6qq4/view">
              <button type="button" className="btn btn-primary left-buttons">Uputstvo</button>
            </a>

            <a href="http://localhost:3000/Romeo">
              <button type="button" className="btn btn-primary left-buttons">Odjava</button>
            </a>
            
          </div>
      }
      else {
        meni = <NavbarFox />;
      }

      return (
        <div className="Header">
            {meni}
        </div>
      );
    }
  }
  
  export default Header;
  