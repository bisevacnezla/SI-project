import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form
} from "reactstrap";
import KreiranjeZadace from "./kreiranjeZadace";
import axios from "axios";
import jQuery from 'jquery'; 

class AzuriranjeZadace extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      idPredmet: urlParams.get("idPredmeta")
        ? Number(urlParams.get("idPredmeta"))
        : 1,
      azuriranjeState: null,
      listaZadacaZaAzuriranje: [],
      dropdownOpen: false
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
      listaZadacaZaAzuriranje: res.data
    });
  });
};

setAllState = () => {
  // poziv na bazu i popunjavanje state-a
};

render() {
  const lista = this.state.listaZadacaZaAzuriranje; // this.pokupiIzBaze();

  return (
    <div>
      <div class="card p-3 w-50 ml-5">
        <div class="card-title" id="azuriranjeT">
          <h4>
              <b>Lista zadaća koje je moguće ažurirati: </b>
            </h4>
          </div>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          id="azsel"
          multiple=""
        >
          <DropdownToggle caret color="white" id="bbb2">Lista zadaća</DropdownToggle>

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
        {this.state.azuriranjeState && (
          <KreiranjeZadace
            title={"Ažuriranje zadaće"}
            mainState={this.state.azuriranjeState}
          />
        )}
        {/* confirmActionHandler={this.handleUpdateZadatak} */}
      </div>
    </div>
  );
}

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
      azuriranjeState: res.data
    });
  } catch (e) {
    console.error("Error fetching zadaca by id", e);
  }
};
  /*
    handleUpdateZadatak = state => {
      // TODO: update logic
    };*/
}

export default AzuriranjeZadace;
