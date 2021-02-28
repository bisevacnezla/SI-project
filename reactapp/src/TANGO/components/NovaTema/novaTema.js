import React, { Suspense, Fragment, memo, Component } from "react";
import { unstable_createResource } from "react-cache";
import {
  withRouter
} from 'react-router-dom'
import Lista from '../ListaTema/listaTema';
import {Link} from 'react-router-dom';
import {IdUSER} from '../id.js';

class NovaTema extends Component {
  constructor() {
    super();
    this.state = {
      naziv: "",
      opis: "",
      povratak:false
    };

  }
  povratak = false;
  handleSubmit = evt => {
 
    this.setState({povratak:true});
  }

  handleNazivTemeChange = evt => {
    this.setState({ naziv: evt.target.value });
  };

  handleOpisTemeChange = evt => {
    this.setState({ opis: evt.target.value });
  };

  handleUnesi = evt => {
    if (!this.MozeBitiUneseno()) {
      evt.preventDefault();
      return;
    }
    const { naziv, opis } = this.state;
   
 evt.preventDefault()
 fetch("https://si2019tango.herokuapp.com/addTheme", {
method: 'POST',  
body: JSON.stringify({
  IdPredmeta: '4',
  IdUser:IdUSER,
  title:  naziv,
  description: opis,
  timeCreated: Date.now()

}),  
headers:{
  'Content-Type': 'application/json'
 }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
 
    alert(`Unos teme sa nazivom: ${naziv} i opisom: ${opis}`);
    return false;
  };

  MozeBitiUneseno() {
    const { naziv, opis } = this.state;
    return (
      naziv.length > 0 &&
      opis.length > 0 &&
      naziv.length < 200 &&
      opis.length < 200
    );
  }

  render() {
    if(this.state.povratak==true)
      return (<Lista/>);
    else{
      const isEnabled = this.MozeBitiUneseno();

    
    return (
      <div class="row">
      <div class="col"> </div>
      <div class="col"> 
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Nova tema</h4>
            <div>
              <div>
                <form onSubmit = {this.handleUnesi}>
                  <div class="form-group">
                    <label  class = "col-sm" for="nazivTeme">Naziv teme</label>
                    <input 
                      type="text" 
                      class="form-control mb-2" 
                      id="nazivTeme" 
                      placeholder="Naziv teme"  
                      value={this.state.naziv}
                      onChange={this.handleNazivTemeChange}/>
                  </div>
                  <div class="form-group">
                    <label for="opisTeme">Opis teme</label>
                    <textarea
                    className="form-control mb-2"
                    id="opisTeme"
                    rows="4"
                    placeholder="Opis teme"
                    value={this.state.opis}
                    onChange={this.handleOpisTemeChange}
                  />
                  </div>
                  <p v-html="desc" />
                  <div class="d-flex flex-row-reverse">
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!isEnabled}
                      onClick={this.handleUnesi}
                    > Unesi </button>
                    <Link to ={{pathname: '/Tango/Teme'}}>
                      <button type="button" className="btn btn-primary mr-2" >Povratak</button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col"> </div>
    </div>
    );
  }}
}

export default NovaTema;

