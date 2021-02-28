import React, { Component } from "react";
import axios from 'axios';
import ListaPredmeta from "../ListaPredmeta/ListaPredmeta";
import DrugiModuli from "../DrugiModuli/DrugiModuli";
import Ispiti from "../Ispiti/Ispiti";
import Zadace from "../Zadace/Zadace";
import KonacnaOcjena from "../KonacnaOcjena/KonacnaOcjena";
import Prisustvo from "../PrisustvoTabela/prisustvoTabela"
import "./AppDelta.css";
import jQuery from 'jquery'; 

class Predmet extends Component {

  /*state = {predmet:{naziv : "Kardkodirani", idProfesora : 1, opis : "nista", etcs: 23 }, 
          profesor:"",
          idPredmeta: 100,
          idStudenta: 230};

  constructor(props) {
    super(props);
    this.state = {predmet:"", profesor:"",email:""};
  }*/
  state = {predmet:"", profesor:"",email:"", idPredmeta: 100, idStudenta: 230};
  async componentDidMount(){
   
    const idPredmet=64;
    //console.log(this.props.idPredmeta);
    //const idPredmet=64;

    axios.get('https://si2019delta.herokuapp.com/dohvatiPredmet/'+idPredmet)
      .then(res => this.setState({predmet: res.data}))
    axios.get('https://si2019delta.herokuapp.com/dohvatiProfesora/'+idPredmet)
      .then(res => this.setState({profesor: res.data}))
    const {data2} = await axios.get('https://si2019delta.herokuapp.com/dohvatiEmailProfesora/'+idPredmet); 
    this.setState({email:data2});
  }

    provjeriToken = () => {
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
      });
      this.provjeriToken();
    }
    

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <b>Predmet:</b> {this.state.predmet.naziv}
            </div>
            <div className="row">
              <b>Odgovorni nastavnik:</b> <a href="mailto:{this.state.profesor.email}">{this.state.profesor.ime} {this.state.profesor.prezime}</a>
            </div>
            <div className="row">
              <b>Opis predmeta:</b>{this.state.predmet.opis}
            </div>
            <div className="row">
              <b>Broj ETCS bodova: </b>{this.state.predmet.ects} 
            </div>
            <br />
            <Zadace idPredmeta = {this.state.idPredmeta}/>
            <br />
            <Ispiti idPredmeta = {this.state.idPredmeta}/>
            <br />
            <Prisustvo idStudenta = {this.state.idStudenta} idPredmeta = {this.state.idPredmeta}/>
            <br/>
            <div className="row">
              <div className="col-3" />

              <div>
                <KonacnaOcjena />
              </div>
            </div>
            <div className="row">
              <div>
                <DrugiModuli idPredmeta = {this.state.idPredmeta}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Predmet;
