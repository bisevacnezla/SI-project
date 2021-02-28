import React, { Component } from 'react';
import './OdabirDana.css';
class OdabirDana extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Klikom na odgovarajući pravougaonik odaberite dane u kojima imate slobodne termine.</h1>
        </header>
        <div id = "pon"><h1>PONEDJELJAK</h1></div>
        <div id = "uto"><h1>UTORAK</h1></div>
        <div id = "sri"><h1>SRIJEDA</h1></div>
        <div id = "cet"><h1>ČETVRTAK</h1></div>
        <div id = "pet"><h1>PETAK</h1></div>
        <button className="App-edit" id = "b1"><h2>Unesite termin/e</h2></button>
        <button className="App-edit" id = "b2"><h2>Unesite termin/e</h2></button>
        <button className="App-edit" id = "b3"><h2>Unesite termin/e</h2></button>
        <button className="App-edit" id = "b4"><h2>Unesite termin/e</h2></button>
        <button className="App-edit" id = "b5"><h2>Unesite termin/e</h2></button>
        <button className="App-ponisti" id = "b6"><h2>Poništite dan</h2></button>
        <button className="App-ponisti" id = "b7"><h2>Poništite dan</h2></button>
        <button className="App-ponisti" id = "b8"><h2>Poništite dan</h2></button>
        <button className="App-ponisti" id = "b9"><h2>Poništite dan</h2></button>
        <button className="App-ponisti" id = "b10"><h2>Poništite dan</h2></button>
        <button id = "generisi"><h1>Generiši raspored</h1></button>
      </div>
    );
  }
}
export default OdabirDana;