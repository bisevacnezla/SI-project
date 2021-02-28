import React, { Component } from 'react';
import DetaljiZadatka from './PregledDetaljaZadatka';

  class ListaZadataka extends Component {
    constructor(props){
      super();
    }
    render(){
      return (
        <form>
          <fieldset>
            <div>
              <Select />        
            </div>
          </fieldset>
         </form>
      )
    }
  }
  
  class Select extends Component {
    constructor(props){
      super();
      this.state = {
        tech: 'Lista zadataka: ',
        lista:false
      };
    }
    handleChange(e){
      this.setState({
        tech: e.target.value,
        lista:true
      })
    }
    render(){
      if(this.state.lista) return (
        <div>
         <h2>{this.state.tech}</h2>
          <select onChange={this.handleChange.bind(this)} value={this.state.tech}>
            <option value="Lista zadatak">Odaberite zadatak</option>
            <option value="Zadatak 1">Zadatak 1</option>
            <option value="Zadatak 2">Zadatak 2</option>
            <option value="Zadatak 3">Zadatak 3</option>
            <option value="Zadatak 3">Zadatak 4</option>
          </select>
          <DetaljiZadatka/>
        </div>
      );
      else return (
        <div>
         <h2>{this.state.tech}</h2>
          <select onChange={this.handleChange.bind(this)} value={this.state.tech}>
            <option value="Lista zadatak">Odaberite zadatak</option>
            <option value="Zadatak 1">Zadatak 1</option>
            <option value="Zadatak 2">Zadatak 2</option>
            <option value="Zadatak 3">Zadatak 3</option>
            <option value="Zadatak 3">Zadatak 4</option>
          </select>
         
        </div>
      )
    }
  }

  export default ListaZadataka;
