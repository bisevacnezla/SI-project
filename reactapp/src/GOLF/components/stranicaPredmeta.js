import React, { Component } from 'react'
import axios from 'axios'
import StranicaPredmetaUredjivanje from './StranicaPredmetaUredjivanje.js'
import StranicaPredmetaPregled from './StranicaPredmetaPregled.js'
import Spinner from 'react-bootstrap/Spinner'



class StranicaPredmeta extends Component {

  constructor(props) {
    super(props)
    console.log(window.localStorage.getItem("id"))
    this.state = {
      mozeUredjivati: false,
      akademskaGodina: decodeURIComponent(this.props.match.params.nazivAG),
      trenutnaAkademskaGodina: decodeURIComponent(this.props.match.params.nazivAG),
      korisnik: window.localStorage.getItem("id"),
      greska: true,
      mozePristupiti: true
    }
  }



  componentDidMount() {
    axios.get(`http://si2019golf.herokuapp.com/r1/mozePristupiti/${this.props.match.params.nazivAG}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if (res.data.error) {
          this.setState({
            greska: true
          })
        }
        else {
          console.log(res.data.uredjivanje)
          this.setState({
            mozePristupiti: res.data.uredjivanje=="true",
            greska: false
          })
          console.log(this.state)
        }
        }

    }).catch(err => {
      this.setState({
        greska: true
      })
    })

    axios.get(`http://si2019golf.herokuapp.com/r3/dajPrivilegije/${localStorage.getItem("id")}/${this.props.match.params.idPredmeta}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if (res.data.error) {
          this.setState({
            greska: true
          })
        }
        else {
          this.setState({
            mozeUredjivati: res.data.privilegija,
            greska: false
          })
        }
      }
    }).catch(err => {
      this.setState({
        greska: true
      })
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      akademskaGodina: decodeURIComponent(props.match.params.nazivAG)
    })
  }



  render() {

    return (
      <div style={{
        overflowY: "scroll",
        height: "100%",
        position: "absolute",
        width: "100%"
      }}>

      {this.state.mozePristupiti ? 
      <div>
        {
          this.state.greska ?
          <div> 
             <div class="spinerGolf">
            <Spinner animation='border' role='status' variant='primary'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner>
          </div>
          </div>:
          <div>
            {
              this.state.mozeUredjivati ? 
              <StranicaPredmetaUredjivanje akademskaGodina={this.state.akademskaGodina} trenutnaAkademskaGodina={this.state.trenutnaAkademskaGodina} idPredmeta={this.props.match.params.idPredmeta} idKorisnika={this.state.korisnik} />
              :
              <StranicaPredmetaPregled akademskaGodina={this.state.akademskaGodina} trenutnaAkademskaGodina={this.state.trenutnaAkademskaGodina} idPredmeta={this.props.match.params.idPredmeta} idKorisnika={this.state.korisnik} />
            }
           </div>
        }
      </div> : 
      <div>
        <div class="alert alert-dismissible alert-danger golfw">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Ne možete pristupiti ovoj stranici!
          </div>
      </div>
      }


      </div>
        
    )
  }
}

export default StranicaPredmeta
