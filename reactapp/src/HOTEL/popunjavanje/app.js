import React, { Component } from 'react';
import './style.css';
import Countdown from './Countdown'
import axios from 'axios';
import url from '../url'
import StarRatingComponent from 'react-star-rating-component';
import Redirect from './Redirect'

class Popunjavanje extends Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
  }
  state = {
    imeKreator: '',
    datumKreiranjaAnkete: '',
    datumIstekaAnkete: '',
    tipAnkete: '',
    nazivPredmeta: '',
    isteklo: false,
    pitanja: [],
    odgovori: [],
    showSucess: false,
    showError: '',
    error: '',
    popunjeno: false
  }

  onStarClick(nextValue, prevValue, name) {
    console.log(name, nextValue);
    const pomocna = this.state.odgovori.slice();
    for (let i = 0; i < pomocna.length; i++) {
      if (pomocna[i].idPitanja.toString() === name) {
        pomocna[i].tekstOdgovora = nextValue;
      }
    }
    this.setState({ odgovori: pomocna });
  }
  handleChange1(e) {
    const item = e.target.value;
    const isChecked = e.target.checked;
    const index = e.target.id;
    const pomocna = this.state.odgovori.slice();
    for (let i = 0; i < pomocna[index].sviOdg.length; i++) {
      if (pomocna[index].sviOdg[i].idPonudjeniOdgovor.toString() === item) {
        pomocna[index].sviOdg[i].isChecked = isChecked;
      }
    };
    this.setState({ odgovori: pomocna });
  }


  formatDate(string) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  handler() {
    this.setState({ isteklo: true });
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`${url}/getKreator/?idAnketa=${params.id}`)
      .then((res) => {
        this.setState({ imeKreator: res.data.kreator });
      });
    axios.get(`${url}/getDatumKreiranjaAnkete/?idAnketa=${params.id}`)
      .then((res) => {
        this.setState({ datumKreiranjaAnkete: this.formatDate(res.data.datumKreiranja) });
      });
    axios.get(`${url}/getDatumIstekaAnkete/?idAnketa=${params.id}`)
      .then((res) => {
        console.log(">>>>>", res.data, "<<<<<<")
        this.setState({ datumIstekaAnkete: res.data.datumIstekaAnkete });
      });
    axios.get(`${url}/getTipAnkete/?idAnketa=${params.id}`)
      .then((res) => {
        this.setState({ tipAnkete: res.data.tipAnkete });
      });
    axios.get(`${url}/getPredmet/?idAnketa=${params.id}`)
      .then((res) => {
        this.setState({ nazivPredmeta: res.data.nazivPredmeta });
      });
    axios.get(`${url}/getAnketa/?id=${params.id}`)
      .then((res) => {
        if(res.data.loginError) {
          window.location.href = window.location.origin + '/romeo/login'
          return
      } else if(res.data.accessError) {
        this.setState({
          error: res.data.accessError
        })
        return
      }

        const pit = [];
        const odg = [];
        for (let key in res.data) {
          pit.push(res.data[key])
          if (res.data[key].vrstaPitanja === 'multiple-choice') {
            const odg1 = [];
            for (let k in res.data[key].odgovori) {
              odg1.push({ tekstOdgovora: res.data[key].odgovori[k].textOdgovora, idPonudjeniOdgovor: res.data[key].odgovori[k].id, isChecked: false })
            }
            odg.push({ idPitanja: res.data[key].idPitanja, sviOdg: odg1 })
          }
          else {
            odg.push({ idPitanja: res.data[key].idPitanja, tekstOdgovora: null, idPonudjeniOdgovor: null })
          }
        };
        console.log(pit)
        this.setState({ pitanja: pit, odgovori: odg });
      });
  }

  popunianketu() {
    const { match: { params } } = this.props;
    console.log(this.state.odgovori);
    var ima = false;
    var br = 0;
    this.setState({ showError: '' })
    for (let i = 0; i < this.state.odgovori.length; i++) {
      if (this.state.odgovori[i].sviOdg) {
        for (let k in this.state.odgovori[i].sviOdg) {
          if (this.state.odgovori[i].sviOdg[k].isChecked === true) ima = true;
        }
        if (!ima) this.setState({ showError: "Potrebno je odgovoriti na sva pitanja" });
      }
      else {
        if (this.state.odgovori[i].tekstOdgovora === null) {
          br++;
          this.setState({ showError: "Potrebno je odgovoriti na sva pitanja" });
        }
      }
    }
    console.log("ima/brojac", ima, br)
    if (br===0) {
      let odg = []
      for(let i = 0; i < this.state.odgovori.length; i++) {
        let ans = this.state.odgovori[i]
        if(!ans.sviOdg)
          odg.push(ans)
        else {
          for(let j = 0; j < ans.sviOdg.length; j++) {
            let o = ans.sviOdg[j]
            if(o.isChecked) {
              odg.push({
                idPitanja: ans.idPitanja,
                tekstOdgovora: o.tekstOdgovora,
                idPonudjeniOdgovor: o.idPonudjeniOdgovor
              })
            }
          }
        }
      }
      fetch(url + '/popuniAnketu', {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem("token")
        },
        body: JSON.stringify({
          idAnketa: params.id,
          odgovori: odg,
          idPopunio: window.localStorage.getItem("id"),
          vrijemePopunjavanja: new Date().toISOString().slice(0, 19).replace('T', ' '),
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((res, err) => {
          console.log("radiiiiii", res);
          if (res.message === 'OKic') {
            console.log("OKKKK")
            this.setState({ showSucess: true, popunjeno: true });
          }
          else {
            this.setState({ showError: res.message });
          }
        }).catch(err => {
          this.setState({ showError: err.message });
        })
    }
  }
  handleChange(idPitanja, textOdgovora, idPonudjeniOdgovor = null) {
    console.log(idPitanja, textOdgovora)
    if (textOdgovora.target !== undefined) { textOdgovora = textOdgovora.target.value; }
    const odgovor = { idPitanja: idPitanja, tekstOdgovora: textOdgovora, idPonudjeniOdgovor: idPonudjeniOdgovor }
    const pomocna = this.state.odgovori.slice();
    for (let i = 0; i < pomocna.length; i++) {
      if (pomocna[i].idPitanja === idPitanja) {
        pomocna[i] = odgovor;
      }
    }
    this.setState({ odgovori: pomocna });
  }

  render() {
    if(this.state.error) {
      return (
        <div className="alert alert-dismissible alert-danger" style={{ marginTop: "10px" }}>
          <button type="button" className="close" data-dismiss="alert" onClick={() => { }}>&times;</button>
          {this.state.error}
        </div>
      )
    }

    const pitanjaa = [];
    for (const [index, value] of this.state.pitanja.entries()) {
      pitanjaa.push(
        <div key={index} class="card-body" style={index % 2 === 0 ? { backgroundColor: 'white' } : { backgroundColor: '#E4EBF6' }}>
          <h4 class="card-title">{value.tekstPitanja}</h4>
          {value.vrstaPitanja === 'single-choice' ?
            <div>
              {value.odgovori.map((v, i) => {
                return <div key={v.id}>
                  <div class="custom-control custom-radio ">
                    <input type="radio" id={v.id} name={value.idPitanja} class="custom-control-input" onChange={() => this.handleChange(value.idPitanja, v.textOdgovora, v.id)} />
                    <label class="custom-control-label" htmlFor={v.id}>{v.textOdgovora}</label>
                  </div>
                </div>
              })}
            </div> : value.vrstaPitanja === 'textbox' ?
              <div class="form-group">
                <textarea class="form-control" id={value.idPitanja} rows="3" value={this.state.input} onChange={(e) => this.handleChange(value.idPitanja, e)}></textarea>
              </div>
              : value.vrstaPitanja === 'star-rating' ?
                <div class="form-group">
                  <StarRatingComponent
                    name={value.idPitanja + ''}
                    starCount={5}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div> :
                <div>
                  {
                    this.state.odgovori[index].sviOdg.map((o, i) => (
                      <div class="form-check ">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" id={index} value={o.idPonudjeniOdgovor} checked={o.isChecked} onChange={this.handleChange1} />
                          {o.tekstOdgovora}
                        </label>
                      </div>
                    ))
                  }
                </div>

          }
        </div>
      )
    }
    return (

      <div className="App" id="containerPopuni">
        {this.state.error ? 
                <div className="alert alert-dismissible alert-danger" style={{ marginTop: "10px"}}>
                <button type="button" className="close" data-dismiss="alert" onClick={() => { }}>&times;</button>
                {this.state.error}
              </div> : 
        <div id="proradi">
          {this.state.popunjeno && <Redirect to='/hotel'/>}
          <div className="naslovliste">
            <h1>Popunjavanje</h1>
          </div >
          
          <div id="contentPopuni">
            <div id="infoPopuni" >
              <div id="info1Popuni" >
                <div class="card border-primary mb-3">
                  <div class="card-header" style={{ backgroundColor: '#2C3E50' }}><h4 style={{ color: 'white' }} class="card-title">Info</h4></div>
                  <div class="card-body">
                    <h6 class="card-title">Predmet</h6>
                    <p class="card-text">{this.state.nazivPredmeta}</p>
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">Datum kreiranja</h6>
                    <p class="card-text">{this.state.datumKreiranjaAnkete}</p>
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">Preostalo još </h6>
                    <Countdown action={this.handler.bind(this)} date={this.state.datumIstekaAnkete} />
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">Tip ankete</h6>
                    <p class="card-text">{this.state.tipAnkete}</p>
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">Anketu kreirao</h6>
                    <p class="card-text">{this.state.imeKreator}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="showPopuni" >
              <div id="show1Popuni" >
                <div class="card " style={{ alignItems: 'right' }}>
                  <div class="card-header" style={{ backgroundColor: '#2C3E50' }}><h4 style={{ color: 'white' }} class="card-title">Anketa</h4></div>
                  {pitanjaa}
                  <div >
                    <button disabled={this.state.isteklo} onClick={() => this.popunianketu()} type="button" class="btn btn-primary" id="buttonPopuni">Pošalji</button>
                  </div>
                  {
                  this.state.showSucess &&
                    <div class="alert alert-dismissible alert-success">
                      <button type="button" class="close" data-dismiss="alert" onClick={() => { this.setState({ showSucess: false }); window.location.reload(); }}>&times;</button>
                      <strong>Uspješno ste popunili anketu!</strong>
                    </div>
                  }
                  {
                    this.state.showError &&
                    <div className="alert alert-dismissible alert-danger">
                      <button type="button" className="close" data-dismiss="alert" onClick={() => { this.setState({ showError: '' }); }}>&times;</button>
                      {this.state.showError}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </div >
    );
  }
}
export default Popunjavanje;