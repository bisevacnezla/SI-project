import React, { Component } from 'react';
import ObjavaProfesor from './objavaProfesor'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

class LiteraturaProfesor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objave: [],
      showMe: false,
      tekst: "Dodaj objavu",
      x: false,
      id: "",
      loading: true,
      naziv: "",
      dodavanjeUspjelo: true,
      greskaVelicina: false
    }
  }

  ucitaj(props) {
    axios.get(`http://si2019golf.herokuapp.com/r3/dajLiteraturuZaProfesora/${this.props.idPredmeta}/${encodeURIComponent(props.naziv)}`).then(res => {
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
            loading: false,
            objave: res.data.objave
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
        if (res.data.error) {
          this.setState({
            loading: true
          })
        }
        else {
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

  handleClick = e => {
    let data = new FormData()
    let imena = []
    let greskaVelicina = false
    data.append("napomena", document.getElementById("napomena").value)
    data.append("naziv", document.getElementById("naziv").value)
    data.append("idMaterijal", this.props.idMaterijala)
    data.append("objavljeno", !document.getElementById("objavljeno").checked)
    data.append("idPredmet", this.props.idPredmeta)
    data.append("idTipMaterijala", 2)
    data.append("idAkademskaGodina", this.state.id)
    let files = document.getElementById("fileovi").files
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 2 * 1024 * 1024) {
        greskaVelicina = true
      }
      data.append('file', files[i])
      imena.push(files[i])
    }
    if (greskaVelicina) {
      this.setState({
        greskaVelicina: true
      })
    }
    else {
      axios.post("http://si2019golf.herokuapp.com/r1/dodajMaterijal", data).then(res => {
        if (res.data.loginError) {
          window.location.href = window.location.origin + '/romeo/login'
        }
        else {
          if (res.data.error) {
            this.setState({
              dodavanjeUspjelo: false
            })
          }
          else {
            let objave = this.state.objave
            objave.push(res.data.objava)
            this.setState({
              objave: objave,
              showMe: !this.state.showMe,
              tekst: "Dodaj objavu",
              dodavanjeUspjelo: true,
              greskaVelicina: false
            })
          }
        }
      }).catch(err => {
        this.setState({
          dodavanjeUspjelo: false
        })
      })
    }
  }

  sakrij() {
    this.setState({
      dodavanjeUspjelo: !this.state.dodavanjeUspjelo
    })
  }

  componentWillReceiveProps(props) {
    this.ucitaj(props)
  }

  prikaz() {
    let tekstic = ""
    if (!this.state.showMe) {
      tekstic = "Poništi"
    }
    else {
      tekstic = "Dodaj objavu"
    }
    this.setState({
      showMe: !this.state.showMe,
      tekst: tekstic
    })
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
            {this.state.objave.map(file => <ObjavaProfesor id={file.id} akademskaGodina={this.props.naziv} trenutnaAkademskaGodina={this.state.naziv} idpredmeta={this.props.idPredmeta} naslov={file.naziv} opis={file.opis} fileovi={file.datoteke} datumobjave={file.datum} objavljeno={file.objavljeno} idtip={2}></ObjavaProfesor>)}
          </div>
        }

        {this.state.showMe ?
          <div>
            <div class="card sss">
              <div class="card-body">
                <form encType="multipart/form-data">
                  <div class="form-group">
                    <label class="col-form-label" for="inputDefault">Naslov: </label>
                    <input type="text" class="form-control" name="naziv" id="naziv"></input>
                  </div>
                  <div class="form-group">
                    <label class="col-form-label" for="inputDefault">Opis: </label>
                    <textarea class="form-control" name="napomena" rows="3" id="napomena"></textarea>
                  </div>
                  <div class="form-group">
                    <label >Datoteke: </label>
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

                  <input type="checkbox" name="objavljeno" id="objavljeno"></input> Sakrij objavu
                <button type="button" class="btn btn-primary" id="dugmeObjavi" onClick={this.handleClick}>Objavi</button>
                </form>
              </div>
            </div>
          </div>
          : null}
        {!this.state.dodavanjeUspjelo && <div class="alert alert-dismissible alert-danger golfw">
          <button type="button" class="close" onClick={() => this.sakrij()} data-dismiss="alert">&times;</button>
          Dodavanje materijala nije uspjelo!
        </div>}
        {this.state.x && <button type="button" onClick={() => this.prikaz()} class="btn btn-primary" id="dodajObjavu">{this.state.tekst}</button>}
      </div>

    );
  }
}

export default LiteraturaProfesor