import React, { Component } from "react";
import "./app.css";

import LeftMenu from "./components/LeftMenu.js";
import NaslovnaTermin from "./components/naslovnaTermin";
import Sale from "./components/sale";
import NaslovnaKalendar from "./components/naslovnaKalendar";
import ProfessorsAvailability from "./old/ProfessorsAvailability/ProfessorsAvailability";
import Raspored from "./components/raspored";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeContentId: 1,
        professorId: -1
    };
  }
  onChangeActiveId = id => {
    this.setState({
      activeContentId: id
    });
  };

    onChangeProfessorId = id => {
        this.setState({
            professorId: id
        });
    };
  render() {
    const { open } = this.state;
    return (
      <div className="App">
        <div
          className="row"
          id="mainECHO"
          style={{ margin: "0px", padding: "0px" }}
        >
          <div
            className="col-lg-2 col-md-3 col-sm-12"
            style={{
              backgroundColor: "#2C3E50",
              minHeight: "100%",
              padding: "0px",
              margin: "0px"
            }}
          >
            <LeftMenu triggerChangeActiveId={this.onChangeActiveId} triggerChangeProfessorId = {this.onChangeProfessorId} />
          </div>
          <div
            className="col-lg flex-grow-1 col-sm-12 col-md"
            style={{
              backgroundColor: "white",
              minHeight: "calc(100vh - 80px)",
              margin: "0px",
              padding: "0px"
            }}
          >
            <div
              id="terminDiv"
              style={{
                display: this.state.activeContentId == 1 ? "inherit" : "none",
                width: "100%"
              }}
            >
              <NaslovnaTermin professorId={this.state.professorId}/>
            </div>
            <div
              id="Sale"
              style={{
                display: this.state.activeContentId == 2 ? "inherit" : "none",
                width: "100%"
              }}
            >
              <Sale />
            </div>
            <div
              id="Kalendar"
              style={{
                display: this.state.activeContentId == 3 ? "inherit" : "none"
              }}
            >
              <NaslovnaKalendar />
            </div>
            <div
              id="PretragaProfesora"
              style={{
                display: this.state.activeContentId == 4 ? "inherit" : "none"
              }}
            >
                <ProfessorsAvailability triggerChangeActiveId={this.onChangeActiveId} triggerChangeProfessorId = {this.onChangeProfessorId}/>
              {/*DODATI KOMPONENTU PRETRAGA UNUTAR KOJE SE DEFINISE IZGLED TABOVA */}
            </div>
            <div
              id="rasporedDiv"
              style={{
                display: this.state.activeContentId == 5 ? "inherit" : "none",
                width: "100%"
              }}
            >
              <Raspored />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;