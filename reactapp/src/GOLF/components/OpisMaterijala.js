import React, { Component } from 'react'
import './golf.css'
class OpisMaterijala extends Component {
  render() {
    return (

      <div class="card-body">
        <p class="card-text">{this.props.opisMaterijala}</p>
      </div>
    )
  }
}

export default OpisMaterijala