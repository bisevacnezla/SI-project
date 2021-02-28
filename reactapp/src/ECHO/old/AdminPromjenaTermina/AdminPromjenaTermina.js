import React, { Component } from 'react';
import './AdminPromjenaTermina.css';
class AdminPromjenaTermina extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Odabir osoblja i promjena termina nastave.</h1>
        </header>
        <div id = "pon"><h1>Odaberite člana osoblja</h1></div>
        <select id = "sviprofesori">
         <option value="Novica Nosovic">Novica Nosovic</option>
        </select>
        <div id = "uto"><h1>Odaberite termin za brisanje</h1></div>
        <select id = "terminijednogprofesora">
         <option value="Srijeda, 18:00">Srijeda, 18:00</option>
        </select>
        <button className="App-edit" id = "b1"><h2>Obrišite termin</h2></button>
        <button id = "nazad"><h1>Nazad</h1></button>
      </div>
    );
  }
}
export default AdminPromjenaTermina;