import React, { Component } from 'react';
import './grupeProfesor.css';

export class header_cell extends Component {
  render() {
    var text=this.props.naziv;

    return (
      <tr className="text-dark">
        <td class="tabtip" scope="col">
          {text}
        </td>
      </tr>  
    )
  }
}

export default header_cell

