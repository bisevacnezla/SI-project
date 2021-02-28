import React, { Component } from 'react';
import ObjavaStudent from './objavaStudent.js'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'


class LiteraturaStudent extends Component {

  state = {
    objave: [],
    loading: true
  }

  ucitaj(props) {
    axios.get(`http://si2019golf.herokuapp.com/r3/dajLiteraturuZaStudenta/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if (res.data.error) {
          this.setState({
            loading: true
          })
        }
        else {
          this.setState({
            objave: res.data.objave,
            loading: false
          })
        }
      }
    }).catch(err => {
      this.setState({
        loading: true
      })
    })

  }

  componentWillReceiveProps(props) {
    this.ucitaj(props)
  }

  render() {


    return (
      <div class="divsaokvirom">
        <h4 class='naslov'>Literatura</h4>
        {this.state.loading ?
          <div class="spinerGolf"><Spinner animation='border' variant='primary' role='status'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner></div>
          :
          <div>
            {this.state.objave.map(file => <ObjavaStudent idpredmeta={this.props.idpredmeta} naslov={file.naziv} opisMaterijala={file.opis} fileovi={file.datoteke} datumobjave={file.datum}></ObjavaStudent>)}
          </div>}
      </div>

    );
  }
}

export default LiteraturaStudent