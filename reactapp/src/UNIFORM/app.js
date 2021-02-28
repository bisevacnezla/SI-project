import {BrowserRouter, Route} from 'react-router-dom';
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import './AppUniform.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import RasporedStudent from './components/Raspored/rasporedStudenta/raspored.js';
import RasporedProfesor from './components/Raspored/rasporedProfesora/raspored.js';
import RasporedSalaStudent from './components/Raspored/rasporedSaleZaStudenta/raspored.js';
import RasporedSalaProfesor from './components/Raspored/rasporedSaleZaProfesora/raspored.js';
import GrupeStudent from './components/Grupe/grupeStudent/grupeStudent.js';
import GrupeProfesor from './components/Grupe/grupeProfesor/grupeProfesor.js';
import UniformHome from './components/Home/home.js';
import LeftMenuStudent from './components/Home/LeftMenuStudent.js';
import grupeProfesor from './components/Grupe/grupeProfesor/grupeProfesor.js';
import axios from 'axios';
export class App extends Component {

  state={ 
    activeContentId: 1,   
    provjerenToken:false,
    uloga:0,
    activeDivId: 0// 1 je student, 2 je profesor
  }

  onChangeActiveId = (id) => {
    this.setState({
      activeContentId: id
    })
  };

  onChangeActiveIdS = () => {
    this.setState({
      activeContentId: 1
    })
  };

  componentDidMount = () => {
    if(!this.state.provjerenToken)
    {
      window.localStorage.setItem('uniformStanje','nista');
      var idItem  = window.localStorage.getItem("id");
      
      if(idItem==null)
      idItem="63813812";
      
        
      axios.get('https://si2019oscar.herokuapp.com/pretragaId/' + idItem + '/dajUlogu').then((res) => {
        if(!res || res.data=="")
        {
          window.localStorage.setItem('uniformStanje','nista');
          window.location.href = window.location.origin + '/romeo/login'
        }
        else
        {
            window.localStorage.setItem('uniformStanje','da');
            console.log(res.data)
            
            if(res.data == "STUDENT")
            {
              this.setState({
                provjerenToken:true,
                uloga:1,
                activeContentId:1
              })
            }
            else
            {
              this.setState({
                provjerenToken:true,
                uloga:2,
                activeContentId:2
              })
            }                
      }
        
    }).catch(res => {
      window.location.href = window.location.origin + '/romeo/login';

      })
    }
  }


  render() {

    return (
      <div>
      
        <div className="App">

          <div className="container-fluid" style={{ paddingLeft: "0px"}}>
            <div className="row" style={{ margin: "0px", padding: "0px"}}>
              <div className="col-lg-2 col-md-3 col-sm-12" style={{
                backgroundColor: "#2C3E50",
                minHeight: "100%",
                padding: "0px",
                margin: "0px"
              }}>


              <div >
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons" 
                    id = "moj"
                    
                    onClick = {()=>this.onChangeActiveId(1)}
                    style={{width:"100%",
                    display: (this.state.uloga== 1) ? 'inherit' : 'none'}}>Raspored studenta
                </button>               
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons" 
                    id = "moj"
                    onClick = {()=>this.onChangeActiveId(2)}
                    style={{width:"100%",
                    display: (this.state.uloga== 2) ? 'inherit' : 'none'}}>Raspored profesora
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.onChangeActiveId(3)}
                    style={{width:"100%",
                    display: (this.state.uloga== 1) ? 'inherit' : 'none'}}>Raspored sale za studenta
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.onChangeActiveId(4)}
                    style={{width:"100%",
                    display: (this.state.uloga== 2) ? 'inherit' : 'none'}}>Raspored sale za profesora
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.onChangeActiveId(5)}
                    style={{width:"100%",
                    display: (this.state.uloga== 1) ? 'inherit' : 'none'}}>Grupe za studenta
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.onChangeActiveId(6)}
                    style={{width:"100%",
                    display: (this.state.uloga== 2) ? 'inherit' : 'none'}}>Grupe za profesora
                </button>    
            </div>


              </div>
              <div className="col-lg flex-grow-1 col-sm-12 col-md" style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 80px)",
                margin: "0px",
                padding: "0px"
              }}>
                <div
                  id="RasporedStudenta"
                  style={{ display: (this.state.activeContentId==1 && this.state.uloga== 1) ? 'inherit' : 'none' }}
                >
                  <RasporedStudent />
                </div>
                <div
                  id="RasporedProfesora"
                  style={{ display: (this.state.activeContentId==2 && this.state.uloga== 2) ? 'inherit' : 'none' }}
                >
                  <RasporedProfesor />
                </div>
                <div
                  id="RasporedSaleZaStudenta"
                  style={{ display: (this.state.activeContentId==3 && this.state.uloga== 1) ? 'inherit' : 'none' }}
                >
                  <RasporedSalaStudent />
                </div>
                <div
                  id="RasporedSaleZaProfesora"
                  style={{ display: (this.state.activeContentId==4 && this.state.uloga== 2) ? 'inherit' : 'none' }}
                > 
                  <RasporedSalaProfesor />
                </div>

                <div
                  id="GrupeStudenta"
                  style={{ display: (this.state.activeContentId==5 && this.state.uloga== 1) ? 'inherit' : 'none' }}
                >
                  <GrupeStudent />
                </div>
                <div
                  id="GrupeProfesora"
                  style={{ display: (this.state.activeContentId==6 && this.state.uloga== 2) ? 'inherit' : 'none' }}
                >
                  <GrupeProfesor />
                </div>
                
                             


              </div>
            </div>
          </div>         
        </div>
        </div>
    );
    /*<div class="col-9" style={{padding: "0"}}>
                    <Route exact path="/uniform" component={RasporedStudent} />
                    <Route path="/uniform/rasporedStudent/" component={RasporedStudent} />
                    <Route path="/uniform/rasporedProfesor/" component={RasporedProfesor} />
                    <Route path="/uniform/rasporedSalaStudent" component={RasporedSalaStudent} />
                    <Route path="/uniform/rasporedSalaProfesor" component={RasporedSalaProfesor} />
                    <Route path="/uniform/grupeStudent" component={GrupeStudent} />
                    <Route path="/uniform/grupeProfesor" component={grupeProfesor} />
                </div>*/



/*<>
      
      <div className="App">

        <div  className="containter-fluid">
          <div className="row" style={{ margin: "0px", padding: "0px"}}>
            <div className="col-lg-2 col-md-23 col-sm-12" style={{
              backgroundColor: "#2C3E50",
              minHeight: "100%",
              padding: "0px",
              margin: "0px"
            }}>
              <LeftMenuStudent triggerChangeActiveId={this.onChangeActiveId} />
            </div>
            <div className="col-lg flex-grow-1 col-sm-12 col-md" style={{
              backgroundColor: "white",
              minHeight: "calc(100vh - 80px)",
              margin: "0px",
              padding: "0px"
            }}>

<div id="rightBeta">
              <div
                  id="RasporedStudenta"
                  style={{ display: this.state.activeContentId == 1 ? 'inherit' : 'none' }}
                ><RasporedStudent />
                </div>
                <div
                  id="RasporedProfesora"
                  style={{ display: this.state.activeContentId == 2 ? 'inherit' : 'none' }}
                ><RasporedProfesor />
                </div>
                <div
                  id="RasporedSaleZaStudenta"
                  style={{ display: this.state.activeContentId == 3 ? 'inherit' : 'none' }}
                ><RasporedSalaStudent />
                </div>
                <div
                  id="RasporedSaleZaProfesora"
                  style={{ display: this.state.activeContentId == 4 ? 'inherit' : 'none' }}
                > <RasporedSalaProfesor />
                </div>

                <div
                  id="GrupeStudenta"
                  style={{ display: this.state.activeContentId == 5 ? 'inherit' : 'none' }}
                >
                  <GrupeStudent />
                </div>
                <div
                  id="GrupeProfesora"
                  style={{ display: this.state.activeContentId == 6 ? 'inherit' : 'none' }}
                >
                  <GrupeProfesor />
                </div>



              </div>

             


            </div>
          </div>
        </div>      
      </div>
      </>
    )*/

/*
      <div id>

        <div className="App">

          <div className="row" >

            

            <div id="main">
              <div id="leftBeta">
                <LeftMenuStudent triggerChangeActiveId={this.onChangeActiveId} />
              </div>
              <div id="rightBeta">
              <div
                  id="RasporedStudenta"
                  style={{ display: this.state.activeContentId == 1 ? 'inherit' : 'none' }}
                ><RasporedStudent />
                </div>
                <div
                  id="RasporedProfesora"
                  style={{ display: this.state.activeContentId == 2 ? 'inherit' : 'none' }}
                ><RasporedProfesor />
                </div>
                <div
                  id="RasporedSaleZaStudenta"
                  style={{ display: this.state.activeContentId == 3 ? 'inherit' : 'none' }}
                ><RasporedSalaStudent />
                </div>
                <div
                  id="RasporedSaleZaProfesora"
                  style={{ display: this.state.activeContentId == 4 ? 'inherit' : 'none' }}
                > <RasporedSalaProfesor />
                </div>

                <div
                  id="GrupeStudenta"
                  style={{ display: this.state.activeContentId == 5 ? 'inherit' : 'none' }}
                >
                  <GrupeStudent />
                </div>
                <div
                  id="GrupeProfesora"
                  style={{ display: this.state.activeContentId == 6 ? 'inherit' : 'none' }}
                >
                  <GrupeProfesor />
                </div>



              </div>
            </div>
            <div className="col-lg flex-grow-1 col-sm-12 col-md" style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 80px)",
                margin: "0px",
                padding: "0px"
              }}></div>

          </div>

        </div>
      </div>
    );
*/

/*

    const { open } = this.state;
    return (
      <div>
        <h2>Raspored</h2>
        <div className="App">
          <div className="row" >
            <div id = "head">
              <button type="button" className="btn btn-primary left-buttons" id="startButton" onClick={this.onChangeActiveIdS} >
                Raspored studenta
              </button>
              <div id = "search-issue-tab">Ovdje ce biti search filter
              </div>

            </div>

            <div id = "main">
              <div id = "left">
                <LeftMenuStudent triggerChangeActiveId = {this.onChangeActiveId}/>
              </div>
              <div id = "right">
                <div 
                    id = "RasporedStudenta" 
                    style={{display : this.state.activeContentId == 1 ? 'inherit' : 'none'}}
                ><RasporedStudent/>
                </div>
                <div 
                    id = "RasporedProfesora" 
                    style={{display : this.state.activeContentId == 2 ? 'inherit' : 'none'}}
                ><RasporedProfesor/>
                </div>
                <div 
                    id = "RasporedSaleZaStudenta" 
                    style={{display : this.state.activeContentId == 3 ? 'inherit' : 'none'}}
                > <RasporedSalaStudent/>
                </div>

                <div 
                    id = "RasporedSaleZaProfesora" 
                    style={{display : this.state.activeContentId == 4 ? 'inherit' : 'none'}}
                ><RasporedSalaProfesor/>
                </div>
                <div 
                    id = "GrupeStudenta" 
                    style={{display : this.state.activeContentId == 5 ? 'inherit' : 'none'}}
                ><GrupeStudent/>
                </div>
                <div 
                    id = "GrupeProfesora" 
                    style={{display : this.state.activeContentId == 6 ? 'inherit' : 'none'}}
                > <GrupeProfesor/>
                </div>
                                               
                
              </div>
            </div>

          </div>             
          
        </div>
      </div>
    );*/
  }  
}

export default App




