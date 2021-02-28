import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TabelaPregledaZadaca from "./tabelaPregledaZadaca";
import { taggedTemplateExpression, isNullLiteral } from "@babel/types";
import PrviPutSlanjeZadatka from "./prviPutSlanjeZadatka";
import ZadatakVecPoslan from "./zadatakVecPoslan";
import { async } from "q";
import jQuery from 'jquery'; 


/*0 "nije poslano", 
  1 "nije pregledano", 
  2 "pregledano", 
  3 "prepisano", 
  4 "komentar"*/

//user story 68 i user story 66 pushani skupa
class Student extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      rendajOpet: true,
      zadacaState: {
        listaZadaca: [],
        listaZadataka: [],
        maxBodoviPoZadacimaPoZadacama: [],
        bodoviPoZadacimaZadaca: [],
        stanjeZadacaPoZadacima: [],
        postavka: [],
        rokZaPredaju: [],
        idPoZadacimaZadaca: []
      },
      potrebno: [[], [], [], [] ],
      ukupnoBodova: [],
      moguceBodova: [],
      blokirajSelect: false,
      blokirajSelect2: false,
      brojZadace: 0,
      brojZadatka: 0,
      listaTipova: [],
      komentar: "",
      idStudenta: urlParams.get("idStudenta")
      ? Number(urlParams.get("idStudenta"))
      : 1,
      idZadatak: 0,
      idPredmeta: urlParams.get("idPredmeta")
      ? Number(urlParams.get("idPredmeta"))
      : 1,
      uploadZadatka: [null],
      velicinaFajla: "",
      nazivFajla: "",
      tipFajla: "",
      datumSlanja: "",
      vrijemeSlanja: ""
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

  testirajVrijeme = r => {
    var povratna_vrijednost;
    var danas = new Date();
    var trengodina = danas.getFullYear();
    var trenmjesec = danas.getMonth() + 1;
    var trendan = danas.getDate();

    var vrijeme = {
      sati: danas.getHours(),
      minute: danas.getMinutes()
    };

    var nasagodina = Number.parseInt(
      this.state.zadacaState.rokZaPredaju[r].substring(0, 4)
    );
    var nasmjesec = Number.parseInt(
      this.state.zadacaState.rokZaPredaju[r].substring(5, 7)
    );
    var nasdan = Number.parseInt(
      this.state.zadacaState.rokZaPredaju[r].substring(8, 10)
    );
    if (trengodina > nasagodina) povratna_vrijednost = false;
    else if (trengodina === nasagodina && trenmjesec > nasmjesec)
      povratna_vrijednost = false;
    else if (
      trengodina === nasagodina &&
      trenmjesec === nasmjesec &&
      trendan > nasdan
    )
      povratna_vrijednost = false;
    else if (
      trengodina === nasagodina &&
      trenmjesec === nasmjesec &&
      trendan === nasdan
    )
      if (
        vrijeme.sati < this.state.zadacaState.rokZaPredaju[r].substring(10, 13)
      )
        povratna_vrijednost = true;
      else if (
        vrijeme.sati ===
          this.state.zadacaState.rokZaPredaju[r].substring(10, 13) &&
        vrijeme.minute <
          this.state.zadacaState.rokZaPredaju[r].substring(13, 16)
      )
        povratna_vrijednost = true;
      else povratna_vrijednost = false;
    else povratna_vrijednost = true;
    
    return povratna_vrijednost;
  };

  obracunBodova = async (
    bodoviPoZadacimaZadaca,
    maxBodoviPoZadacimaPoZadacama
  ) => {
    var arr = new Array(bodoviPoZadacimaZadaca.length);

    for (var i = 0; i < bodoviPoZadacimaZadaca.length; i++) {
      arr[i] = new Array(bodoviPoZadacimaZadaca[i].length);
    }
    var pomocniUkupno = [];
    var pomocniMoguce = [];

    for (var i = 0; i < bodoviPoZadacimaZadaca.length; i++) {
      var zbirUkupno = 0;
      var zbirMoguce = 0;
      for (var j = 0; j < bodoviPoZadacimaZadaca[i].length; j++) {
        arr[i][j] =
          bodoviPoZadacimaZadaca[i][j] +
          "/" +
          maxBodoviPoZadacimaPoZadacama[i][j];
        zbirUkupno = zbirUkupno + bodoviPoZadacimaZadaca[i][j];
        zbirMoguce = zbirMoguce + maxBodoviPoZadacimaPoZadacama[i][j];
      }
      pomocniUkupno.push(zbirUkupno);
      pomocniMoguce.push(zbirMoguce);
    }
    this.setState({
      potrebno: arr,
      ukupnoBodova: pomocniUkupno,
      moguceBodova: pomocniMoguce
    });
  };

  componentDidMount = async () => {
    //na osnovu indeksa studenta, prikupiti podatke o zadacama
    //2. parametar axiosa, je sta ce tamo biti u backendu req.body
    var pomoc = 3;
    try {
      //this.provjeriToken();
      const res = await axios.get(
        `https://si2019kilo.herokuapp.com/dajZadaceZaStudenta/${this.state.idStudenta}/${
          this.state.idPredmeta
        }`
      );
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!
     //mora se prvo promijeniti potrebno, jer baca exception ukoliko ima vise zadaca, nego elemenata u nizu potrebno, onda prvo podesimo potrebno, pa tek onda liste, zbog izuzetaka koje je bacalo
      var privremeniPotrebno=[];
      for(var i=0; i<res.data.listaZadaca.length; i++)
        privremeniPotrebno.push([]);
       // console.log('privremeni ');
        //console.log(privremeniPotrebno);
        this.setState({potrebno:privremeniPotrebno}); 
        this.setState({ zadacaState: res.data });
      this.obracunBodova(
        res.data.bodoviPoZadacimaZadaca,
        res.data.maxBodoviPoZadacimaPoZadacama
      );
    } catch (e) {
      console.error("Error fetching zadaca by id", e);
    }
    document.getElementById("tabelaPregledaZadaca").style.display = "block";
    document.getElementById("prviPutSlanjeZadatka").style.display = "none";
    document.getElementById("zadatakVecPoslan").style.display = "none";
  };

  klikNaPoslati = async (r, k) => {
    var vrijednostIdZadatka = this.state.zadacaState.idPoZadacimaZadaca[r][k];
    this.setState({ idZadatak: vrijednostIdZadatka });

    var povratna_vrijednost = this.testirajVrijeme(r);

    //validacija ako je rok prosao, nema liste tipova
    if (povratna_vrijednost) {
      //this.provjeriToken();
      await axios
        .get(
          `https://si2019kilo.herokuapp.com/dozvoljeniTipoviZadatka/${vrijednostIdZadatka}`
        )
        .then(res => {
          this.setState({ listaTipova: res.data });
        });
      document.getElementById("uploadButton").disabled = false;
      this.setState({ blokirajSelect: false });
      if (this.state.uploadZadatka[0] !== null) {
        document.getElementById("posalji1").disabled = false;
      }
    } else {
      this.setState({ blokirajSelect: true });
      document.getElementById("uploadButton").disabled = true;
      document.getElementById("posalji1").disabled = true;
    }
    this.setState({
      brojZadace: r + 1,
      brojZadatka: k + 1
    });
    document.getElementById("tabelaPregledaZadaca").style.display = "none";
    document.getElementById("prviPutSlanjeZadatka").style.display = "block";
    document.getElementById("zadatakVecPoslan").style.display = "none";
  };

  klikNaVecPoslano = async (r, k) => {
    var vrijednostIdZadatka = this.state.zadacaState.idPoZadacimaZadaca[r][k];
    this.setState({ idZadatak: vrijednostIdZadatka });

    var povratna_vrijednost = this.testirajVrijeme(r);

    //validacija ako je rok prosao, nema liste tipova
    if (povratna_vrijednost) {
      //this.provjeriToken();
      await axios
        .get(
          `https://si2019kilo.herokuapp.com/dozvoljeniTipoviZadatka/${vrijednostIdZadatka}`
        )
        .then(res => {
          this.setState({ listaTipova: res.data });

          document.getElementById("uploadButton2").disabled = false;
          this.setState({ blokirajSelect2: false });
          if (this.state.uploadZadatka[0] !== null) {
            document.getElementById("posalji2").disabled = false;
          }
        });
    } else {
      this.setState({ blokirajSelect2: true });
      document.getElementById("uploadButton2").disabled = true;
      document.getElementById("posalji2").disabled = true;
    }
    //this.provjeriToken();
    await axios
      .get(
        `https://si2019kilo.herokuapp.com/popuniZadatakVecPoslan/${vrijednostIdZadatka}`
      )
      .then(res => {
        this.setState({
          datumSlanja: res.data.datumSlanja,
          vrijemeSlanja: res.data.vrijemeSlanja,
          nazivFajla: res.data.nazivFajla,
          velicinaFajla: res.data.velicinaFajla,
          komentar: res.data.komentar
        });
      });

    this.setState({
      brojZadace: r + 1,
      brojZadatka: k + 1
    });
    document.getElementById("tabelaPregledaZadaca").style.display = "none";
    document.getElementById("prviPutSlanjeZadatka").style.display = "none";
    document.getElementById("zadatakVecPoslan").style.display = "block";
  };

  downloadPostavka = async r => {
    if (this.state.zadacaState.postavka[r] === null) {
      // nema postavke za ovu zadacu
      alert("Ne postoji postavka za ovu zadaæu");
      return;
    }

    var nazivZadace = this.state.zadacaState.listaZadaca[r];
    //this.provjeriToken();
    axios
      .get(`https://si2019kilo.herokuapp.com/downloadPostavka/${nazivZadace}`)
      .then(res => {
        let resultByte = res.data.postavka.data;
        var bytes = new Uint8Array(resultByte);
        var blob = new Blob([bytes], { type: res.data.tipFajlaPostavke });

        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = res.data.naziv + "-" + res.data.imeFajlaPostavke;
        link.click();
      })
      .catch(e => console.log(e));
  };

  handleClick = async event => {
    var ime = event.target.name;

    switch (ime) {
      case "uploadFajla": {
        var nazivUploada = document.getElementById("uploadButton").value;
        if (nazivUploada === "") {
          nazivUploada = document.getElementById("uploadButton2").value;
        }

        var ekstenzija = "." + nazivUploada.split(".").pop();
        var file = event.target.files[0];

        var velicinaFajla = file.size / 1000000;
        velicinaFajla = parseInt(velicinaFajla * 10) / 10;
        if (velicinaFajla < 0.1) {
          // najmanje sto cemo upisivati u bazu je 0.1MB
          velicinaFajla = 0.1;
        }

        if (this.state.listaTipova.includes(ekstenzija) && velicinaFajla < 25) { // upload prhvatljiv
          var nazivFajlaSplit = file.name.split('.');
          var nazivFajla = "";
          for (var i = 0; i < nazivFajlaSplit.length - 1; i++) {
            nazivFajla = nazivFajla + nazivFajlaSplit[i];
          }

          this.setState({
            uploadZadatka: event.target.files,
            velicinaFajla: velicinaFajla,
            nazivFajla: nazivFajla,
            tipFajla: ekstenzija
          });
        } else {
          // upload neprihvatljiv
          this.setState({
            uploadZadatka: [null],
            velicinaFajla: "",
            nazivFajla: "",
            tipFajla: ""
          });
          document.getElementById("uploadButton").value = null;
          document.getElementById("uploadButton2").value = null;
          if(!this.state.listaTipova.includes(ekstenzija)) {
            alert("Nije dobar tip")
          }
          else {
            alert("Prevelik fajl")
          }
        }

        break;
      }

      case "posaljiZadatak": {
        
        // logika provjere validnog vremena slanja
        if (!this.testirajVrijeme(this.state.brojZadace - 1)) {
          this.setState({
            uploadZadatka: [null],
            velicinaFajla: "",
            nazivFajla: "",
            tipFajla: ""
          });
          document.getElementById("uploadButton").value = null;
          document.getElementById("uploadButton2").value = null;
          alert("Vrijeme za slanje zadace je isteklo!");

          break;
        }

        // datum i vrijeme slanja
        var datumIVrijemeSlanja = new Date().getFullYear().toString() + "-";

        if (new Date().getMonth() + 1 < 10) {
          datumIVrijemeSlanja = datumIVrijemeSlanja + "0";
        }
        datumIVrijemeSlanja =
          datumIVrijemeSlanja + (new Date().getMonth() + 1).toString() + "-";

        if (new Date().getDate() < 10) {
          datumIVrijemeSlanja = datumIVrijemeSlanja + "0";
        }
        datumIVrijemeSlanja =
          datumIVrijemeSlanja + new Date().getDate().toString() + " ";

        if (new Date().getHours() < 10) {
          datumIVrijemeSlanja = datumIVrijemeSlanja + "0";
        }
        datumIVrijemeSlanja =
          datumIVrijemeSlanja + new Date().getHours().toString() + ":";

        if (new Date().getMinutes() < 10) {
          datumIVrijemeSlanja = datumIVrijemeSlanja + "0";
        }
        datumIVrijemeSlanja =
          datumIVrijemeSlanja + new Date().getMinutes().toString() + ":";

        if (new Date().getSeconds() < 10) {
          datumIVrijemeSlanja = datumIVrijemeSlanja + "0";
        }
        datumIVrijemeSlanja =
          datumIVrijemeSlanja + new Date().getSeconds().toString();
        // kraj datum i vrijeme

        const fData = new FormData();
        var file = this.state.uploadZadatka[0];

        fData.append("file", new Blob([file], { type: file.type }));
        fData.append("nazivFajla", this.state.nazivFajla);
        fData.append("velicinaFajla", this.state.velicinaFajla);
        fData.append("tipFajla", this.state.tipFajla);
        fData.append("idStudent", this.state.idStudenta);
        fData.append("idZadatak", this.state.idZadatak);
        fData.append("datumIVrijemeSlanja", datumIVrijemeSlanja);

        if (document.getElementById("uploadButton2").value === "") {
          // prvi put slanje
          //this.provjeriToken();
          await axios.post("https://si2019kilo.herokuapp.com/slanjeZadatka", fData).then(res => {
            if (res.status === 200) {
              alert("Čestitamo! Uspješno ste poslali zadatak!");
            }
            else if (res.status === 201) {
              alert("Vec postoji ovaj zadatak")
            }
            else {
              alert("Greska sa bazom")
            }
            this.setState({
              uploadZadatka: [null],
              velicinaFajla: "",
              nazivFajla: "",
              tipFajla: ""
            })
            document.getElementById("uploadButton").value = null;
            document.getElementById("uploadButton2").value = null;

            // rutiranje nazad
          });

        } else {
          // ponovno slanje zadatka
          //this.provjeriToken();
          axios.put("https://si2019kilo.herokuapp.com/slanjeZadatka", fData).then(res => {
            if (res.status === 200) {
              alert("Uspjesno ste poslati zadatak");
            } else if (res.status === 201) {
              alert("Vec postoji ovaj zadatak");
            } else {
              alert("Greska sa bazom");
            }
            this.setState({
              uploadZadatka: [null],
              velicinaFajla: "",
              nazivFajla: "",
              tipFajla: ""
            })
            document.getElementById("uploadButton").value = null;
            document.getElementById("uploadButton2").value = null;

            //rutiranje nazad
          });
        }

        break;
      }

      case "ponisti": {
        this.setState({
          uploadZadatka: [null],
          velicinaFajla: "",
          nazivFajla: "",
          tipFajla: ""
        });
        document.getElementById("uploadButton").value = null;
        document.getElementById("uploadButton2").value = null;

        break;
      }

      case "preuzmi": {
        var idStudent = this.state.idStudenta;
        var idZadatak = this.state.idZadatak;
        //this.provjeriToken();
        axios
          .get(
            `https://si2019kilo.herokuapp.com/downloadZadatak/${idStudent}/${idZadatak}`
          )
          .then(res => {
            let resultByte = res.data.datoteka.data;
            var bytes = new Uint8Array(resultByte);
            var blob = new Blob([bytes], { type: res.data.mimeTipFajla });

            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = res.data.nazivDatoteke;
            link.click();
          })
          .catch(e => console.log(e));

        break;
      }

      case "pregled": {
        //salji na rutu u backendu
        
        //this.provjeriToken();
        await axios
          .get("https://si2019kilo.herokuapp.com/getPregledDatoteke")
          .then(res => {});
        break;
      }
      default: {
      }
    }
  };

  handleBack = () => {
    //ne kontam sto nece normalno da mi promijeni ikone :/ na ocjenjivanju radi sve ok
   document.location.reload();
   if (this.state.rendajOpet == false) {
    this.setState({
      rendajOpet: true
    });
  } else {
    this.setState({
      rendajOpet: false
    });
  }

  //this.forceUpdate();
    document.getElementById("tabelaPregledaZadaca").style.display = "block";
    document.getElementById("prviPutSlanjeZadatka").style.display = "none";
    document.getElementById("zadatakVecPoslan").style.display = "none";
  };
  render() {

   
   // console.log('student');
    //console.log(this.state);
    return (
      <div>
        <div id="tabelaPregledaZadaca">
          <TabelaPregledaZadaca key={this.state.rendajOpet} podaci={this} />
        </div>
        <div id="prviPutSlanjeZadatka">
          <PrviPutSlanjeZadatka podaci={this} />
        </div>
        <div id="zadatakVecPoslan">
          <ZadatakVecPoslan podaci={this} />
        </div>
      </div>
    );
  }
}

export default Student;
