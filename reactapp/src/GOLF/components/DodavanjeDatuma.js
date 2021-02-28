import React, { Component } from 'react'
import Moment from 'react-moment';
class DodavanjeDatuma extends Component {
  render() {
    return (
      <Moment format="DD/MM/YYYY">
        {this.props.datumobjave}
      </Moment>
    )
  }
}

export default DodavanjeDatuma
