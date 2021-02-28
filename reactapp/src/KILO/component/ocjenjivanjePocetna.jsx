import React, { Component } from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form
} from "reactstrap";

class OcjenjivanjePocetna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: [false, false, false, false]
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = indeks => {
    var noviNiz = this.state.dropdownOpen;

    noviNiz[indeks] = !noviNiz[indeks];

    this.setState({
      dropdownOpen: noviNiz
    });
  };

  componentDidMount = () => {
    document.getElementById("ZadaceZaOcjenjivanje").style.display = "block";
    document.getElementById("StudentiZaOcjenjivanje").style.display = "none";
  };

  postaviStudente = () => {
    document.getElementById("StudentiZaOcjenjivanje").style.display = "block";
    document.getElementById("ZadaceZaOcjenjivanje").style.display = "none";
  };

  render() {
    return (
      <div>
        <div class="card p-3 w-50 ml-5">
          <div className="card-title">
            <h4>
              <b>Ocjenjivanje zadaća </b>
            </h4>
          </div>
          <div id="kontOcjenjivanje">
            
                <div id="ZadaceZaOcjenjivanje">
                  <ButtonDropdown
                    id="selK1"
                    multiple=""
                    isOpen={this.state.dropdownOpen[0]}
                    toggle={() => this.toggle(0)}
                  >
                    <DropdownToggle caret color="white" id="bbb3">Lista zadaća</DropdownToggle>
                    <DropdownMenu>
                      {this.props.podaci.state.listaZadaca.map(clan => (
                        <DropdownItem
                          onClick={() => {
                            this.props.podaci.postaviZadacu(
                              clan.naziv,
                              clan.id
                            );
                            this.props.podaci.pokupiStudenteKojimaNijePregledanaZadaca(
                              clan.id
                            );
                            this.props.podaci.pokupiStudenteKojimaJePregledanaZadaca(
                              clan.id
                            );
                            this.props.podaci.pokupiStudenteKojiNisuPoslaliZadacu(
                              clan.id
                            );
                            this.postaviStudente();
                          }}
                        >
                          {clan.naziv}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              <div className="card-body" id="StudentiZaOcjenjivanje">
                <br />
                <h6 id="nisupos">
                  Studenti koji <b className="text-danger">nisu poslali </b>
                  zadaću:
                </h6>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen[1]}
                  toggle={() => this.toggle(1)}
                  id="selK2"
                  multiple=""
                >
                  <DropdownToggle caret>Lista studenata</DropdownToggle>
                  <DropdownMenu>
                    {this.props.podaci.state.studentiNisuPoslali.map(clan => (
                      <DropdownItem
                        onClick={() =>
                          this.props.podaci.handleBackNaJednaZadaca(
                            clan.naziv,
                            clan.id
                          )
                        }
                      >
                        {clan.naziv}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <br />
                <br />
                <br />

                <h6 id="nijepreg">
                  Studenti koji su poslali, ali{" "}
                  <b className="text-warning">nije pregledano:</b>{" "}
                </h6>

                <ButtonDropdown
                  isOpen={this.state.dropdownOpen[2]}
                  toggle={() => this.toggle(2)}
                  id="selK3"
                  multiple=""
                >
                  <DropdownToggle caret>Lista studenata</DropdownToggle>
                  <DropdownMenu>
                    {this.props.podaci.state.studentiNijePregledano.map(
                      clan => (
                        <DropdownItem
                          onClick={() =>
                            this.props.podaci.handleBackNaJednaZadaca(
                              clan.naziv,
                              clan.id
                            )
                          }
                        >
                          {clan.naziv}
                        </DropdownItem>
                      )
                    )}
                  </DropdownMenu>
                </ButtonDropdown>

                <br />
                <br />
                <br />

                <h6 id="jestepreg">
                  Studenti čije zadaće su{" "}
                  <b className="text-success">pregledane:</b>{" "}
                </h6>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen[3]}
                  toggle={() => this.toggle(3)}
                  id="selK4"
                  multiple=""
                >
                  <DropdownToggle caret>Lista studenata</DropdownToggle>
                  <DropdownMenu>
                    {this.props.podaci.state.studentiPregledano.map(clan => (
                      <DropdownItem
                        onClick={() =>
                          this.props.podaci.handleBackNaJednaZadaca(
                            clan.naziv,
                            clan.id
                          )
                        }
                      >
                        {clan.naziv}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OcjenjivanjePocetna;
