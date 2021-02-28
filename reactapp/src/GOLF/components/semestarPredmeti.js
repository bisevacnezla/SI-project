import React, { Component } from 'react'
import SviPredmeti from './SviPredmeti';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';


class semestarPredmeti extends Component {

  state = {
    predmeti: [],
    korisnik: window.localStorage.getItem("id"),
    greska: true
  }

  ucitaj(props) {
    let { ciklus, odsjek, semestar } = props.match.params;
    axios.get(`http://si2019golf.herokuapp.com/r1/predmeti/${ciklus}/${odsjek}/${semestar}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        const predmeti = res.data;
        if (res.data.error) {
          this.setState({
            greska: true
          })
        }
        else{
          this.setState({
            predmeti: predmeti.predmeti,
            greska: false
          });
        }
      }
    }).catch(err => {
      this.setState({
        greska: true
      })
    })

  }

  componentDidMount() {
    this.ucitaj(this.props)
  }

  componentWillReceiveProps(props) {
    this.ucitaj(props)
  }

  render() {

    return (
      <div style={{
        overflowY: "scroll",
        height: "100%",
        position: "absolute",
        width: "100%"
      }}>
        {this.state.greska ? <div class="spinerGolf"><Spinner animation='border' variant='primary' role='status'>
          <span className="sr-only">Učitavanje...</span>
        </Spinner></div> : <SviPredmeti predmeti={this.state.predmeti} idKorisnika={this.state.korisnik} />}
      </div>
    )
  }
}

export default semestarPredmeti