import React, { Component } from 'react'
import './golf.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'


class JedanPredmet extends Component {

  state = {
    trenutnaAkademskaGodina: "",
    loading: true
  }

  componentDidMount() {
    axios.get(`http://si2019golf.herokuapp.com/r1/nazivTrenutneAkademskeGodine`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if(res.data.error){
        this.setState({
          loading: true
        })
      }
      else{
        this.setState({
          loading: false,
          trenutnaAkademskaGodina: res.data.naziv
        })
      }
      }
    }).catch(err => {
      this.setState({
        loading: true
      })
      console.log(err)
    })
  }


  render() {
    return (
      <div>
        {this.state.loading ? <div class="spinerGolf"><Spinner animation='border' variant='primary' role='status'>
          <span className="sr-only">Učitavanje...</span>
        </Spinner></div> : 
        <div class="card sss">
          <div class="card-body">
            <h4 class="card-title"><Link id="nazivPredmeta" to={'/Golf/stranicaPredmeta/' + encodeURIComponent(this.state.trenutnaAkademskaGodina) + '/' + this.props.predmet.id}>{this.props.predmet.naziv}</Link></h4>
            {this.props.predmet.opis}
          </div>
        </div> 
        }
      </div>
    )

  }
}

export default JedanPredmet
