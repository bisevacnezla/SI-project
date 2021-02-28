import React, { Component } from "react";
import LicniPod from "./licniPod.jsx";
import Ocjene from "./Ocjene";
import DropDownZavrsni from "./DropDownZavrsni.jsx";
import "./AppSiera.css";
import LeftMenuStudentSiera from "./LeftMenuStudentSiera";
import UgovorOUcenju from "./ugovorOUcenju";
import IspitiTabela from "./ispitiTabela";
import Predmeti from "./predmeti";
import Prosjek from "./Prosjek.jsx";
import Statistika from "./statistika.jsx";
import Zadace from "./Zadace";
import axios from "axios";
import jQuery from "jquery"

class App extends Component {
  constructor() {
    super();
    this.state = {
      studentId: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
      username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
      token: window.localStorage.getItem("token"),
      activeContentId: 0,
      OK:null,
      msg:"",
      menuButtons: [{
        btnText: "Profil",
        component:
          <LicniPod />
      }, {
        btnText: "Ugovor o učenju",
        component: <UgovorOUcenju />
      }, {
        btnText: "Završni rad",
        component: <> <DropDownZavrsni /> </>
      }, {
        btnText: "Predmeti",
        component: <Predmeti />
      }, {
        btnText: "Ispiti po godinama",
        component: <IspitiTabela />
      },
      {
        btnText: "Zadaće po godinama",
        component: <Zadace />
      },
      {
        btnText: "Ocjene po godinama",
        component: <Ocjene />
      },
      {
        btnText: "Prosjek",
        component: <Prosjek />
      },
      {
        btnText: "Statistika",
        component: <Statistika />
      }

      ],
      menuComponents: [{
        naziv: "Profil",
        changeId: 0,
        component:
          <LicniPod />
      }]
    }
    this.onChangeActiveId = this.onChangeActiveId.bind(this);
  }
  handleMount = () => {
    var help = [];
    var i = 0;
    this.state.menuButtons.forEach(x => {
      help.push({
        naziv: x.btnText,
        changeId: i,
        component: x.component
      });
      i++;
    });
    this.setState({
      menuComponents: help
    });
  }
  componentDidMount() {
    //autorizacija
    axios
    .get("https://si2019siera.herokuapp.com/studenti/" + this.state.studentId)
    .then(res=>{
      if(res.data.success && res.data.userAutorizacija){
        this.setState({
          msg:"",
          OK:true
        })
        //pirkazi stranicu
        console.log("usao u if");
        if (window.localStorage.getItem("id") != null) {
         console.log("drugi if");
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
        .then(res=>{
          console.log("res: " + res)
          this.handleMount();
        })
        .catch(res=>{
          console.log("catch: " + res);
          this.props.history.push("/Romeo");
        })
      }
        else this.handleMount();
    }
      else if(!res.data.userAutorizacija){
        //nema privilegiju
        this.setState({
          msg:"Nemate privilegiju da pristupite ovoj stranici.",
          OK:false
        })
      }
      else{
        //kod nas greska
        console.log(res.data);
        this.setState({
          msg:"Došlo je do greške!",
          OK:false
        })
      }
    })
    .catch(err=>{
      console.log(err);
    });

    
  }
  onChangeActiveId = (id) => {
    this.setState({
      activeContentId: id,
    })
  };
  render() {

    return (
      <>
        <div className="App">
          {this.state.OK ? <div className="containter-fluid">
            <div className="row" style={{ margin: "0px", padding: "0px" }}>
              <div className="col-lg-2 col-md-3 col-sm-12" style={{
                backgroundColor: "#2C3E50",
                minHeight: "100%",
                padding: "0px",
                margin: "0px"
              }}>
                <LeftMenuStudentSiera
                  triggerChangeActiveId={this.onChangeActiveId}
                  btnList={this.state.menuComponents}
                />
              </div>
              <div className="col-lg flex-grow-1 col-sm-12 col-md" style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 80px)",
                margin: "0px",
                padding: "0px"
              }}>

                {this.state.menuComponents[this.state.activeContentId].component}


              </div>
            </div>
          </div> : <span>{this.state.msg}</span> }
          


        </div>
      </>

    );
  }
}

export default App;
