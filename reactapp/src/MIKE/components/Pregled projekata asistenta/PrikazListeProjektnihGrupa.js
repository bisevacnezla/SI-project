import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import DetaljiProjektneGrupe from './PrikazDetaljaProjektneGrupe';

  class ListaGrupa  extends Component {
    constructor(props){
      super();
      this.state = {
        tech: 'Grupe: ',
        detalji:false
      };
    }
    handleChange(e){
      this.setState({
        tech: e.target.value,
        detalji:true
      })
    }
    render(){
      return (
        <div style={{textAlign:"left"}}>
         <h6 class="card-subtitle mb-2 text-muted">{this.state.tech}</h6>
          
          
        </div>
      )

      /*
      if(this.state.detalji) return(
        <div style={{textAlign:"left"}}>
         <h6 class="card-subtitle mb-2 text-muted">{this.state.tech}</h6>
          <select className="custom-select" id="dropdown" onChange={this.handleChange.bind(this)} value={this.state.tech}>
            <option className="list-group-item" value="Lista grupa">Odaberite grupu</option>
            <option className="list-group-item" value="Grupa 1">Grupa 1</option>
            <option className="list-group-item" value="Grupa 2">Grupa 2</option>
            <option className="list-group-item" value="Grupa 3">Grupa 3</option>
            <option className="list-group-item" value="Grupa 3">Grupa 4</option>
          </select>
          {
          //<button id="dugme" style={{ "margin": "2%", "height":"20px" , "width": "80px"}}  onClick={this.setRedirect}> OK</button>
          }
          <DetaljiProjektneGrupe/>
        </div>
      )
      else return (
        <div style={{textAlign:"left"}}>
         <h6 class="card-subtitle mb-2 text-muted">{this.state.tech}</h6>
          <select className="custom-select" id="dropdown" onChange={this.handleChange.bind(this)} value={this.state.tech}>
            <option className="list-group-item" value="Lista grupa">Odaberite grupu</option>
            <option className="list-group-item" value="Grupa 1">Grupa 1</option>
            <option className="list-group-item" value="Grupa 2">Grupa 2</option>
            <option className="list-group-item" value="Grupa 3">Grupa 3</option>
            <option className="list-group-item" value="Grupa 3">Grupa 4</option>
          </select>
          {
          //<button id="dugme" style={{ "margin": "2%", "height":"20px" , "width": "80px"}}  onClick={this.setRedirect}> OK</button>
          }
        </div>
      )*/
    }
  }

  export default ListaGrupa;