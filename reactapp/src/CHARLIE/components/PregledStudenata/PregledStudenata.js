import React from 'react'
import { Link } from 'react-router-dom'
import "../SharedComponents/tabeleCharlie.css";
import { FormGroup, Table } from "reactstrap";

class PregledStudenata extends React.Component{
  state = {
    studenti: [
      { imePrezime: "Amir Muminovic", indeks: "17744" },
      { imePrezime: "Nejra Imsirovic", indeks: "17838" }
    ]
  };

  renderStudenti = () => {
    return this.state.studenti.map(el => (
      <tr>
        <td class="tabtip1">{el.imePrezime}</td>
        <td class="tabtip1">{el.indeks}</td>
      </tr>
    ));
  };
  render(){
    return(
      <div>
        <FormGroup className="px-4" style={{marginTop: "16px"}}>
        <Table className="table table-bordered text-center bg-active border-solid">
          <thead>
            <tr className="bg-primary text-light">
              <th class="tabtip">Ime i prezime</th>
              <th class="tabtip">Broj indeksa</th>
            </tr>
          </thead>
          <tbody>{this.renderStudenti()}</tbody>
          </Table>
          </FormGroup> 
       
      </div>
    )
  }
}

export default PregledStudenata