import React, { Component } from 'react';
import DodavanjeDatuma from './DodavanjeDatuma';
import OpisMaterijala from './OpisMaterijala'
import FileUredjivanje from './FileUredjivanje'
import axios from 'axios';
import './golf.css'

class objavaProfesor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      naziv: "",
      x: false,
      tekst: "",
      showMe: false,
      nazivObjave: props.naslov,
      opisObjave: props.opis,
      fileovi: props.fileovi,
      objavljeno: props.objavljeno,
      uNaziv: props.naslov,
      uOpis: props.opis,
      uChecked: "",
      datum: props.datumobjave,
      uspjesno: true,
      tekstGreske: "",
      tekstUredi: "Uredi",
      greskaVelicina: false
    }
    this.handleNazivChange = this.handleNazivChange.bind(this)
    this.handleOpisChange = this.handleOpisChange.bind(this)
    this.handleObjavljenoChange = this.handleObjavljenoChange.bind(this)
  }

  handleNazivChange(naziv) {
    this.setState({
      uNaziv: naziv.target.value,
    })
  }

  handleOpisChange(opis) {
    this.setState({
      uOpis: opis.target.value
    })
  }

  handleObjavljenoChange(objavljeno) {
    let tekst = ""
    if (objavljeno.target.checked) {
      tekst = "on"
    }
    this.setState({
      uChecked: tekst
    })
  }


  componentDidMount() {

    let tekst = ""
    if (!this.props.objavljeno) {
      tekst = "on"
    }
    this.setState({
      uChecked: tekst
    })
  }


  ucitaj(props) {
    let x = props.trenutnaAkademskaGodina == props.akademskaGodina
        this.setState({
          naziv: props.trenutnaAkademskaGodina,
          x: x
        })
  }

  componentWillReceiveProps(props) {
    this.ucitaj(props)
  }

  obrisi() {
    axios.delete(`http://si2019golf.herokuapp.com/r1/obrisiMaterijal/${this.props.idpredmeta}/${this.props.id}`).then(res => {
      if (res.data.loginError) {
        window.location.href = window.location.origin + '/romeo/login'
      }
      else {
        if(res.data.error){
          this.setState({
            uspjesno: false,
            tekstGreske: "Brisanje materijala nije moguće!"
          })
        }
        else{
        this.setState({
          uspjesno: true,
          tekstGreske: ""
        })
        alert("Materijal uspješno obrisan")
        window.location.reload()
        }
      }
    }).catch(err => {
      this.setState({
        uspjesno: false,
        tekstGreske: "Brisanje materijala nije moguće!"
      })
    })

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

  sakrij() {
    this.setState({
      uspjesno: !this.state.uspjesno
    })
  }

  handleClick = e => {
    let data = new FormData()
    let greskaVelicina = false
    data.append("napomena", document.getElementById("napomena").value)
    data.append("naziv", document.getElementById("naziv").value)
    data.append("idMaterijal", this.props.id)
    data.append("objavljeno", !document.getElementById("objavljeno").checked)
    let files = document.getElementById("fileovi").files
    for (let i = 0; i < files.length; i++) {
      if(files[i].size>1024*1024*2){
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
            uspjesno: false,
            tekstGreske: "Uređivanje materijala nije moguće"
          })
        }
        else{
        this.setState({
          uspjesno:true,
          nazivObjave: res.data.objava.naziv,
          opisObjave: res.data.objava.opis,
          objavljeno: res.data.objava.objavljeno,
          fileovi: res.data.objava.datoteke,
          showMe: !this.state.showMe,
          datum: res.data.objava.datum,
          greskaVelicina: false,
          tekst: "Uredi"
        })
      }
      }
    }).catch(err => {
      this.setState({
        uspjesno: false,
        tekstGreske: "Uređivanje materijala nije moguće!"
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
            uspjesno: false,
            tekstGreske: "Preuzimanje datoteke nije moguće!"
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
          uspjesno: true,
          tekstGreske: ""
        })
        }
      }
    }).catch(err => {
      this.setState({
        uspjesno: false,
        tekstGreske: "Preuzimanje datoteke nije moguće!"
      })
    })
  }

  render() {


    return (
      <div class="card sss">
        <div class="card-body">
          <div class="row">
            <div class='col-8'>
              <h5 class="card-title">{this.state.nazivObjave}
                {!this.state.objavljeno && <span class="badge badge-pill badge-primary" id="bedz">Sakriveno</span>}
              </h5>

            </div>
            <div class='col-4'>
              {this.state.x && <div>
                <button type="button" class="btn btn-primary golfDugme" onClick={() => this.prikaziUredjivanje()}>{this.state.tekstUredi}</button>
                <button type="submit" class="btn btn-danger golfDugme" onClick={() => this.obrisi()}>Obriši</button>
              </div>}
            </div>
          </div>
          <OpisMaterijala opisMaterijala={this.state.opisObjave}></OpisMaterijala>
          {this.state.fileovi.map(file => [<a href="#" onClick={() => this.skiniFile(file.naziv, file.id)} class='card-link'>{file.naziv}</a>, <br key='2'></br>])}
          <DodavanjeDatuma datumobjave={this.state.datum}></DodavanjeDatuma>
        </div>
        {this.state.showMe &&
          <div>
            <div class="card sss">
              <div class="card-body">
                <form encType="multipart/form-data">
                  <div class="form-group">
                    <label class="col-form-label" for="inputDefault" >Naslov: </label>
                    <input type="text" class="form-control" name="naziv" id="naziv" value={this.state.uNaziv} onChange={this.handleNazivChange}></input>
                  </div>
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
                  <input type="checkbox" checked={this.state.uChecked} id="objavljeno" onChange={this.handleObjavljenoChange}></input> Sakrij objavu
                  <button type="button" class="btn btn-primary" id="dugmeObjavi" onClick={this.handleClick}>Izmijeni</button>
                </form>
              </div>
            </div>
          </div>
        }
        {!this.state.uspjesno && <div class="alert alert-dismissible alert-danger golfw">
          <button type="button" class="close" onClick={() => this.sakrij()} data-dismiss="alert">&times;</button>
          {this.state.tekstGreske}
        </div>}
      </div>
    );
  }
}

export default objavaProfesor;