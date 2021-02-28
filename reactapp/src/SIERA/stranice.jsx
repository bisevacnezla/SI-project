import React, { Component } from "react";
import axios from "axios";
import ModalnaKomponenta from "./modalnaKomponenta";
import { withRouter } from "react-router-dom";
import jQuery from "jquery"

class Stranice extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      StudentID: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
      username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
      token: window.localStorage.getItem("token"),
      LinkedIn: "",
      Website: "",
      otvorenModalLinkedIn: false,
      otvorenModalWebsite: false
    };
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
      .get(`https://si2019siera.herokuapp.com/studenti/` + this.state.StudentID)
      .then(res => {
        if (res.data.success) {
       
         var data = res.data.user[0];
         this.setState({
           LinkedIn: data.linkedin,
           Website: data.website
         })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  otvoriModalLinkedIn() {
    this.setState({ otvorenModalLinkedIn: true });
  }

  otvoriModalWebsite() {
    this.setState({ otvorenModalWebsite: true });
  }

  render() {
    let zatvoriModalLinkedIn = () =>
      this.setState({ otvorenModalLinkedIn: false });
    let zatvoriModalWebsite = () =>
      this.setState({ otvorenModalWebsite: false });

    return (
      <div>

        <div style={{ flexDirection: "column", textAlign: "left" }}>
          <h4 className="card-title" style={{ textAlign: "left" }}>Stranice</h4>
          <div className="form-group">
            <label className="col-form-label" for="inputDefault"> LinkedIn:&nbsp;</label>
            <br></br>
            <h4><a href={this.state.LinkedIn} className="card-link">{this.state.LinkedIn}</a></h4>
          </div>

          <button className="btn btn-link" onClick={() => this.otvoriModalLinkedIn()}>Edit</button>
          <div className="form-group">
            <label className="col-form-label" for="inputDefault">  Website:&nbsp;</label>
            <br></br>
            <h4><a href={this.state.Website} className="card-link">{this.state.Website}</a></h4>
          </div>
          <button className="btn btn-link" onClick={() => this.otvoriModalWebsite()}> Edit </button>
        </div>

        <ModalnaKomponenta
          show={this.state.otvorenModalLinkedIn}
          onHide={zatvoriModalLinkedIn}
          nazivpromjene="LinkedIn"
        />
        <ModalnaKomponenta
          show={this.state.otvorenModalWebsite}
          onHide={zatvoriModalWebsite}
          nazivpromjene="Website"
        />
      </div >
    );
  }
}

export default withRouter(Stranice);
