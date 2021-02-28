import React, { Component } from "react";
import Materijali from "./Materijali";
import Izvjestaji from "./Izvjestaji";
import Forum from "./Forum";
import Raspored from "./Raspored";



class DrugiModuli extends Component {
  render() {
    return (
      <div className="row" >
        <div className='col-3'>
          <Materijali />
        </div>
        <div className='col-3'>
          <Izvjestaji />
                  </div>  
        <div className='col-3'>
          <Forum />
        </div>
        <div className='col-3'>
          <Raspored />
        </div>
          
      </div>
    );
  }
}

export default DrugiModuli;
