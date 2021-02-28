import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './homePage.css';
import ModalChangeLog from './ModalChangeLog.js'
import axios from 'axios';

class HomePage extends Component {

  constructor(props) {
    super(props)
    const token = localStorage.getItem("token");
    let logiran = true;
    this.state = {
      logiran
    }
    if(token == null) {
      logiran = false;
      this.state = {
        logiran
      }
      return;
    }

    let korisnickoIme = localStorage.getItem("username");
    let id = localStorage.getItem("id");
    var baseUrl = 'https://si2019oscar.herokuapp.com';
    axios.get(baseUrl + '/pretragaId/' + id + '/dajUlogu').then((res) => {
      var rola = res.data;
      this.state = {
        logiran,
        korisnickoIme,
        rola
      }
      this.refs.dobroDosli.textContent = "Dobro došli, " + this.state.korisnickoIme;
      this.refs.viSte.textContent = "Vi ste " + this.state.rola;
    });
  }

  componentDidMount() {
    document.title = 'Home Page'
    if(this.refs.modal) {
      this.refs.modal.show()
    }
  }

  Odjavi = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.reload();
    this.props.history.push("/romeo/login");
  }

  render () {
     if (!this.state.logiran) {
      return <Redirect to="/romeo/login" />
    }
    return (
      <div className="App" >
        <div className="main">
          <h1 ref="dobroDosli" ></h1>
        </div>
        <div className="menu">
          <div ref="viSte" ></div>
        </div>
        <div className="footer">
          Elektrotehnički fakultet u Sarajevu
        </div>
        <ModalChangeLog container={this} ref = "modal" />
      </div>
      
    );
  }
}

export default HomePage;
