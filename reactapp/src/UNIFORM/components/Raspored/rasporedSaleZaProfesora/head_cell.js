import React, { Component } from 'react'

export class Head_cell extends Component {
  render() {
    return (
      <React.Fragment>
          <th class="tabtip" scope="col">{this.props.day}  {this.props.datum}</th>
      </React.Fragment>
    )
  }
}

export default Head_cell
