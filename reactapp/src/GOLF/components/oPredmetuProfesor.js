import React, { Component } from 'react';
import axios from 'axios'
import FileUredjivanje from './FileUredjivanje'
import Spinner from 'react-bootstrap/Spinner'


class oPredmetuProfesor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      objave: {},
      fileovi: [],
      x: true,
      showMe: false,
      opisObjave: "",
      fileovi: [],
      uOpis: "",
      loading: true,
      uredjivanjeUspjelo: true,
      tekstUredi: "Uredi",
      tekstGreska: "",
      greskaVelicina: false
    }
    this.handleOpisChange = this.handleOpisChange.bind(this)
  }


  ucitaj(props) {
    axios.get(`http://si2019golf.herokuapp.com/r3/dajOPredmetu/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res => {
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
          objave: res.data.objave[0],
          fileovi: res.data.objave[0].datoteke,
          uOpis: res.data.objave[0].opis,
          loading: false
        })
      }
      }
    }).catch(err => {
      this.setState({
        loading: true
      })
    })

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
        let x = res.data.naziv == props.naziv
        this.setState({
          naziv: res.data.naziv,
          x: x,
          id: res.data.id,
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

  componentDidMount() {
    this.ucitaj(this.props)

  }

  prikaziUredjivanje() {
    let tekst="Uredi"
    if(!this.state.showMe){
      tekst="Poništi"
    }
    this.setState({
      showMe: !this.state.showMe,
      tekstUredi: tekst 
    })
  }

  componentWillReceiveProps(props) {
    this.ucitaj(props)
  }

  handleOpisChange(opis) {
    this.setState({
      uOpis: opis.target.value
    })
    console.log(this.state)
  }

  handleClick = e => {
    let data = new FormData()
    let greskaVelicina = false
    data.append("napomena", document.getElementById("napomena").value)
    data.append("idMaterijal", this.state.objave.id)
    let files = document.getElementById("fileovi").files
    for (let i = 0; i < files.length; i++) {
      if(files[i].size>2*1024*1024){
        greskaVelicina = true
      }
      data.append('file', files[i])
    }
    if(greskaVelicina){
      this.setState({
        greskaVelicina: true
      })
    }
    else{
    axios.post("http://si2019golf.herokuapp.com/r1/updateMaterijal", data).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if(res.data.error){
            this.setState({
              uredjivanjeUspjelo: false,
              tekstGreska: "Uređivanje materijala nije uspjelo"
            })
        }
        else{
        this.setState({
          objave: res.data.objava,
          fileovi: res.data.objava.datoteke,
          showMe: !this.state.showMe,
          uredjivanjeUspjelo: true,
          tekstGreska: "",
          tekstUredi: "Uredi",
          greskaVelicina: false
        })
      }
      }
    }).catch(err => {
      this.setState({
        uredjivanjeUspjelo: false,
        tekstGreska: "Uređivanje materijala nije uspjelo"
      })
    })
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
            uredjivanjeUspjelo: false,
            tekstGreska: "Preuzimanje materijala nije uspjelo!"
          })
        }
        else {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', naziv);
        document.body.appendChild(link);
        link.click();
        this.setState({
          uredjivanjeUspjelo: true,
          tekstGreska: ""
        })
        }
      }
    }).catch(err => {
      this.setState({
        uredjivanjeUspjelo: false,
        tekstGreska: "Preuzimanje materijala nije uspjelo!"
      })
    })
  }

  sakrij(){
    this.setState({
      uredjivanjeUspjelo: !this.state.uredjivanjeUspjelo
    })
  }


  render() {

    return (

      <div class='divsaokvirom'>
        <h4 class='naslov'> O predmetu </h4>
        {this.state.loading ? <div class="spinerGolf">
          <Spinner animation='border' role='status' variant='primary'>
            <span className="sr-only">Učitavanje...</span>
          </Spinner></div> :
        <div class="card sss">
          {this.state.x &&
            <div class="gdugme">
              <button type="button" class="btn btn-primary dugmeDesno" onClick={() => this.prikaziUredjivanje()}>{this.state.tekstUredi}</button></div>
          }
          <div class="card-body">
            <div>{this.state.objave.opis}</div>
            {this.state.fileovi.map(file => [<a href="#" onClick={() => this.skiniFile(file.naziv, file.id)} class='card-link'>{file.naziv}</a>, <br></br>])}
          </div>
        </div>}

        {this.state.showMe &&
          <div>
            <div class="card sss">
              <div class="card-body">
                <form encType="multipart/form-data">
                  <div class="form-group">
                    <label class="col-form-label" for="inputDefault" >Opis: </label>
                    <textarea class="form-control" name="napomena" rows="3" id="napomena" value={this.state.uOpis} onChange={this.handleOpisChange}></textarea>
                  </div>
                  {this.state.fileovi.map(file => <FileUredjivanje id={file.id} naziv={file.naziv} />)}
                  <div class="form-group">
                    <label for="exampleInputFile">Datoteke: </label>
                    <br></br>
                    <input type="file" name="fileovi" id="fileovi" multiple></input>
                    <small id="fileHelp" class="form-text text-muted">Maksimalna veličina datoteke je 2MB</small>
                    {this.state.greskaVelicina && 
                    <div class="alert alert-dismissible alert-danger golfw">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    Veličina nekih datoteka je veća od dozvoljene!
                  </div>
                    }
                  </div>
                  <button type="button" class="btn btn-primary" id="dugmeObjavi" onClick={this.handleClick}>Izmijeni</button>
                </form>
              </div>
            </div>
          </div>}
          {!this.state.uredjivanjeUspjelo && <div class="alert alert-dismissible alert-danger golfw">
  <button type="button" class="close" onClick={() => this.sakrij()} data-dismiss="alert">&times;</button>
 {this.state.tekstGreska}
</div>}

      </div>
    );
  }
}

export default oPredmetuProfesor;