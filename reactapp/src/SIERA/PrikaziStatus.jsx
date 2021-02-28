import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "react-router-dom";
import jQuery from "jquery"
class PrikaziStatus extends Component {
  constructor() {
    super();
    this.state = {
      StudentID: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
      username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
      token: window.localStorage.getItem("token"),
      status: [],
      teme: [],
      od: "Odobreno",
      neod: "Neodobreno",
      ncek: "Na čekanju",
      show: false
    }
  }

  componentDidMount() {
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
       this.handleGet();
  })
  .catch(res=>{
    this.props.history.push("/Romeo");
  })
    }
    else this.handleGet();
  }

  handleGet = () => {
    axios
      .get(
        `https://si2019siera.herokuapp.com/temezavrsni/` +
        this.state.StudentID
      )
      .then(res => {
        if (res.data.success) {
          const Teme = res.data.teme.map(obj => obj.naziv);
          this.setState({ teme: Teme });

          const Status = res.data.teme.map(obj => obj.odobreno);
          this.setState({ status: Status });
        }
      });
  }

  Provjeri = provjeri => {
    if (provjeri == null) return "Na čekanju"
    else if (provjeri == 1) return "Odobreno"
    return "Neodobreno"
  }

  handleOdobreno() {

    return (
      <div className="row">
        {this.props.children}
        <div className="col-sm"> Tema:
            <ul>
            {this.state.teme.map(tema => (
              <li className="list-group-item list-group-item-action mt-2" key={tema}>
                {tema}
              </li>
            ))}

          </ul>
        </div>
        <div className="col-sm">Status:
            <ul>
            {this.state.status.map(odobreno => (
              <li className="list-group-item list-group-item-action mt-2" key={odobreno}>
                {this.Provjeri(odobreno)}
              </li>
            ))}

          </ul>
        </div>
      </div>
    );
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {

    return (
      <>
        <button type="submit" className="btn btn-primary" onClick={this.handleShow}>Prikaži status</button>
        <Modal show={this.state.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Završni rad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {this.handleOdobreno()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" onClick={this.handleClose} className="btn btn-secondary">Zatvori</button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(PrikaziStatus);