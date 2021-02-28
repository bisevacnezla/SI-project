import React, { Component } from 'react';
import url from '../url'
import './style.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import SingleChoice from './SingleChoice'
import MultipleChoice from './MultipleChoice'
import StarRating from './StarRating'
import TextBox from './TextBox'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anketaZaPredmet: true,
      vrstaAnkete: 'javna anketa',
      nazivAnkete: '',
      opisAnkete: '',
      datumIstekaAnkete: new Date(),
      pitanja: [],
      vrstePitanja: [],
      odabranaVrstaPitanja: 'single-choice',
      predmeti: [],
      idPredmet: null,
      svePopunjeno: true,
      dateChanged: false,
      upozorenje: "",
      uloga: "STUDENT"
    }
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.kreirajAnketu = this.kreirajAnketu.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.dodajPitanje = this.dodajPitanje.bind(this);
  }

  azurirajPitanje = (state, i) => {
    this.setState((st) => {
      st.pitanja[i] = state
      return st
    })
  }

  handleRadioChange(event) {
      this.setState({vrstaAnkete: event.target.value}) 
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange(date) {
    this.setState({
      datumIstekaAnkete: date,
      aa: this.state.datumIstekaAnkete.toISOString().slice(0, 19).replace('T', ' '),
      dateChanged: true
    });
  }

  dodajPitanje() {
    this.setState({
      pitanja: this.state.pitanja.concat([1]),
      vrstePitanja: this.state.vrstePitanja.concat([this.state.odabranaVrstaPitanja])
    })
  }

  onSelectChange = event => {
    console.log(this.state.idPredmet, event.target.value)
    this.setState({
      idPredmet: event.target.value
    });
  }


  render() {
    return ( 
    
    <div id="containerKreiranje">
      <div>
        <div className="naslovliste">
          <h1>Kreiranje ankete</h1>
        </div>
      </div>
      <div style={{
          width: "80%",
          margin: "auto",
          padding: "25px"
       }}>
         
        <div>
          <form>
            <h5>Naziv ankete:</h5>
            <div className="row">
              <div className="col-6">
                <input type="text" className="form-control inputText" name="nazivAnkete" onChange={this.handleInputChange}/>
              </div>
            </div>
            <br/>
            <h5>Opis ankete:</h5>
            <div className="row">
              <div className="col-6">
                <input type="text" className="form-control inputText" name="opisAnkete" onChange={this.handleInputChange}/>
              </div>
            </div>
            <br />
            <h5>Datum isteka ankete:</h5>
            <div className="row">
              <div className="col-12">
                <DatePicker
                            onChange={this.handleDateChange} 
                            selected={this.state.datumIstekaAnkete} 
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm:ss"
                            timeCaption="time"
                            />
              </div>
            </div>
            <br/>
            <h5>Odaberite vrstu ankete:</h5>
            <div className="custom-control custom-radio">
              <input type="radio" id="customRadio1" name="vrstaAnketeRadio" value="javna anketa" className="custom-control-input" onChange={this.handleRadioChange} defaultChecked/>
              <label className="custom-control-label" for="customRadio1">Javna anketa</label>
            </div>
            {
              (this.state.uloga == "PROFESOR" || this.state.uloga == "ASISTENT") &&
            <div className="custom-control custom-radio">
              <input type="radio" id="customRadio2" name="vrstaAnketeRadio" value="anketa za predmet" className="custom-control-input" onChange={this.handleRadioChange}/>
              <label className="custom-control-label" for="customRadio2">Anketa za predmet</label>
            </div>
            }
            { this.state.uloga == "ADMIN" &&
            <div className="custom-control custom-radio">
              <input type="radio" id="customRadio3" name="vrstaAnketeRadio" value="anketa za sve predmete"className="custom-control-input" onChange={this.handleRadioChange}/>
              <label className="custom-control-label" for="customRadio3">Anketa za sve predmete</label>
            </div>
            }
            { this.state.vrstaAnkete != 'anketa za predmet' || (
              <div>
                <div className="form-group row">
                  <div className="col-6">
                    <br/>
                    <label for="exampleSelect1">Predmet</label>
                    <select className="form-control" id="exampleSelect1" value={this.state.idPredmet} onChange={e => this.onSelectChange(e)}>
                      {this.state.predmeti.map(predmet => (
                          <option value={predmet.id}>{predmet.naziv}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              ) 
            }
            <hr/>
            <h4>Pitanja:</h4>
            {this.state.pitanja.map((pitanje, i) => {
              switch(this.state.vrstePitanja[i]) {
                case 'single-choice':
                  return <SingleChoice azurirajPitanje={(state) => this.azurirajPitanje(state, i)}/>
                case 'multiple-choice':
                  return <MultipleChoice azurirajPitanje={(state) => this.azurirajPitanje(state, i)}/>
                case 'star-rating':
                  return <StarRating azurirajPitanje={(state) => this.azurirajPitanje(state, i)}/>
                case 'textbox':
                  return <TextBox azurirajPitanje={(state) => this.azurirajPitanje(state, i)}/>
              }
            })}
            <div class="row">
              
              <div class="form-group col-6 text-right">
               <select class="form-control" id="exampleSelect1" name="odabranaVrstaPitanja" onChange={this.handleInputChange}>
                  <option>single-choice</option>
                  <option>multiple-choice</option>
                  <option>textbox</option>
                  <option>star-rating</option>
                </select>
              </div>
              <div className="col-6 text-left">
                <button className="btn btn-primary" onClick={this.dodajPitanje} type="button">
                  Dodaj pitanje
                </button>
              </div>
            </div>
            <hr/>
            <div className="row justify-content-center">
              <button className="btn btn-primary" onClick={this.kreirajAnketu} style={{
                width: "30%"
              }}>
                Kreiraj anketu
              </button>
            </div>
              {
                !this.state.svePopunjeno &&
                <div className="alert alert-dismissible alert-danger" style={{marginTop: "10px"}}>
                  <button type="button" className="close" data-dismiss="alert" onClick={() => { this.setState({ upozorenje: '', svePopunjeno: true }); }}>&times;</button>
                  {this.state.upozorenje}
                </div>
              }
          </form>
        </div>
      </div>
    </div>
    );
  }

  componentDidMount() {
    let korisnik = window.localStorage.getItem("id")
    console.log(korisnik)
    axios.get(url + `/dajPredmete?idKorisnik=${korisnik}`).then(res => {
      console.log(res)
      this.setState({
        predmeti: res.data
      })
    })

    
      fetch('http://si2019golf.herokuapp.com/r1/uloga/' + window.localStorage.getItem("id"), {
          method: 'get',
          headers: {
              'Authorization': window.localStorage.getItem("token")
          }
      }).then(res => res.json())
        .then(res => {
              if(res.loginError) {
                  window.location.href = window.location.origin + '/romeo/login'
              }
              else {
                  this.setState({
                    uloga: res.uloga
                  })
              }
        })
  }

  nijePrazno(s) {
    return s.replace(/\s/g,'') != ''
  }

  provjera() {
    let s = this.state
    let ok = true
    ok = ok && this.nijePrazno(s.nazivAnkete) && this.nijePrazno(s.opisAnkete)
    for(let i = 0; i < s.pitanja.length; i++) {
      ok = ok && this.nijePrazno(s.pitanja[i].tekstPitanja)
      if(s.pitanja[i].odgovori) {
        for(let j = 0; j < s.pitanja[i].odgovori.length; j++) {
          ok = ok && this.nijePrazno(s.pitanja[i].odgovori[j])
        }
      }
    }
    return ok
  }

   kreirajAnketu(e) {

    if(!this.provjera()) {
      e.preventDefault()
      this.setState({
        svePopunjeno: false,
        upozorenje: "Sva polja moraju biti popunjena da biste kreirali anketu."
      })
      console.log("POPUNI SVE")
      return
    }
    if(!this.state.dateChanged) {
      e.preventDefault()
      this.setState({
        svePopunjeno: false,
        upozorenje: "Datum roka za popunjavanje mora biti postavljen da biste kreirali anketu."
      })
      return
    }

     let korisnik = window.localStorage.getItem("id")
     let idPredmet = this.state.idPredmet
      if(this.state.vrstaAnkete == 'anketa za predmet' && this.state.idPredmet == null && this.state.predmeti.length > 0 ) {
        idPredmet = this.state.predmeti[0].id
      }

      console.log("==============")
      fetch(url + '/createAnketa?username=' + window.localStorage.getItem("username"), {
        method: 'post',
        headers: {
          'Content-Type':'application/json',
          'Authorization': window.localStorage.getItem("token")
        },
        body: JSON.stringify({
          idNapravio: korisnik,
          idPredmet: idPredmet,
          tipAnkete: this.state.vrstaAnkete,
          naziv: this.state.nazivAnkete,
          opisAnkete: this.state.opisAnkete,
          datumIstekaAnkete: this.state.datumIstekaAnkete.toISOString().slice(0, 19).replace('T', ' '),
          pitanja: this.state.pitanja
        })
      }).then(res => res.json())
      .then((res, err) => {
        console.log(res.loginError)
        if(res.loginError) {
          e.preventDefault()
          window.location.href = window.location.origin + '/romeo/login'
          return
        }
        else {

        }
        this.setState({
          error: err
        })
      })
      
   }
}



export default App;
