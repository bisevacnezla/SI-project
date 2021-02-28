import React, { Component } from 'react'
import './home.css';
import {Link} from 'react-router-dom';
import color from '@material-ui/core/colors/deepPurple';

export class home extends Component {
  render() {
    return (
        <div className="App">
        <nav class="NavPadding" >
          <h2>RASPORED</h2>
            <div class="collapse navbar-collapse" id="navbarColor01"> </div>
        </nav>

        <div class="btn-group-vertical" data-toggle="buttons">
          <br></br>
          <Link to ="/UNIFORM/rasporedStudent">
          <button type="button" class="btn btn-primary btn-lg" id="rasporedStudent" >Raspored studenta</button>
          <br></br>
          </Link>
          <Link to="/UNIFORM/rasporedProfesor">
          <button type="button" class="btn btn-primary btn-lg" id="rasporedProfesor">Raspored profesora</button>
          <br></br>
          </Link>
          <Link to="/UNIFORM/rasporedSaleZaStudenta">
          <button type="button" class="btn btn-primary btn-lg" id="rasporedSaleZaStudenta">Raspored sale za studenta</button>
          <br></br>
          </Link>
          <Link to="/UNIFORM/rasporedSaleZaProfesora">
          <button type="button" class="btn btn-primary btn-lg" id="rasporedSaleZaProfesora">Raspored sale za profesora</button>
          <br></br>
          </Link>
          <Link to="/UNIFORM/grupeStudent">
          <button type="button" class="btn btn-primary btn-lg" id="grupeStudent">Grupe predmeta za studenta</button>
          <br></br>
          </Link>
          <Link to="/UNIFORM/grupeProfesor">
          <button type="button" class="btn btn-primary btn-lg" id="grupeProfesor">Grupe predmeta za profesora</button>
          <br></br>
          </Link>
        </div>
      </div>
    )
  }
}

export default home
