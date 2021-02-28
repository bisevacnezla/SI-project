import React, { Component } from "react";
import axios from "axios";
import "./bootstrap.min.css";
import { pdfjs } from "react-pdf";
import { withRouter } from "react-router-dom"
import jQuery from "jquery"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class UgovorOUcenju extends Component {
  //fali api za dobavljanje smjerova iz baze
  //fali api za obavezne predmete
  constructor() {
    super();
    this.state = {
      izabranaGodina: 1,
      izabraniSmjer: 1,
      izabraniSemestar: 1,
      listaIzbornih: "",
      listaObaveznih: "",
      izborniForma: [],
      hasError: false,
      studentId: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
      username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
      token: window.localStorage.getItem("token"),
      pdfUrl: null,
      ime: "Neko",
      prezime: "Neko",
      indeks: "00000",
      ciklus: 1,
      sviSmjerovi: [],
      classKreiraj: "btn btn-primary",
      classPrikazi: "btn btn-primary",
      OK: true
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handlePrikaz = this.handlePrikaz.bind(this);
    this.promjenaGodineStudija = this.promjenaGodineStudija.bind(this);
    this.promjenaSmjera = this.promjenaSmjera.bind(this);
    this.promjenaSemestra = this.promjenaSemestra.bind(this);
    this.prikaziIzborne = this.prikaziIzborne.bind(this);
  }
  handleCreate() {
    //kreiranje ugovora
    if (window.localStorage.getItem("id") != null) {
      axios({
        url: 'https://si2019romeo.herokuapp.com/users/validate',
        type: 'get',
        dataType: 'json',
        data: jQuery.param({
          username: window.localStorage.getItem("username")
        }),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
        },
    })
    
    .then(res => {
      this.handleGetKreiraj();
  })
  .catch(res=>{
    this.props.history.push("/Romeo");
  })
    }
    else this.handleGetKreiraj();
  }

  handleGetKreiraj = () => {
    axios
      .post("https://si2019siera.herokuapp.com/ugovori/kreiraj/" + this.state.studentId, {
        ime: this.state.ime,
        prezime: this.state.prezime,
        semestar: this.state.izabraniSemestar,
        ciklus: this.state.ciklus,
        odsjek: this.state.izabraniSmjer,
        indeks: this.state.indeks,
        obavezni: this.state.listaObaveznih,
        izborni: this.state.listaIzbornih,
        godina: this.state.izabranaGodina
      })
      .then(res => {
        if (res.data.success && res.data.userAutorizacija) {
          this.setState({ OK: true });
        }
        else {
          this.setState({ OK: false });
        }
      })
      .catch(res => {
        console.log(res);
      });
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  promjenaGodineStudija(event) {
    this.setState({ izabranaGodina: event.target.value }, function () {
      console.log(this.state.izabranaGodina);
      if (this.state.izabranaGodina <= 3) {
        this.setState({
          ciklus: 1
        })
      }
      else if (this.state.izabranaGodina >= 5 && this.state.izabranaGodina <= 6) {
        this.setState({
          ciklus: 2
        })
      }
      else {
        this.setState({
          ciklus: 3
        })
      }
      this.prikaziIzborne();
    });
  }

  promjenaSmjera(event) {
    this.setState({ izabraniSmjer: event.target.value }, function () {
      console.log(this.state.izabraniSmjer);
      this.prikaziIzborne();
    });
  }

  promjenaSemestra(event) {
    this.setState({ izabraniSemestar: event.target.value }, function () {
      console.log(this.state.izabraniSemestar);
      this.prikaziIzborne();
    });
  }

  prikaziIzborne() {
    if (window.localStorage.getItem("id") != null) {
      axios({
        url: 'https://si2019romeo.herokuapp.com/users/validate',
        type: 'get',
        dataType: 'json',
        data: jQuery.param({
          username: window.localStorage.getItem("username")
        }),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
        },
    })
    
    .then(res => {
      this.handleGetIzborni();
    })
    .catch(res=>{
      this.props.history.push("/Romeo");
    })
  }
    else this.handleGetIzborni();
  }

  handleGetIzborni = () => {
    axios
      .get(
        `https://si2019siera.herokuapp.com/predmeti/` +
        this.state.izabraniSmjer +
        `/` +
        this.state.izabranaGodina +
        `/` +
        this.state.izabraniSemestar
      )
      .then(res => {

        if (res.data.success) {
          var predmeti = res.data.dostupniPredmeti.map(obj => obj.naziv);
          var obavezan = res.data.dostupniPredmeti.map(obj => obj.obavezan);
          var help = [];
          var izborni = "";
          var obavezni = "";

          for (var i = 0; i < predmeti.length; i++) {
            if (i != 0) {
              if (obavezan[i] == "0") {
                izborni += ("," + predmeti[i]);
                help.push(predmeti[i]);
              }
              else obavezni += ("," + predmeti[i]);
            }
            else if (i == 0) {
              if (obavezan[i] == "0") {
                izborni += predmeti[i];
                help.push(predmeti[i]);
              }
              else obavezni += predmeti[i];
            }

          }
          this.setState({
            listaIzbornih: izborni,
            listaObaveznih: obavezni,
            izborniForma: help,
            classKreiraj: "btn btn-primary",
            classPrikazi: this.state.pdfUrl != null ? "btn btn-primary" : "btn btn-primary disabled"
          });
        }
        else {
          this.setState({
            listaIzbornih: "",
            listaObaveznih: "",
            izborniForma: [],
            classKreiraj: "btn btn-primary disabled",
            classPrikazi: "btn btn-primary disabled"
          });
        }
      });
  }

  componentDidMount() {
    this.prikaziIzborne();
    //dobavljanje ugovora za prikaz
    if (window.localStorage.getItem("id") != null) {
      axios({
        url: 'https://si2019romeo.herokuapp.com/users/validate',
        type: 'get',
        dataType: 'json',
        data: jQuery.param({
          username: window.localStorage.getItem("username")
        }),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
        },
    })
    
    .then(res => {
      this.handleGetGlavni();
  })
  .catch(res=>{
    this.props.history.push("/Romeo");
  })
    }
    else this.handleGetGlavni();
  }

  handleGetGlavni = () => {

    axios
      .get("https://si2019siera.herokuapp.com/ugovori/url/" + this.state.studentId)
      .then(res => {
        if (res.data.success) {
          this.setState({
            pdfUrl: res.data.link
          });
        }
      })
      .catch(res => {
        console.log(res.error);
      });

    //dobavljanje studenta
    axios
      .get("https://si2019siera.herokuapp.com/studenti/" + this.state.studentId)
      .then(res => {
        if (res.data.success) {
          this.setState({
            ime: res.data[0].ime,
            prezime: res.data[0].prezime,
            indeks: res.data[0].index
          });
        }
      })
      .catch(res => {
        console.log(res.error);
      });
    //dobavljanje smjerova
    axios
      .get("https://si2019siera.herokuapp.com/odsjek/" + this.state.studentId)
      .then(res => {
        if (res.data.success) {
          this.setState({
            sviSmjerovi: res.data.odsjeci
          })
        }
      })
      .catch(res => {
        console.log(res);
      });
    if (this.state.pdfUrl != null) {
      this.setState({
        classPrikazi: "btn btn-primary"
      })
    }
    else {
      this.setState({
        classPrikazi: "btn btn-primary disabled"
      })
    }
  }

  handlePrikaz() {
    //prikaz u prozoru


    const win = window.open("", "_self");
    let html = '';

    html += '<html>';
    html += '<body style="margin:0!important">';
    html += '<embed width="100%" type="application/pdf" javascript="allow" height="100%" src="' + this.state.pdfUrl + '" />';
    html += '</body>';
    html += '</html>';


    setTimeout(() => {
      win.document.write(html);
      this.props.history.push(this.state.pdfUrl);
    }, 0);


  }

  render() {

    return (
      <div>
          <div className="container-fluid" style={{ marginTop: "30px" }} >
            <h2 style={{ marginBottom: "30px" }}>Ugovor o učenju</h2>
            <div className="card align-items-center">
              <div className="card-body" style={{ minWidth: "100%" }}>
                <div className="row justify-content-lg-around justify-content-md-center">
                  <div className="col-lg-4 col-sm-12 col-md-6 justify-content-sm-center ">
                    <h4 className="card-title">Kreiranje ugovora</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Ovdje možete kreirati ugovor o učenju za upis u naredni semestar.</h6>
                    {!this.state.OK ? <h6 className="card-subtitle mb-2 text-danger">Došlo je do greške!</h6>:""}
                    <div style={{ textAlign: "left" }}>
                      <label className="col-form-label col-form-label-lg">
                        Godina studija
                  </label>
                    </div>

                    <select
                      className="custom-select"
                      onChange={e => this.promjenaGodineStudija(e)}
                    >
                      <option value="1">1.</option>
                      <option value="2">2.</option>
                      <option value="3">3.</option>
                      <option value="4">4.</option>
                      <option value="5">5.</option>
                      <option value="6">6.</option>
                      <option value="7">7.</option>
                      <option value="8">8.</option>
                    </select>

                    <div style={{ textAlign: "left" }}>
                      <label className="col-form-label col-form-label-lg">
                        Smjer
                  </label>
                    </div>
                    <select
                      className="custom-select"
                      onChange={e => this.promjenaSmjera(e)}
                    >
                      {this.state.sviSmjerovi.map(x =>
                        <option value={x.idOdsjek}>{x.naziv}</option>
                      )}
                    </select>

                    <div style={{ textAlign: "left" }}>
                      <label className="col-form-label col-form-label-lg">
                        Semestar
                  </label>
                    </div>
                    <select
                      className="custom-select"
                      name="semestri"
                      onChange={e => this.promjenaSemestra(e)}
                    >
                      <option value="1">1.</option>
                      <option value="2">2.</option>
                    </select>

                    <div className="form-group">
                      <div style={{ textAlign: "left" }}>
                        <label className="col-form-label col-form-label-lg">
                          Izborni predmeti
                    </label>
                      </div>

                      {this.state.listaIzbornih.length === 0 ? (
                        <p>Nema izbornih predmeta</p>
                      ) : (
                          ""
                        )}
                      {this.state.izborniForma.map((item, i) => (
                        <div className="custom-control custom-checkbox" key={i}>
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={"customCheck" + i}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={"customCheck" + i}
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>


                    <div className="d-flex justify-content-end">
                      <button type="submit" className={this.state.classKreiraj} onClick={this.handleCreate}>Kreiraj ugovor</button>

                      <button type="button" className={this.state.classPrikazi} onClick={this.handlePrikaz} style={{ marginLeft: "10px" }}>Prikaži ugovor</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(UgovorOUcenju);
