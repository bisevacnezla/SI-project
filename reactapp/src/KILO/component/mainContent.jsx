
import React, { Component } from "react";
import {  Router, Route, Redirect, Switch }from "react-router-dom";
import KreiranjeZadace from "./kreiranjeZadace";
import AzuriranjeZadace from "./azuriranjeZadace";
import BrisanjeZadace from "./brisanje";
import Ocjenjivanje from "./ocjenjivanje";
import history from "../utils/history";
import Student from "./student";

const idPredmeta = 3;

class MainContent extends Component {


  render() {

    return (

      <div>
        <Router history={history}>
        <Switch>
          <Route onChange={this.props.podaci.postaviIdeve} path={"/KILO/kreiranjeZadace/"}   />
          <Route  onChange={this.props.podaci.postaviIdeve}
            path={"/KILO/azuriranjeZadace/"}
            
          />
          <Route  onChange={this.props.podaci.postaviIdeve} path={"/KILO/brisanjeZadace/"}  />
          <Route   onChange={this.props.podaci.postaviIdeve} path={"/KILO/ocjenjivanjeZadace/"} />
          <Route  onChange={this.props.podaci.postaviIdeve} path={"/KILO/student/"}  />
          {/*<Redirect to={"/KILO/kreiranjeZadace/?idPredmeta=" + idPredmeta} />*/}
        </Switch>
      </Router>
      <div style={{ display: this.props.podaci.state.aktivirajDiv == 1 ? 'inherit' : 'none' }}>
        <KreiranjeZadace key={this.props.podaci.state.rendajOpet} podaci={this.props.podaci.state}></KreiranjeZadace>
      </div>
      <div style={{ display: this.props.podaci.state.aktivirajDiv == 2 ? 'inherit' : 'none' }}>
      <AzuriranjeZadace key={this.props.podaci.state.rendajOpet}  podaci={this.props.podaci.state}></AzuriranjeZadace>
      </div>
      <div style={{ display: this.props.podaci.state.aktivirajDiv == 3 ? 'inherit' : 'none' }}>
        <BrisanjeZadace key={this.props.podaci.state.rendajOpet}  podaci={this.props.podaci.state}></BrisanjeZadace>
      </div>
      <div style={{ display: this.props.podaci.state.aktivirajDiv == 4 ? 'inherit' : 'none' }}>
        <Ocjenjivanje key={this.props.podaci.state.rendajOpet}  podaci={this.props.podaci.state} ></Ocjenjivanje>
      </div>
      <div style={{ display: this.props.podaci.state.aktivirajDiv == 5 ? 'inherit' : 'none' }}>
        <Student key={this.props.podaci.state.rendajOpet}  podaci={this.props.podaci.state}></Student>
      </div>


  </div>
    );
  }
}

export default MainContent;