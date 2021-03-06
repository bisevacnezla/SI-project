import React, { Component } from 'react'
import axios from 'axios'
import OPredmetuProfesor from './oPredmetuProfesor'
import LiteraturaProfesor from './literaturaProfesor'
import SedmicaProfesor from './SedmicaProfesor'
import Spinner from 'react-bootstrap/Spinner'


class ObjaveProfesor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      naziv: props.akademskaGodina,
      sedmice: [],
      loading: true
    }
  }

  ucitaj(props) {
    axios.get(`http://si2019golf.herokuapp.com/r1/semestar/${this.props.idPredmeta}`).then(res => {
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
        axios.get(`http://si2019golf.herokuapp.com/r1/sedmice/${res.data.semestar}/${encodeURIComponent(props.akademskaGodina)}`).then(res2 => {
          if (res2.data.loginError) {
            window.location.href = window.location.origin + '/romeo/login'
          }
          else {
            if(res2.data.error){
              this.setState({
                loading: true
              })
            }
            else{
            this.setState({
              sedmice: res2.data.sedmice, 
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
    }
    }).catch(err => {
      this.setState({
        loading: true
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
      <div>
       { this.state.loading ? <div class="spinerGolf">
          <Spinner animation='border' role='status' variant='primary'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner></div> : 
        <div>
        <OPredmetuProfesor naziv={this.props.akademskaGodina} trenutnaAkademskaGodina={this.props.trenutnaAkademskaGodina} idPredmeta={this.props.idPredmeta}></OPredmetuProfesor>
        <LiteraturaProfesor naziv={this.props.akademskaGodina} trenutnaAkademskaGodina={this.props.trenutnaAkademskaGodina} idPredmeta={this.props.idPredmeta}></LiteraturaProfesor>
        {this.state.sedmice.map(sedmica => <SedmicaProfesor trenutnaAkademskaGodina={this.props.trenutnaAkademskaGodina} idpredmeta={this.props.idPredmeta} naslov={sedmica.pocetakSedmice + ' - ' + sedmica.krajSedmice} sedmice={sedmica.redniBrojSedmice} idPredmet={this.props.idPredmeta} naziv={this.props.akademskaGodina}></SedmicaProfesor>)}
        </div>
       }
      </div>
    )
  }
}

export default ObjaveProfesor