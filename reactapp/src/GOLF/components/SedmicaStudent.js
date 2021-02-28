import React, { Component } from 'react'
import axios from 'axios'
import ObjavaStudent from './objavaStudent'
import Spinner from 'react-bootstrap/Spinner'


class SedmicaStudent extends Component {

  constructor(props){
    super(props);
    this.state={
      objave: [],
      loading: true
    }
  }

  ucitaj(props){
    axios.get(`http://si2019golf.herokuapp.com/r3/dajMaterijaleZaStudenta/${this.props.idPredmet}/${props.sedmice}/${encodeURIComponent(props.naziv)}`).then(res =>{
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

  componentDidMount(){
      this.ucitaj(this.props)
  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }

  render() {
    return (
      
        <div class='divsaokvirom'>
            <h4 class='naslov'>{this.props.naslov}</h4>
            { this.state.loading ? <div class="spinerGolf">
          <Spinner animation='border' role='status' variant='primary'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner></div> :
            <div>{this.state.objave.map(file => <ObjavaStudent idpredmeta={this.props.idpredmeta} naslov={file.naziv} opisMaterijala={file.opis} fileovi={file.datoteke} datumobjave={file.datum}></ObjavaStudent>)}</div>
            }
            </div>
    );
  }
}

export default SedmicaStudent