import React, { Component } from "react";
import axios from "axios";
import OsnovniPodaci from "./osnovniPodaci";
import DodavanjeTipovaFileova from "./dodavanjeTipovaFileova";
import BodoviZadaca from "./bodoviZadaca";
import PreviewZadace from "./previewZadace";
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import {
  inicijalizirajBrojZadataka,
  promjeniListuTipova,
  promjenaBodova
} from "../utils/kreiranje-zadace";
import jQuery from 'jquery'; 


class KreiranjeZadace extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      idZadace: null,
      idPredmet: urlParams.get("idPredmeta")
        ? Number(urlParams.get("idPredmeta"))
        : 1,
      radnja: "Kreiranje",
      naziv: "",
      datum: "2019-12-01",
      vrijeme: "23:59",
      postavka: [null],
      brojZadataka: "1",
      sviTipoviIsti: false,
      listaTipova: [[false, false, false, false, false]],
      sviBodoviIsti: false,
      listaBodova: [],
      ukupnoBodova: 0,
      validno: true,
      porukeGreske: ["", "", "", "", "", ""],
      uspjehKreiranja: false,
      neuspjehKreiranja: false,
      vecPostojiImeZadace: false
    };
  }

  provjeriToken = () => {
    try{
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
      complete: function (response) {
        if (response.status == 200) {
          return true;
        }
        else{
          window.location.href = 'https://si2019frontend.herokuapp.com/ROMEO'
        } 
      }  
    });}
    catch(e){

    }
  }
  

  handleChangeProps = props => {
    if (props.mainState) {
      this.setState({
        ...this.state,
        ...props.mainState
      });
    }
  };

  onChangePostavka = e => {
    // ovo bi se trebalo ubaciti u funkciju iznad "handleChangeProps" ili koju vec da ne bude posebna
    if (e) {
      if(e.target.files[0].size > 25000000) { // ogranicava na 25MB 
        alert ("Prevelik fajl");
        document.getElementById("file").value = null;
        this.setState({ postavka: [null] });
      } else {
        this.setState({
          postavka: e.target.files
        });
      }
    }
  };

  componentDidMount = () => {
    document.getElementById("kreirajKilo").style.display = "block";
    document.getElementById("preview").style.display = "none";
    this.handleChangeProps(this.props);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.mainState && this.props.mainState !== nextProps.mainState)
      this.handleChangeProps(nextProps);
  }
  // pocetak validacije
  datumValidan() {
    var trengodina = new Date().getFullYear();
    var trenmjesec = new Date().getMonth() + 1;
    var trendan = new Date().getDate();
    var nasagodina = Number.parseInt(this.state.datum.substring(0, 4));
    var nasmjesec = Number.parseInt(this.state.datum.substring(5, 7));
    var nasdan = Number.parseInt(this.state.datum.substring(8, 10));

    if (trengodina > nasagodina) return false;
    if (trengodina == nasagodina && trenmjesec > nasmjesec) return false;
    if (trengodina == nasagodina && trenmjesec == nasmjesec && trendan > nasdan)
      return false;
    if (
      trengodina == nasagodina &&
      trenmjesec == nasmjesec &&
      trendan == nasdan &&
      this.state.vrijeme != "23:59"
    )
      return false;
    return true;
  }

  validation = () => {
    var porukeGreske = [];

    var data = this.state;

    if (data.naziv.length < 2 || data.naziv.length > 30) {
      // [0] validacija naziva
      porukeGreske[0] = "Naziv mora sadržavati između 2 i 30 karaktera!";
    } else {
      porukeGreske[0] = "";
    }

    if (data.brojZadataka.toString().includes(".")) {
      // [1] validacija broja zadataka
      porukeGreske[1] = "Broj zadataka mora biti cijeli broj!";
    } else {
      porukeGreske[1] = "";
    }

    if (!this.datumValidan()) {
      // [2] validacija datuma
      porukeGreske[2] =
        "Datum i vrijeme moraju biti postavljeni minimum na danas u 23:59!";
    } else {
      porukeGreske[2] = "";
    }

    if (data.listaBodova.length === 0) {
      // [3] validacija maksimalnog broja bodova po zadacima
      porukeGreske[3] = "Potrebno je unijeti maksimalne bodove za zadatke!";
    } else {
      porukeGreske[3] = "";
    }

    // [4] validacija tipova zadataka
    for (var i = 0; i < data.listaTipova.length; i++) {
      var sviTipoviJednogZadatkaIsti = false;
      for (var j = 0; j < 5; j++) {
        if (data.listaTipova[i][j] === true) {
          sviTipoviJednogZadatkaIsti = true;
          break;
        }
      }
      if (!sviTipoviJednogZadatkaIsti) {
        porukeGreske[4] = "Potrebno je unijeti tipove za svaki zadatak!";
        break;
      }
      if (i === data.listaTipova.length - 1) {
        porukeGreske[4] = "";
      }
    }
    if (this.state.listaBodova.length != this.state.brojZadataka) {
      porukeGreske[5] =
        "Bodovi moraju biti uneseni i broj bodova mora biti veći od 0!";
      return porukeGreske;
    }

    if (data.listaBodova.length == 0) {
      porukeGreske[5] =
        "Bodovi moraju biti uneseni i broj bodova mora biti veći od 0!";
      return porukeGreske;
    }
    for (var i = 0; i < data.listaBodova.length; i++) {
      var element = data.listaBodova[i];
      if (parseFloat(element) <= 0) {
        // [5] validacija broja bodova po zadacima
        porukeGreske[5] =
          "Bodovi moraju biti uneseni i broj bodova mora biti veći od 0!";
        return porukeGreske;
      }
      if (isNaN(parseInt(element))) {
        porukeGreske[5] = "Popunite polja za bodove ispravnim vrijednostima!";
        return porukeGreske;
      }
      if (parseFloat(element) > 100) {
        porukeGreske[5] = "Broj bodova mora biti manji od 100!";
        return porukeGreske;
      }
      if (parseInt(element * 100) !== element * 100) {
        porukeGreske[5] = "Broj bodova može imati najviše dvije decimale!";
        return porukeGreske;
      }
      porukeGreske[5] = "";
    }
    return porukeGreske;
  };
  // kraj validacije

  handleClick = event => {
    var name = event.target.name;

    switch (name) {
      case "idiNaPreview": {
        // prelazak sa kreiranja zadace na preview

        var porukeGreske = this.validation();

        this.setState({
          porukeGreske: porukeGreske
        });
        var valid = true;
        for (var i = 0; i < porukeGreske.length; i++) {
          if (porukeGreske[i] != "") {
            valid = false;
            break;
          }
        }
        if (porukeGreske[0] == "")
          document.getElementById("naziv").className = "form-control";
        if (porukeGreske[1] == "")
          document.getElementById("brojZadataka").className = "form-control";
        if (porukeGreske[2] == "")
          document.getElementById("datum").className = "form-control";
        {/*if (porukeGreske[3] == "")
      document.getElementById("naziv").className = "form-control";*/}
        if (porukeGreske[3] == "") {
          document.getElementById("brbodKILO").className = "form-control";
          document.getElementById("brbodKILO").style.margin = "0 auto";
        }
        if (valid) {
          document.getElementById("kreirajKilo").style.display = "none";
          document.getElementById("preview").style.display = "block";
          this.setState({
            validno: true
          });
        } else {
          if (porukeGreske[0] !== "") {
            document.getElementById("naziv").className =
              "form-control is-invalid";
          }
          if (porukeGreske[1] !== "") {
            document.getElementById("brojZadataka").className =
              "form-control is-invalid";
          }
          if (porukeGreske[2] !== "") {
            document.getElementById("datum").className =
              "form-control is-invalid";
          }
          {/*if (porukeGreske[3] !== "") {
            document.getElementById("naziv").className =
              "form-control is-invalid";
          }
          if (porukeGreske[4] !== "") {
            document.getElementById("naziv").className =
              "form-control is-invalid";
          }*/}
          if (porukeGreske[3] !== "") {
            document.getElementById("brbodKILO").className =
              "form-control is-invalid static";
            /*document.getElementById("brbodKILO").style.margin = "0 auto";*/
          }
          this.setState({
            validno: false
          });
        }
        break;
      }
      case "idiNaKreiranjeZadace": {
        // prelazak sa previewa na kreiranje zadace
        document.getElementById("kreirajKilo").style.display = "block";
        document.getElementById("preview").style.display = "none";
        break;
      }
      case "addZadaca": {
        const fData = new FormData();

        if (this.state.postavka[0] !== null) {
          var file = this.state.postavka[0];
          if (file ) { //manji od 25 MB
            fData.append("file", new Blob([file], { type: file.type }));
            fData.append("imeFajlaPostavke", file.name);
          }
        }
        fData.append("state", JSON.stringify(this.state));

        if (this.state.radnja === "Kreiranje") {
          //this.provjeriToken();
          axios
            .post("https://si2019kilo.herokuapp.com/addZadaca", fData)
            .then(res => {
              if (res.status === 200) {
                this.setState({ uspjehKreiranja: true });
              } else if (res.status === 201) {
                this.setState({ vecPostojiImeZadace: true });
              } else {
                this.setState({ neuspjehKreiranja: true });
              }
            })
            .catch(() => this.setState({ neuspjehKreiranja: true }));
        } else if (this.state.radnja === "Azuriranje") {
          //this.provjeriToken();
          axios
            .put(
              `https://si2019kilo.herokuapp.com/zadaca/${this.props.mainState.idZadaca}`,
              fData
            )
            .then(res => {
              if (res.status === 200) {
                this.setState({ uspjehKreiranja: true });
              } else if (res.status === 201) {
                this.setState({ vecPostojiImeZadace: true });
              } else {
                this.setState({ neuspjehKreiranja: true });
              }
            });
        }
      }
      default: {
      }
    }
  };

  klik_isti_br_bod = () => {
    var isti_br_bod = parseFloat(document.getElementById("brbodKILO").value);

    var daLi = document.getElementById("customSwitch1").checked === true;
    this.setState({ sviBodoviIsti: daLi });

    var noviNiz = [];
    if (daLi) {
      var suma = 0;

      suma = this.state.brojZadataka * isti_br_bod;
      for (let i = 1; i <= this.state.brojZadataka; i++) {
        if (document.getElementById(i) !== null) {
          document.getElementById(i).value = isti_br_bod;
          noviNiz.push(isti_br_bod);
        }
      }

      this.setState({ listaBodova: noviNiz });
      document.getElementById("ukupnoStanje").innerHTML = suma;
      this.setState({ ukupnoBodova: suma });
    }
  };

  ugasiModal = event => {
    this.setState({
      validno: true
    });
  };

  handleChange = event => {
    let currentState = this.state;
    switch (event.target.name) {
      case "brojZadataka":
        currentState = {
          ...currentState,
          ...inicijalizirajBrojZadataka(event.target.value)
        };
        break;
      case "sviBodoviIsti":
      case "sviTipoviIsti":
        currentState[event.target.name] = event.target.checked;
        break;
      case "bodovi":
        currentState = {
          ...currentState,
          ...promjenaBodova(
            currentState.listaBodova,
            event.target.dataset.index,
            event.target.value
          )
        };
        break;
      default:
        currentState[event.target.name] = event.target.value;
    }
    this.setState({ ...currentState });
  };

  onChangeListaTipova = (i, j) => {
    const { listaTipova, brojZadataka, sviTipoviIsti } = this.state;

    this.setState({
      ...promjeniListuTipova(listaTipova, brojZadataka, sviTipoviIsti, i, j)
    });
  };

  ugasiPorukuUspjeh = () => {
    this.setState({ uspjehKreiranja: false });
  };

  ugasiPorukuNeuspjeh = () => {
    this.setState({ neuspjehKreiranja: false });
  };

  ugasiPorukuVecPostojiIme = () => {
    this.setState({ vecPostojiImeZadace: false });
  };

  render() {
    var radnjaGlagol;
    if (this.state.radnja === "Azuriranje") radnjaGlagol = "ažurirali";
    else radnjaGlagol = "kreirali";
    return (
      <div>
        <div>
          {/*<Modal isOpen={!this.state.validno}>
            <ModalHeader>Greška!</ModalHeader>
            <ModalBody>
              {this.state.porukeGreske.map((poruka, indeks) => (
                <p key={poruka + indeks}> {poruka} </p>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="primary w-25" onClick={this.ugasiModal}>
                Zatvori
              </Button>
            </ModalFooter>
          </Modal>*/}

          <Modal isOpen={this.state.uspjehKreiranja}>
            <ModalHeader background-color={"success"}>
              <p className="text-success">
                {" "}
                <b>Čestitamo!</b>
              </p>
            </ModalHeader>
            <ModalBody>Uspješno ste {radnjaGlagol} zadaću.</ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.ugasiPorukuUspjeh}>
                OK
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.neuspjehKreiranja}>
            <ModalHeader background-color={"danger"}>
              <p className="text-danger">
                {" "}
                <b>Dogodila se greška!</b>
              </p>
            </ModalHeader>
            <ModalBody> {this.state.radnja} zadaće nije uspjelo.</ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.ugasiPorukuNeuspjeh}>
                OK
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.vecPostojiImeZadace}>
            <ModalHeader background-color={"warning"}>
              <p className="text-warning">
                {" "}
                <b>Upozorenje!</b>
              </p>
            </ModalHeader>
            <ModalBody>
              Kreiranje zadaće nije uspjelo. Već postoji zadaća sa nazivom "
              {this.state.naziv} ".
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={this.ugasiPorukuVecPostojiIme}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div id="kreirajKilo" className="mt-4">
          <div class="container-fluid">
            <div class="row">
              <div class="col-3">
                <OsnovniPodaci
                  title={this.props.title}
                  onChange={this.handleChange}
                  onChangePostavka={this.onChangePostavka}
                  podaci={this}
                />
              </div>

              <div class="col-9">
                <BodoviZadaca onChange={this.handleChange} podaci={this} />
              </div>
            </div>
            <br></br><br></br>
            <div class="row">
            <div class="col">
                <DodavanjeTipovaFileova onChange={this.handleChange} podaci={this} />
              </div>
            </div>
          </div>
          <Button
            id="idiNaPreview"
            name="idiNaPreview"
            onClick={this.handleClick}
            color="info"
            class="btn btn-primary"
          >
            Preview zadaće
          </Button>
        </div>
        <div id="preview">
          <PreviewZadace podaci={this.state} />
          <Button
            className=" btn bg-primary"
            id="idiNaKreiranjeZadace"
            name="idiNaKreiranjeZadace"
            onClick={this.handleClick}
          >
            Natrag
          </Button>
          <Button
            className=" btn bg-primary ml-4"
            id="addZadaca"
            name="addZadaca"
            onClick={this.handleClick}
          >
            Potvrdi
          </Button>
        </div>
      </div>
    );
  }
}

export default KreiranjeZadace;
