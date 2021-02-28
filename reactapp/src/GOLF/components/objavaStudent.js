import React, { Component } from 'react';
import DodavanjeDatuma from './DodavanjeDatuma';
import OpisMaterijala from './OpisMaterijala';
import axios from 'axios';
import './golf.css'

class objavaStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datumobjave: this.props.datumObjave,
      fileovi: props.fileovi,
      uspjesno: true

    }
  }

  skiniFile(naziv, id) {
    axios({
      url: `http://si2019golf.herokuapp.com/r1/dajFile?id=${id}`,
      method: 'GET',
      responseType: 'blob'
    }).then((res) => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if(res.data.error){
          this.setState({
            uspjesno: false
          })
        }
        else{
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', naziv);
        document.body.appendChild(link);
        link.click();
        this.setState({
          uspjesno: true
        })
      }
    }
    }).catch(err => {
      this.setState({
        uspjesno: false
      })
    })
  }

  sakrij() {
    this.setState({
      uspjesno: !this.state.uspjesno
    })
  }

  render() {
    return (
      <div class="card sss" id="objava">
        <div class="card-body">
          <h5 class="card-title">{this.props.naslov}</h5>
          <OpisMaterijala opisMaterijala={this.props.opisMaterijala}></OpisMaterijala>
          {this.props.fileovi.map(file => [<a href="#" onClick={() => this.skiniFile(file.naziv, file.id)} class='card-link'>{file.naziv}</a>, <br key='2'></br>])}
          <DodavanjeDatuma datumobjave={this.props.datumObjave}></DodavanjeDatuma>
          {!this.state.uspjesno && <div class="alert alert-dismissible alert-danger golfw">
          <button type="button" class="close" onClick={() => this.sakrij()} data-dismiss="alert">&times;</button>
          Preuzimanje datoteke nije moguće!
        </div>}
        </div>
      </div>
    );
  }
}

export default objavaStudent;