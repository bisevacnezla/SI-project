import React, { Component } from 'react';
import axios from 'axios'
import './golf.css'
import Spinner from 'react-bootstrap/Spinner'


class oPredmetuStudent extends Component {

  constructor(props){
    super(props)
    this.state={
      objave: {},
      fileovi: [],
      uspjesno: true,
      tekstGreska: "",
      loading: true
    }
  }

  ucitaj(props){
    axios.get(`http://si2019golf.herokuapp.com/r3/dajOPredmetu/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res =>{
      if(res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else{
      this.setState({
        objave: res.data.objave[0],
        fileovi: res.data.objave[0].datoteke,
        loading: false
      })
    }
  }).catch(err => {
    this.setState({
      loading: true
    })
  })
  }

  skiniFile(naziv, id){
    axios({
      url: `http://si2019golf.herokuapp.com/r1/dajFile?id=${id}`,
      method: 'GET',
      responseType: 'blob'
    }).then((res) => {
      if(res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else{
        if(res.data.error){
          this.setState({
            uspjesno: false,
            tekstGreska: "Preuzimanje datoteke nije moguće!"
          })
        }
        else{
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', naziv);
        document.body.appendChild(link);
        link.click();
        }
        this.setState({
          uspjesno: true,
          tekstGreska: ""
        })
      }
    }).catch(err => {
      this.setState({
        uspjesno: false,
        tekstGreska: "Preuzimanje datoteke nije moguće!"
      })
    })
  }

  componentDidMount(){
    this.ucitaj(this.props)

  }

  componentWillReceiveProps(props){
    this.ucitaj(props)
  }

  sakrij() {
    this.setState({
      uspjesno: !this.state.uspjesno
    })
  }


  render() {
  
    return (
        <div class='divsaokvirom'>
          {this.state.loading ? <div class="spinerGolf"><Spinner animation='border' variant='primary' role='status'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner></div> : 
        <div>
            <h4 class='naslov'> O predmetu </h4>
            <div class="card" id="objava">
              <div class="card-body">
                <div>{this.state.objave.opis}</div>
                {this.state.fileovi.map(file => [<a href="#" onClick={() => this.skiniFile(file.naziv, file.id)} class='card-link'>{file.naziv}</a>,<br></br>])}
              </div>
            </div>
        </div>
      }
      {!this.state.uspjesno && <div class="alert alert-dismissible alert-danger golfw">
  <button type="button" class="close" onClick={() => this.sakrij()} data-dismiss="alert">&times;</button>
 {this.state.tekstGreska}
</div>}
        </div>
    );
  }
}

export default oPredmetuStudent;