import React, { Component } from 'react';
import axios from 'axios';
import ModalComponent from "./ModalKontakt";
import {withRouter} from "react-router-dom";
import jQuery from "jquery"

class KontaktPod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentID: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
            username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
            token: window.localStorage.getItem("token"),
            adresa: "",
            email: "",
            brtel: "",
            modalShow: false,

        }
    }

    saveState = (type, state) => {
        switch (type) {
            case "modalShow":
                this.setState({
                    modalShow: state
                });
                break;
            case "podaciKontakt":
                this.setState(state, () => {
                    this.setState({
                        modalShow: false
                    });
                });
                break;
            default:
                break;

        }
    }
    handleGet = ()=>{
        axios
        .get(
            `https://si2019siera.herokuapp.com/studenti/` +
            this.state.StudentID
        )
        .then(res => {
            console.log("res.data: " + res.data.user[0].id);
            var data = res.data.user[0];
            this.setState({
                brtel: data.telefon,
                email:data.email,
                adresa:data.adresa
            })
            
        })
        .catch(res => {
            console.log("usao u catch");
            console.log(res);
        });
        console.log("localstorage: " + window.localStorage.getItem("id"));
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
    render() {
        return (
            <>
                <h4 className="card-title">Kontakt podaci</h4>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="inputDefault">Telefon</label>
                    <br></br>
                    <h4>{this.state.brtel}</h4>
                </div>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="inputDefault">Adresa</label>
                    <br></br>
                    <h4>{this.state.adresa}</h4>
                </div>
                <div className="form-group">
                    <label className="col-form-label" htmlFor="inputDefault">Email</label>
                    <br></br>
                    <h4>{this.state.email}</h4>
                </div>

                <button type="button" className="btn btn-link" id="editBtn" onClick={() => this.setState({ modalShow: true })} >Edit</button>

                <ModalComponent
                    saveState={this.saveState}
                    show={this.state.modalShow}
                    naslovModala="Kontakt podaci"
                    podaciKontakt={this.state}
                />
            </>
        );
    }
}

export default withRouter(KontaktPod);
