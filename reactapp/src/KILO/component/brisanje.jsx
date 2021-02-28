import React, { Component } from "react";

import { Modal, ModalFooter, ModalBody, ModalHeader, Button } from "reactstrap";
import PreviewZadace from "./previewZadace";
import axios from "axios";
import jQuery from 'jquery'; 
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form
} from "reactstrap";

//user story 68 i user story 66 pushani skupa
class BrisanjeZadace extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      idPredmet: urlParams.get("idPredmeta")
        ? Number(urlParams.get("idPredmeta"))
        : 1,
      brisanjeState: null,
      listaZadacaZaBrisanje: [],
      dropdownOpen: false,
      uspjehBrisanja: false,
      neuspjehBrisanja: false
    };
    this.toggle = this.toggle.bind(this);
  }

  provjeriToken = () => {
    try{
    axios({
      url: 'https://si2019romeo.herokuapp.com/users/validate',
      type: 'get',
      dataType: 'json',
      data: jQuery.param({
        username: window.localStorage.getItem("username")
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
      },
      complete: function (response) {
        if (response.status == 200) {
          return true;
        }
        else{
          window.location.href = 'https://si2019frontend.herokuapp.com/ROMEO'
        } 
      }  
    });}
    catch(e){

    }
  }
  componentDidMount() {
    this.pokupiIzBaze(this.state.idPredmet);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  pokupiIzBaze = (idPredmeta) => {
    //this.provjeriToken();
    axios.get(`https://si2019kilo.herokuapp.com/getZadace/${idPredmeta}`).then(res => {
      this.setState({
        listaZadacaZaBrisanje: res.data
      });
    });
  };
  handleDropdownClick = zadacaId => () => {
    this.getZadacaById(zadacaId);
  };

  getZadacaById = async zadacaId => {
    try {
      //this.provjeriToken();
      const res = await axios.get(
        `https://si2019kilo.herokuapp.com/getZadacaById/${zadacaId}`
      );
      this.setState({
        brisanjeState: res.data
      });
    } catch (e) {
      console.error("Error fetching zadaca by id", e);
    }
  };
  handleClick = event => {
    //this.provjeriToken();
    axios
      .delete(
        `https://si2019kilo.herokuapp.com/zadaca/${this.state.brisanjeState.idZadaca}`
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({ uspjehBrisanja: true });
        } else {
          this.setState({ neuspjehBrisanja: true });
        }
      });
  };
  ugasiPorukuUspjeh = () => {
    this.setState({ uspjehBrisanja: false });
  };

  ugasiPorukuNeuspjeh = () => {
    this.setState({ neuspjehBrisanja: false });
  };
  render() {
    const lista = this.state.listaZadacaZaBrisanje; // this.pokupiIzBaze();
    console.log('State:',this.state)
    return (
      <div>
        <div class="card p-3 w-50 ml-5">
          <div class="card-title" id="brisanjeT">
          <h4>
              <b>Lista zadaća koje je moguće obrisati: </b>
            </h4>
          </div>
          <ButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            id="brissel"
            multiple=""
          >
            <DropdownToggle caret color="white"
            id="bbb"> Lista zadaća</DropdownToggle>

            <DropdownMenu>
              {lista.map(item => (
                <DropdownItem
                  onClick={this.handleDropdownClick(item.id)}
                  key={item.id}
                >
                  {item.naziv}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </div>

        <div>
          {this.state.brisanjeState && (
            <div>
              <PreviewZadace
                title={"Brisanje zadaće"}
                podaci={this.state.brisanjeState}
              />
              <Button
                className=" btn bg-primary"
                id="deleteZadaca"
                name="deleteZadaca"
                onClick={this.handleClick}
              >
                Potvrdi
              </Button>
              <Modal isOpen={this.state.uspjehBrisanja}>
                <ModalHeader background-color={"success"}>
                  <p className="text-success">
                    {" "}
                    <b>Čestitamo!</b>
                  </p>
                </ModalHeader>
                <ModalBody>Uspješno ste obrisali zadaću.</ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={this.ugasiPorukuUspjeh}>
                    OK
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.neuspjehBrisanja}>
                <ModalHeader background-color={"danger"}>
                  <p className="text-danger">
                    {" "}
                    <b>Dogodila se greška!</b>
                  </p>
                </ModalHeader>
                <ModalBody> Brisanje zadaće nije uspjelo.</ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={this.ugasiPorukuNeuspjeh}>
                    OK
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          )}
          {/* confirmActionHandler={this.handleUpdateZadatak} */}
        </div>
      </div>
    );
  }
}

export default BrisanjeZadace;
