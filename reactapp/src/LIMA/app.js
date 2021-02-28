import React, { Fragment, Component } from "react";
import { Route, Link } from "react-router-dom";
import { Spinner } from 'reactstrap';

import StudentRouter from './Student/app.js';
import StudentskaSluzbaRouter from './StudentskaSluzba/app.js';
import ProfesorRouter from './Profesor/app.js'

import { user } from './api.js'

import './app.css';

const routeri = {
  "STUDENT": StudentRouter,
  "PROFESOR": ProfesorRouter,
  "STUDENTSKA_SLUZBA": StudentskaSluzbaRouter,
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipUsera: null
        }
    }
    componentDidMount(){
        let userId = window.localStorage.getItem("id");
        user.getUloga(userId).then((res) => {
            this.setState({
              tipUsera: res
            })
        }).catch(err => {
            this.setState({
                tipUsera: "nemapravo"
            })
        })
    }
    render(){
        if(this.state.tipUsera == null) return <div className="w-100 d-flex justify-content-center"><Spinner /></div>
        if(this.state.tipUsera == "nemapravo") return <div className="w-100 d-flex justify-content-center">Ulogujte se prvo na Romeo.</div>
        const Router = routeri[this.state.tipUsera]
        return (
            <Router />
        );
    }
}

export default App;