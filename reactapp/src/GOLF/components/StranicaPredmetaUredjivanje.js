import React, { Component } from 'react'
import axios from 'axios'
import Dropdown from './dropdown'
import ObjaveProfesor from './ObjaveProfesor'
import Spinner from 'react-bootstrap/Spinner'


class StranicaPredmetaUredjivanje extends Component {

    state={
      naziv: "",
      godine: [],
      nazivAg: this.props.akademskaGodina,
      loading: true
    }

    componentDidMount(){
      axios.get(`http://si2019golf.herokuapp.com/r5/dajNaziv/${this.props.idPredmeta}`).then(res =>{
        if(res.data.loginError) {
          window.location.href = window.location.origin + '/romeo/login'
        }
        else{
          if(res.data.error){
            this.setState({
              loading: true
            })
          }else{
        this.setState({
          naziv: res.data.naziv,
          loading: false
        })
      }
      }
    }).catch(err => {
      this.setState({
        loading: true
      })
    })
    axios.get(`http://si2019golf.herokuapp.com/r8/getAkademskaGodina/`).then(res =>{  
      if(res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else{
        if(res.data.error){
          this.setState({
            loading: true
          })
        }
        else{
      this.setState({
        godine:res.data.godine,
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

  render() {

    return (
      <div>
        {this.state.loading ? 
        <div class="spinerGolf">
        <Spinner animation='border' role='status' variant='primary'>
          <span className="sr-only">Učitavanje...</span>
        </Spinner></div>
        :
        <div>
        <div>
          <h1 class="naslovPredmeta">{this.state.naziv}</h1>
        </div><br></br>
        <div>
          <Dropdown godine={this.state.godine} nazivAg = {this.props.akademskaGodina} idKorisnika={this.props.idKorisnika} idPredmeta={this.props.idPredmeta}/>
        </div>
        <ObjaveProfesor idPredmeta={this.props.idPredmeta} akademskaGodina={this.props.akademskaGodina} trenutnaAkademskaGodina={this.props.trenutnaAkademskaGodina}></ObjaveProfesor>
        </div>
        }
      </div>
    )
  }
}

export default StranicaPredmetaUredjivanje