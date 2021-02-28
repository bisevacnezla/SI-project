import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from 'axios'

import InformacijeOIspitu from "./components/InformacijeOIspitu";
import KreirajIspit from "./components/KreirajIspit";
import KreirajIspitDetalji from "./components/KreirajIspitDetalji";
import KreiraniIspiti from "./components/KreiraniIspiti";
import PregledStudenata from "./components/PregledStudenata";
import PrijavaIspita from "./components/PrijavaIspita";
import PrijavljeniIspiti from "./components/PrijavljeniIspiti";
import UrediIspit from "./components/UrediIspit";


import LeftMenuCharlie from "./LeftMenuCharlie";
import "./appCharlie.css";
class App extends Component {

  constructor() {
    super();
    this.state = {
      profesor: false,
      fetched: false,
      activeContentId: 0,
      error: '',
      data: {},
      menuButtonTitles: [, "Ispiti"],
      menuButtonsProfesor: [{
        btnText: "Kreiraj ispit",
        component: <KreirajIspit onChangeActiveId={this.onChangeActiveId}/>
      }, {
        btnText: "Kreirani ispiti",
        component: <KreiraniIspiti />
      },
      {
        naziv: "Profil",
        changeId: 2,
        component: <KreirajIspitDetalji onChangeActiveId={this.onChangeActiveId} data={this.getData}/> //Prof
      }],
      menuComponentsProfesor: [{
        naziv: "Profil",
        changeId: 0,
        component: <KreirajIspit /> //Prof
      },{
        naziv: "Profil",
        changeId: 1,
        component: <KreiraniIspiti /> //Prof
      },{
        naziv: "Profil",
        changeId: 2,
        component: <KreirajIspitDetalji onChangeActiveId={this.onChangeActiveId} data={this.getData}/> //Prof
      }],
      menuButtonsStudent: [{
        btnText: "Informacije o ispitu",
        component: <InformacijeOIspitu />
      }, {
        btnText: "Prijava ispita",
        component: <PrijavaIspita />
      }, {
        btnText: "Prijavljeni ispiti",
        component: <PrijavljeniIspiti />
      }],
      menuComponentsStudent: [{
        naziv: "Profil",
        changeId: 0,
        component: <PrijavaIspita  onChangeActiveId={this.onChangeActiveId}/> // Stud
      }, {
        naziv: "Profil",
        changeId: 1,
        component: <PrijavljeniIspiti onChangeActiveId={this.onChangeActiveId}/> //Stud
      },
      {
        naziv: "Profil",
        changeId: 2,
        component: <InformacijeOIspitu onChangeActiveId={this.onChangeActiveId} /> // Stud
      }],
    }
    this.onChangeActiveId = this.onChangeActiveId.bind(this);
  } 

  getData = () => this.state.data
  
  async componentDidMount() {
    var help = [];
    var i = 0;
    var helps = [];
    var j = 0;
    this.state.menuButtonsProfesor.forEach(x => {
      help.push({
        naziv: x.btnText,
        changeId: i,
        component: x.component
      });
      i++;
    });
    this.setState({
      menuComponentsProfesor: help
    });

    this.state.menuButtonsStudent.forEach(x => {
      helps.push({
        naziv: x.btnText,
        changeId: j,
        component: x.component
      });
      j++;
    });
    this.setState({
      menuComponentsStudent: helps
    });

    const id = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");

    if(!id || !token || !username){
      this.setState({error:'Neautorizovan pristup'})
      return
    }


    const uloga = 'PROFESOR';
    try {
      // const {status} = await axios.get('https://si2019romeo.herokuapp.com/users/validate', username, {
      //   headers : {"Authorization": token}
      // })
      // console.log(status)

      const {data} = await axios.get(`https://si2019oscar.herokuapp.com/pretragaId/imaUlogu/${id}/${uloga}`)
      this.setState({fetched:true})
      this.setState({profesor:data}) //Staviti true ako hocete profesora
    } catch (error) {
      console.log('Greska')
      console.log(error.message)
    }

  }
  onChangeActiveId = (id, data={}) => {
    this.setState({
      activeContentId: id,
      data
    })
  };

  render() {
    const {fetched, profesor, menuComponentsProfesor, activeContentId, menuComponentsStudent, error} = this.state
    return (
      <>
      
        <div className="App" id="appCharlie">
          <div className="containter-fluid">
            <div className="row" id="rowCharlie" style={{ margin: "0px", padding: "0px"}}>
              <div className="col-lg-2 col-md-3 col-sm-12" style={{
                backgroundColor: "#2C3E50",
                minHeight: "100%",
                padding: "0px",
                margin: "0px"
              }}>
                <LeftMenuCharlie
                  triggerChangeActiveId={this.onChangeActiveId}
                  btnList={this.state.fetched && (this.state.profesor ? this.state.menuComponentsProfesor : this.state.menuComponentsStudent) || []}
                />
              </div>
              <div className="col-lg flex-grow-1 col-sm-12 col-md" style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 80px)",
                margin: "0px",
                padding: "0px"
              }}>
                { error.length > 0 && <div>{error}</div> || fetched && (profesor ? menuComponentsProfesor[activeContentId].component
                  : menuComponentsStudent[activeContentId].component)
                }
                
              </div>
            </div>
          </div>
        
         
        </div>
        </>
    );
  }
}

export default App;
