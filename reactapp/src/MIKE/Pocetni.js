import React, { Component } from 'react';
import './App.css';
import MockListaPredmeta from './MockListaPredmeta';
import PrikazPredmeta from './PrikazPredmeta';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      nazivPredmeta:"SI",
      forma:"Mock",
      opisProjekta:"",
      brojMogucihBodova:0
    }
    this.funkcija=this.funkcija.bind(this);
  }
  render() {
    if(this.state.forma=="Mock")
      return (    
        <MockListaPredmeta funkcija={this.funkcija} nazivPredmeta={this.state.nazivPredmeta} />
      );
    else 
      return(
        <PrikazPredmeta nazivPredmeta={this.state.nazivPredmeta}
        opisProjekta={this.state.opisProjekta} 
        brojMogucihBodova={this.state.brojMogucihBodova}/>
    )  
  };
  funkcija(){
    var ajax=new XMLHttpRequest();
    var komponenta=this;
    ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && ajax.status=="200" || true){
        //var tekst=ajax.responseText;
        //var json=JSON.parse(tekst);
        //nakon kreiranja servisa bit će povezan sa formom
        komponenta.setState(thisState=>({
          nazivPredmeta:thisState.nazivPredmeta, 
          forma:"Predmet", 
          opisProjekta:"Projekat kreiranja informacionog sistema za fakultet",
          brojMogucihBodova:50}));
      }
    }
    ajax.open("GET","#",true);
    ajax.send();
  }
}
export default App;
