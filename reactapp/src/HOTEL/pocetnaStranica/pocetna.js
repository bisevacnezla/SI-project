import React, { Component } from 'react';
import './pocetna.css';
import {Link} from 'react-router-dom';
import color from '@material-ui/core/colors/deepPurple';
class AnketePocetna extends Component {
  render() {
    return (
      <div className="App">
        

        <div class="btn-group-vertical" data-toggle="buttons">
          <br></br>
          <Link to ="/HOTEL/kreiranje">
          <button type="button" class="btn btn-primary btn-lg" id="kreiranje" >KREIRAJ ANKETU</button>
          <br></br>
          </Link>
          <Link to="/HOTEL/popunjavanje/8">
          <button type="button" class="btn btn-primary btn-lg" id="popunjavanje">POPUNI ANKETU</button>
          <br></br>
          </Link>
          <Link to="/HOTEL/liste/mojeAnkete">
          <button type="button" class="btn btn-primary btn-lg" id="mojeAnkete">MOJE ANKETE</button>
          <br></br>
          </Link>
          <Link to="HOTEL/liste/javneAnkete">
          <button type="button" class="btn btn-primary btn-lg" id="javneAnkete">JAVNE ANKETE</button>
          <br></br>
          </Link>
          <Link to="/HOTEL/liste/rezultatiAnketa">
          <button type="button" class="btn btn-primary btn-lg" id="rezultati">REZULTATI ANKETA</button>
          <br></br>
          </Link>
        </div>
      </div>

      
    );
  }
}
export default AnketePocetna;