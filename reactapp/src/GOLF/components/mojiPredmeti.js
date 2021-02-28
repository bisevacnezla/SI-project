import React, { Component } from 'react';
import axios from 'axios';
import SviPredmeti from './SviPredmeti';
import Spinner from 'react-bootstrap/Spinner'

axios.interceptors.request.use(function (config) {
  if(config.url.includes('si2019golf') || config.url.includes('9123')){
    config.params = { usernameGolf: window.localStorage.getItem("username") }
    const token = window.localStorage.getItem("token");
    config.headers.Authorization = token;
  }
  return config;
});


class mojiPredmeti extends Component {

  constructor(props) {
    super(props)
    this.state = {
      korisnik: localStorage.getItem("id"),
      mojiPredmeti: [],
      predmeti: [],
      greska: true
    }
  }

  componentDidMount() {
    axios.get(`http://si2019golf.herokuapp.com/r1/uloga/${this.state.korisnik}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        const uloga = res.data;
        axios.get(`http://si2019golf.herokuapp.com/r1/dajPredmeteZaNastavniAnsambl/${this.state.korisnik}?uloga=${uloga.uloga}`).then(res2 => {
          if (res2.data.loginError) {
            window.location.href = window.location.origin + '/romeo/login'
          }
          else {
            this.setState({
              predmeti: res2.data.predmeti,
              greska: false
            })
          }
        }).catch(err => {
          this.setState({
            greska: true
          })
        })
      }
    }).catch(err => {
      this.setState({
        greska: true
      })
    })


    axios.get(`http://si2019golf.herokuapp.com/r1/mojiPredmeti/${this.state.korisnik}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        this.setState({
          mojiPredmeti: res.data.predmeti
        })
      }
    }).catch(err => {
      this.setState({
        greska: true
      })
    })

  }

  render() {
    return (
      <div id='mojiPredmeti' style={{
        overflowY: "scroll",
        height: "100%",
        position: "absolute",
        width: "100%"
      }}>
        <h1>Moji predmeti</h1>
        {this.state.greska ? <div class="spinerGolf">
          <Spinner animation='border' role='status' variant='primary'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner></div> :
          <div>
            <SviPredmeti predmeti={this.state.predmeti} idKorisnika={this.state.korisnik} />
            <SviPredmeti predmeti={this.state.mojiPredmeti} idKorisnika={this.state.korisnik} /></div>}
      </div>
    );
  }
}

export default mojiPredmeti;