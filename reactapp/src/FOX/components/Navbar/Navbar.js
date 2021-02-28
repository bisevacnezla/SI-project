import React, { Component } from 'react';
import './Navbar.css';

class NavbarFox extends Component {

    klikZadace =() =>{
      window.location.replace("/KILO/kreiranjeZadace?idPredmeta=" + window.localStorage.getItem("idPredmeta"));
    }
    klikAnkete = () => {
      window.location.replace("/HOTEL");
    }
    klikStatistika = () => {
      window.location.replace("/LIMA");
    }
    klikRaspored = () => {
      window.location.replace("/UNIFORM");
    }
    klikChat = () => {
      window.location.replace("/JULIET");
    }
    klikForum = ()  => {
      window.location.replace("/TANGO");
    }
    klikMaterijali = ()  => {
      window.location.replace("/GOLF");
    }
    klikOdjava = ()  => {
      window.location.replace("/ROMEO");
    }

    render() {
      const x = "StranicaPredmeta?predmetId="+localStorage.getItem("NazivPredmeta");
      return (
        <div style={{
            backgroundColor: "#2C3E50",
            float: "left",
            minHeight: "100vh"
        }}>

            <a href={x}>
              <button type="button" className="btn btn-primary left-buttons">Student</button>
            </a>

            <a href="unosPrisustva">
              <button type="button" className="btn btn-primary left-buttons">Unos prisustva</button>
            </a>

            <a href="unosBodova">
              <button type="button" className="btn btn-primary left-buttons">Unos bodova ispita</button>
            </a>

            <a href="unosOcjene">
              <button type="button" className="btn btn-primary left-buttons">Unos ocjene</button>
            </a>

            <a href="unosTeme">
              <button type="button" className="btn btn-primary left-buttons">Unos teme</button>
            </a>

            <a href="ispiti">
              <button type="button" className="btn btn-primary left-buttons">Ispiti</button>
            </a>

            <a href="obavijesti">
              <button type="button" className="btn btn-primary left-buttons">Obavijesti</button>
            </a>

            <a onClick={this.klikZadace}>
              <button type="button" className="btn btn-primary left-buttons">Zadaće</button>
            </a>

            <a onClick={this.klikAnkete}>
              <button type="button" className="btn btn-primary left-buttons">Ankete</button>
            </a>

            <a onClick={this.klikStatistika}>
              <button type="button" className="btn btn-primary left-buttons">Statistika</button>
            </a>

            <a onClick={this.klikRaspored}>
              <button type="button" className="btn btn-primary left-buttons">Raspored</button>
            </a>

            <a onClick={this.klikChat}>
              <button type="button" className="btn btn-primary left-buttons">Chat</button>
            </a>

            <a onClick={this.klikForum}>
              <button type="button" className="btn btn-primary left-buttons">Forum</button>
            </a>

            <a onClick={this.klikMaterijali}>
              <button type="button" className="btn btn-primary left-buttons">Materijali</button>
            </a>

            <a href="http://yiiisu.com/load.php?action=download&id=3">
              <button type="button" className="btn btn-primary left-buttons">Uputstvo</button>
            </a>

            <a onClick={this.klikOdjava}>
              <button type="button" className="btn btn-primary left-buttons">Odjava</button>
            </a>
            
        </div>
      );
    }
  }
  
  export default NavbarFox;