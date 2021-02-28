import React from "react";
import ReactDOM from "react-dom";
import "./unosTermina.css";

class UnosTermina extends React.Component {
  state = {};

  render() {
    return (
      <form>
        <div className="form-group">
          <h4 className="col">Dodaj termin</h4>
          <div className="col">
            <label>Dan u sedmici</label>
            <select className="form-control m-2" id="listaDana">
              <option>Ponedjeljak</option>
              <option>Utorak</option>
              <option>Srijeda</option>
              <option>Četvrtak</option>
              <option>Petak</option>
            </select>
          </div>
          <div className="col">
            <label>Vrijeme</label>
            <input
              id="satnica"
              type="time"
              max="20:00"
              min="08:00"
              step="3600"
              className="form-control m-2"
            />
          </div>
          <div className="col">
            <label>Broj časova</label>
            <input
              id="brCasova"
              type="number"
              min="1"
              max="12"
              className="form-control m-2"
            />
          </div>
          <button type="button" className="btn btn-primary m-2">
            Unesi
          </button>
        </div>
      </form>
    );
  }
}

export default UnosTermina;
