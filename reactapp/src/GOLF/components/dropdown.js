import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './golf.css'


class dropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      naziv: props.nazivAg,
      isOpen: false
    }
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div class="dd">
        <div class="dropdown dd" onClick={this.toggleOpen}>
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
          >
            {this.props.nazivAg}
          </button>
          <div className={menuClass} aria-labelledby="dropdownMenuButton">
            {this.props.godine.map(naslov => <Link to={"/Golf/stranicaPredmeta/" + encodeURIComponent(naslov) + "/" + this.props.idPredmeta} class="dropdown-item">{naslov}</Link>)}
          </div>
        </div>
      </div>
    );
  }
}

export default dropdown;