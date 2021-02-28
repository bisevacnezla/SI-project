import React from "react";
import './alphaCss.css'
import { NavLink } from 'react-router-dom'; 


const Navigation = () => {
  return (
    <div className="wrapper">
    <nav id="sidebar" className="shift">
    <div className="sidebar-header">
    <h3>Administrativni modul</h3>
    </div>
    <ul class="list-unstyled components">
          <li>
           <NavLink to="/student" className="col-sm-2" style={{color: "#ecf0f1"}}>Student</NavLink>
          </li>

          <li>
           <NavLink to="/odsjek" className="col-sm-2" style={{color: "#ecf0f1"}}>Odsjek</NavLink>
          </li>

         <li>
           <NavLink to="/profesor" className="col-sm-2" style={{color: "#ecf0f1"}}>Profesor</NavLink>
          </li>

          <li>
           <NavLink to="/asistent" className="col-sm-2" style={{color: "#ecf0f1"}}>Asistent</NavLink>
           </li>
          <li>
           <NavLink to="/predmet" className="col-sm-2" style={{color: "#ecf0f1"}}>Predmet</NavLink>
          </li>
          <li>
           <NavLink to="/lozinka" className="col-sm-2" style={{color: "#ecf0f1"}}>Izmjena lozinke</NavLink>
          </li>
          </ul>
          </nav>
          </div>
  );
};

export default Navigation;

