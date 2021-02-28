import React, { Component } from "react";
import "./bootstrap.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";
import { withRouter } from "react-router-dom";
import jQuery from "jquery"

class modalnaKomponenta extends Component {
  state = {
    vrijednostInputa: "",
    greska: null,
    trenutnoLogovaniStudentID: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
    username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
    token: window.localStorage.getItem("token"),
    OK: true,
    msg: ""
  };

  constructor(props) {
    super(props);
    this.promjenaInputa = this.promjenaInputa.bind(this);
    this.brojac = 0;
  }

  posaljiZahtjev() {
    if (this.state.vrijednostInputa == "") {
      this.setState({ greska: true });
    } else {
      if (this.props.nazivpromjene == "LinkedIn") {
        axios
          .put(
            `https://si2019siera.herokuapp.com/studenti/update/linkedin/` +
            this.state.trenutnoLogovaniStudentID,
            { linkedin: this.state.vrijednostInputa }
          )
          .then(res => {
            if (res.data.success && res.data.userAutorizacija) {
              this.setState({ greska: false, OK: true, msg: "" });
              window.location.reload();
            }
            else if (!res.data.userAutorizacija) {
              //nema privilegiju
              this.setState({
                msg: "Nemate privilegiju da pristupite ovoj stranici.",
                OK: false
              })
            }
            else {
              //kod nas greska
              this.setState({
                msg: "Došlo je do greške!",
                OK: false
              })
            }

          });
      } else if (this.props.nazivpromjene == "Website") {
        axios
          .put(
            `https://si2019siera.herokuapp.com/studenti/update/website/` +
            this.state.trenutnoLogovaniStudentID,
            { website: this.state.vrijednostInputa }
          )
          .then(res => {
            if (res.data.success && res.data.userAutorizacija) {
              this.setState({ greska: false, OK: true, msg: "" });
              window.location.reload();
            }
            else if (!res.data.userAutorizacija) {
              //nema privilegiju
              this.setState({
                msg: "Nemate privilegiju da pristupite ovoj stranici.",
                OK: false
              })
            }
            else {
              //kod nas greska
              this.setState({
                msg: "Došlo je do greške!",
                OK: false
              })
            }
          })
          .catch(res=>{
            this.setState({
              OK:false,
              msg:"Došlo je do greške!"
            })
          });
      }
    }
  }
  handleAuth = () => {
    if (window.localStorage.getItem("id") != null) {
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
       
    })
    
    .then(res => {
     this.posaljiZahtjev();
  })
  .catch(res=>{
    this.props.history.push("/Romeo");
  })
    }
    else this.posaljiZahtjev();

  }
  promjenaInputa(event) {
    this.setState({ vrijednostInputa: event.target.value });
  }

  renderujPotvrdu() {
    if (this.state.greska == false) {
      return (
        <Potvrda
          key={this.brojac}
          successful="true"
          msg="Zahtjev je uspjesno poslan"
        />
      );
    } else if (this.state.greska == true) {
      return (
        <Potvrda
          key={this.brojac}
          successful="false"
          msg="Polje ne smije biti prazno"
        />
      );
    }
    return "";
  }

  render() {
    ++this.brojac;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.renderujPotvrdu()}
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
            Unesite novu vrijednost polja
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <label className="col-form-label">{this.props.nazivpromjene}:</label>
          <input
            type="text"
            className="form-control"
            placeholder={this.props.nazivpromjene}
            id="inputDefault"
            onChange={this.promjenaInputa}
          />
          {this.state.OK ? "" : <div className="invalid-feedback" style={{ marginTop: "10px" }}>{this.state.msg}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => this.posaljiZahtjev()}>
            Pošalji zahtjev
          </button>
          <button className="btn btn-secondary" onClick={this.props.onHide}>
            Zatvori
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(modalnaKomponenta);
