import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom'
import './login.css';
import axios from 'axios';
import App from '../../../header';

var error = 'Greska';

class Login extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem("token")

    let logiran = true
    if(token == null) {
      logiran = false
    }

    this.state = {
      korisnickoIme: '',
      sifra: '',
      logiran
    }
}

  componentWillMount() {
    document.title = 'Login stranica'
  }

  componentDidMount() {
    if(this.state.logiran == true) {
      return <Redirect to="/romeo/home" />
    }
    document.getElementById('dioGreske').style.display = "none";
  }

  pratiPromjenuKorisnickogImena = (e) => {
    this.setState({korisnickoIme: e.target.value});
  }

  pratiPromjenuSifre = (e) => {
    this.setState({sifra: e.target.value});
  }
  
  validirajFormu() {
    var passwordRegex = /^[0-9a-z]+$/;
    if(this.state.korisnickoIme.length == 0) {
      error='Polje korisnicko ime ne moze ostati prazno'; 
      return false;
    }
    if(this.state.sifra.length == 0) {
      error='Polje sifra ne moze ostati prazno'; 
      return false;
    }
    if(this.state.sifra.length < 4) {
      error='Sifra mora imati barem 4 karaktera'; 
      return false;
    }
    if(!this.state.korisnickoIme.match(passwordRegex)) {
      error='Korisnicko ime ima nedozvoljen karakter';
      return false;
    }
    if(!this.state.sifra.match(passwordRegex)) {
      error='Sifra ima nedozvoljen karakter';
      return false;
    }
    return true;		
  }
   
  Submitaj = (e) => {
    document.getElementById('dioGreske').style.display = "none";
    e.preventDefault();
	  if(!this.validirajFormu()) {
      document.getElementById('greske').innerText = error;
      document.getElementById('dioGreske').style.display = "block";
	  } else {
      //validacija uspjesna
      //var baseUrl = 'http://localhost:31917';
      var baseUrl = 'https://si2019romeo.herokuapp.com';
      var body = {
        username: this.state.korisnickoIme,
        password: this.state.sifra
      }
      
      var headers = {
        "Content-Type": "application/json"
      }

      axios.post(baseUrl + '/login', body, headers).then((res) => {
        var data = res.data;
        this.setState.logiran = true;
        
        const parametar = '?username=' + this.state.korisnickoIme;
        //trazi id usera
        axios.get(baseUrl + '/users/id' + parametar).then((res2) => {
          var id = res2.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user);
          localStorage.setItem("id", id);
          //mora se sve reloadati da bi se osvjezio header
          window.location.reload();
          this.props.history.push("/romeo/home");
        });
        
      }).catch((error) => {
        var res = error.response;
        if(res) {
          if(res.status == 403) {
            document.getElementById('greske').innerText = "Korisnik ne postoji!";
          } else {
            document.getElementById('greske').innerText = "Nešto nije u redu!";
          }
        } else {
          document.getElementById('greske').innerText = "Aplikacija nije dobila odgovor od servera";
        }
        document.getElementById('dioGreske').style.display = "block";
      });
      
      //STUDENT
      //stest1
      //qwertzui

      //PROFESOR
      //zjuric1
      //password1

    }
  }

  UkloniGresku = (e) => {
    document.getElementById('greske').innerText = "";
      document.getElementById('dioGreske').style.display = "none";
  }
	
  render () {
    if(this.state.logiran) {
      return <Redirect to="/romeo/home" />
    }

    return (
      <div className="body">
        <div className="card text-white bg-primary " >
          <form className="loginForma">
          <label htmlFor="exampleInputEmail1">Korisničko ime:</label>
          <input type="email" className="korisnickoIme" className="form-control-plaintext" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Unesi korisnicko ime" onChange={this.pratiPromjenuKorisnickogImena} required></input>
<br></br>
          <label htmlFor="exampleInputPassword1">Password:</label>
      <input type="password" className="sifra" className="form-control-plaintext" id="exampleInputPassword1" placeholder="Unesi password" onChange={this.pratiPromjenuSifre} required></input>
            

            <button type="button" className="btn btn-primary" onClick = {this.Submitaj} >LOGIN</button>
          </form>
          
        </div>
        <div className="alert alert-dismissible alert-danger mb-0" id="dioGreske">
          <button type="button" className="close" data-placement="right" data-dismiss="alert" onClick = {this.UkloniGresku} >&times;</button>
          <div id="greske"></div>
        </div>
        <div className="footer">
          &copy; 2019 Elektrotehnički fakultet u Sarajevu
        </div>
      </div>
    );
  }
}

export default Login;