import React, { Component } from 'react';
import './App.css';
import PregledListeProjekata from './components/Pregled projekata studenta/PregledListeProjekata';
import Lista  from './components/Kreiranje projektne grupe/prikazListe';
import PregledZadatakaProjekta from './components/PregledZadatakaProjekta/PregledZadatakaProjekta';
import KreiranjeProjekta from './components/Kreiranje projekta na nivou predmeta/FormaZaKreiranjeProjektaNaNivouPredmeta';
import UnosInformacija from './components/Kreiranje projektne grupe/UnosInformacija';
import ListaPredmetaAsistenta from './components/Pregled projekata asistenta/prikazListePredmetaAsistenta';
import GenerisanjeGrupa from './components/Generisanje projektnih grupa/GenerisanjeGrupa';
import GenerisiProjektnuGrupu from './components/GenerisanjeProjektnihGrupa/FormaZaGenerisanje';

class Mike extends Component {
  constructor(props){
    super(props);
    this.state={

      
      korisnik:window.localStorage.getItem("id"),

      forma:"null",
      predmeti:[],
      uloga:"null"
    }
 

    this.kreiranjeGrupe=this.kreiranjeGrupe.bind(this);
    this.listaProjekata=this.listaProjekata.bind(this);
    this.pregledDetaljaPredmeta=this.pregledDetaljaPredmeta.bind(this);
    this.pregledZadatakaProjektaCall=this.pregledZadatakaProjektaCall.bind(this);
    this.KreiranjeProjektaAsistent=this.KreiranjeProjektaAsistent.bind(this);
    this.unosInformacija=this.unosInformacija.bind(this);
    this.generisanjeGrupe=this.generisanjeGrupe.bind(this);
    this.token=this.token.bind(this);
  }
  componentDidMount(){
    if(this.state.uloga=="null"){
      let ajax=new XMLHttpRequest();
      var komponenta=this;
      var username=window.localStorage.getItem("username");

      ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status=="200"){
          var tekst=ajax.responseText;
          if(tekst=="STUDENT"){
            komponenta.setState(state=>({
              forma:"null",
              uloga:"student"
            }));
          }
          else if(tekst=="ASISTENT"){
            komponenta.setState(state=>({
              forma:"null",
              uloga:"asistent"
            }));
          }
          else if(tekst=="ADMIN"){
            komponenta.setState(state=>({
              forma:"null",
              uloga:"admin"
            }));
          }
        }
        else if(ajax.status>=500){
          
        }
    }
    ajax.open("GET","https://si2019oscar.herokuapp.com/pretragaUsername/"+username+"/dajUlogu");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
    ajax.send();
    }
  }
  render() {
    if(this.state.forma=="null" && this.state.uloga=="null") return(
      <div>
          <div className="App">
            <div className="row">
              <div id="glavni_meni1">
                <div id="left">
                  <div>
                  </div>
                </div>
                <div id="right">
                <div className="alert alert-dismissible alert-danger" style={{width:"100%"}}>
                  <strong>Molimo vas da se prijavite kao asistent ili kao student</strong> <br />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    ) 
    else if(this.state.uloga=="admin") return(
      <div>
          <div className="App">
            <div className="row">
              <div id="glavni_meni1">
                <div id="left">
                  <div>
                    <button className="btn btn-primary left-buttons" onClick={this.kreiranjeGrupe}>Kreiranje projektne grupe</button>
                    <button className="btn btn-primary left-buttons" onClick={this.listaProjekata}>Pregled projekata</button>
                    <button className="btn btn-primary left-buttons" onClick={this.pregledDetaljaPredmeta}>Pregled projekata</button>
                    <button className="btn btn-primary left-buttons" onClick={this.KreiranjeProjektaAsistent}>Kreiranje projekta na nivou predmeta</button>
                    <button className="btn btn-primary left-buttons" onClick={this.generisanjeGrupe}>Generisanje projektne grupe</button>
                  </div>
                </div>
                <div id="right">
                  
                  </div>
              </div>
            </div>
          </div>
        </div>
    )  
    else if(this.state.forma=="null" && this.state.uloga=="student") return (
        <div>
          <div className="App">
            <div className="row">
              <div id="glavni_meni1">
                <div id="left">
                  <div>
                    <button className="btn btn-primary left-buttons" onClick={this.kreiranjeGrupe}>Kreiranje projektne grupe</button>
                    <button className="btn btn-primary left-buttons" onClick={this.listaProjekata}>Pregled projekata</button>
                  </div>
                </div>
                <div id="right">
                  
                  </div>
              </div>
            </div>
          </div>
        </div>
    );
    else if(this.state.forma=="null" && this.state.uloga=="asistent") return(
      <div>
      <div className="App">
        <div className="row">
          <div id="glavni_meni1">
            <div id="left">
              <div>
               <button className="btn btn-primary left-buttons" onClick={this.pregledDetaljaPredmeta}>Pregled projekata</button>
                <button className="btn btn-primary left-buttons" onClick={this.KreiranjeProjektaAsistent}>Kreiranje projekta na nivou predmeta</button>
                <button className="btn btn-primary left-buttons" onClick={this.generisanjeGrupe}>Generisanje projektne grupe</button>
              </div>
            </div>
            <div id="right">
            </div>
          </div>
        </div>
      </div>
    </div>
    )
    else if (this.state.forma=="kreiranjeGrupe") return (
    <div>
      <div className="App">
        <div className="row">
          <div id="glavni_meni1">
            <div id="left">
              <div>
                <button className="btn btn-primary left-buttons" onClick={this.kreiranjeGrupe}>Kreiranje projektne grupe</button>
                <button className="btn btn-primary left-buttons" onClick={this.listaProjekata}>Pregled projekata</button>
               </div>
            </div>
            <div id="right">
              <Lista submit={this.unosInformacija} predmeti={this.state.predmeti} korisnik={this.state.korisnik}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    else if (this.state.forma=="listaProjekata") return (
      <div>
      <div className="App">
        <div className="row">
          <div id="glavni_meni">
            <div id="left">
              <div>
                <button className="btn btn-primary left-buttons" onClick={this.kreiranjeGrupe}>Kreiranje projektne grupe</button>
                <button className="btn btn-primary left-buttons" onClick={this.listaProjekata}>Pregled projekata</button>
                 </div>
            </div>
            <div id="right">
              <PregledListeProjekata projekti={this.state.predmeti}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
    else if (this.state.forma=="PregledAsistent") return (
      <div>
      <div className="App">
        <div className="row">
          <div id="glavni_meni">
            <div id="left">
              <div>
                <button className="btn btn-primary left-buttons" onClick={this.pregledDetaljaPredmeta}>Pregled projekata</button>
                <button className="btn btn-primary left-buttons" onClick={this.KreiranjeProjektaAsistent}>Kreiranje projekta na nivou predmeta</button>
                <button className="btn btn-primary left-buttons" onClick={this.generisanjeGrupe}>Generisanje projektne grupe</button>
              </div>
            </div>
            <div id="right">
              <ListaPredmetaAsistenta idAsistent={10} predmeti={this.state.predmeti} />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    else if(this.state.forma=="KreiranjeAsistent") return(
      <div>
      <div className="App">
        <div className="row">
          <div id="glavni_meni">
            <div id="left">
              <div>
               <button className="btn btn-primary left-buttons" onClick={this.pregledDetaljaPredmeta}>Pregled projekata</button>
                <button className="btn btn-primary left-buttons" onClick={this.KreiranjeProjektaAsistent}>Kreiranje projekta na nivou predmeta</button>
                <button className="btn btn-primary left-buttons" onClick={this.generisanjeGrupe}>Generisanje projektne grupe</button>
              </div>
            </div>
            <div id="right">
              <KreiranjeProjekta idAsistent={this.state.korisnik} predmeti={this.state.predmeti}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    else if(this.state.forma=="generisanjeGrupe") return(
      <div>
      <div className="App">
        <div className="row">
          <div id="glavni_meni1">
            <div id="left">
              <div>
               <button className="btn btn-primary left-buttons" onClick={this.pregledDetaljaPredmeta}>Pregled projekata</button>
                <button className="btn btn-primary left-buttons" onClick={this.KreiranjeProjektaAsistent}>Kreiranje projekta na nivou predmeta</button>
                <button className="btn btn-primary left-buttons" onClick={this.generisanjeGrupe}>Generisanje projektne grupe</button>
              </div>
            </div>
            <div id="right">
              <GenerisanjeGrupa idAsistent={this.state.korisnik} predmeti={this.state.predmeti}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    //else return(<p>greska</p>);
  }
  kreiranjeGrupe(){
    let ajax=new XMLHttpRequest();
    var komponenta=this;
    ajax.onreadystatechange=function(){
      console.log(ajax.status);
        if(ajax.readyState==4 && ajax.status=="200"){
          var tekst=JSON.parse(ajax.responseText);
          var json;
          if(!tekst.message){
            json=tekst.predmeti;
          }
          else{
            json=[{
              "id": 64,
              "naziv_predmeta": "Softver inzenjering",
              "projekti": [
              {
                "idProjekat": 4,
                "nazivProjekta": "Zamger 2.0",
                "progress": null,
                "opisProjekta": "Informacioni sistem fakulteta",
                "moguciBodovi": 40,
                "rokProjekta": null
              }]
            }];
          }
          komponenta.setState(state=>({
            forma:"kreiranjeGrupe",
            predmeti:json
          })); 
        }
        else if(ajax.status>=500){
          komponenta.setState(state=>({
            forma:"kreiranjeGrupe",
            predmeti:json
          }));
        }
      }
      //console.log(window.localStorage.getItem("username"));
      //console.log(window.localStorage.getItem("id"));
      //console.log(window.localStorage.getItem("token"));
      ajax.open("GET","https://si-mike-2019.herokuapp.com/services/viewS/predmeti-za-generisanje-grupa/"
      +this.state.korisnik+"?username="+window.localStorage.getItem("username"),true);
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
      ajax.send();
  }
  listaProjekata(){
    let ajax=new XMLHttpRequest();
    var komponenta=this;
    var jsonNovi=[{idProjekat:1,nazivPredmeta:"predmet",opis:"opis",nazivProjekta:"projekt"}];
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status=="200"){
          var tekst=ajax.responseText;
          if(tekst.length==0) return;
          var json=JSON.parse(tekst);
          if(json.message){
            json=[{
              idPredmet:64,
              naziv:"Softver Inženjering",
              idProjekat:1,
              nazivProjekta:"Zamger 2.0",
              opis:"Informacioni sistem za fakultet",
              idProjektnaGrupa:1
            }]
          }
        komponenta.setState(state=>({
            forma:"listaProjekata",
            predmeti:json
          }));
        }
        else if(ajax.status>=500){
          komponenta.setState(state=>({
            forma:"listaProjekata",
            predmeti:json
          }));
        }
      }
      ajax.open("GET","https://si-mike-2019.herokuapp.com/services/viewA/getProjects/"
      +this.state.korisnik+"?username="+window.localStorage.getItem("username"),true);
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
      ajax.send();
  }
  pregledDetaljaPredmeta(){
		let ajax=new XMLHttpRequest();
    var komponenta=this;
    ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && ajax.status=="200"){
        var tekst=ajax.responseText;
        var json=JSON.parse(tekst);
        if(json.message){
          json=[{
            idPredmet:64,
            naziv:"Softver Inženjering",
            idProjekat:1,
            nazivProjekta:"Zamger 2.0",
            opis:"Informacioni sistem za fakultet",
            moguciBodovi:40
          }]
        };
        komponenta.setState(state=>({
          forma:"PregledAsistent",
          predmeti:json
        }));
      }
      else if(ajax.status>=500){
        komponenta.setState(state=>({
          forma:"PregledAsistent",
          predmeti:json
        }));
      }
		}
    ajax.open("GET","https://si-mike-2019.herokuapp.com/services/viewA/predmetiprojektiasistent/"
    +this.state.korisnik+"?username="+window.localStorage.getItem("username"),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
    ajax.send();
  }
  pregledZadatakaProjektaCall(){
    this.setState({forma:"projektniZadaci"});
  }
  KreiranjeProjektaAsistent(){
    let ajax=new XMLHttpRequest();
    var komponenta=this;
    var jsonNovi=[
      {idPredmet:4,naziv:"Softver Inženjering*", brojStudenata:50},
      {idPredmet:5,naziv:"Vještačka inteligencija*", brojStudenata:30}];
    ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && ajax.status=="200"){
        var tekst=ajax.responseText;
        if(tekst.length==0) return;
        var json=JSON.parse(tekst);
        jsonNovi=[];
        for(var i=0;i<json.length;i++){
            jsonNovi.push({idPredmet:json[i].id,naziv:json[i].naziv});
        }
        komponenta.setState(state=>({
          forma:"KreiranjeAsistent",
          predmeti:jsonNovi
        }));
      }
      else if(ajax.status>=500){
        komponenta.setState(state=>({
          forma:"KreiranjeAsistent",
          predmeti:jsonNovi
        }));
      }
    }
    ajax.open("GET","https://si-mike-2019.herokuapp.com/services/projects/getPredmeti/"
    +this.state.korisnik+"?username="+window.localStorage.getItem("username"),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
    ajax.send();
  }
  unosInformacija(){
    this.setState(state=>({
      forma:"unosInformacija"
    }));
  }
  generisanjeGrupe(){
    let ajax=new XMLHttpRequest();
    var komponenta=this;
    var jsonNovi=[
      {nazivPredmeta:"Softver Inženjering*",idProjekat:1, brojStudenata:50},
      {nazivPredmeta:"Vještačka inteligencija*",idProjekat:2, brojStudenata:30}];
    ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && ajax.status=="200"){
        var tekst=ajax.responseText;
        if(tekst.length==0) return;
        console.log(tekst);
        var json=JSON.parse(tekst);
        komponenta.setState(state=>({
          forma:"generisanjeGrupe",
          predmeti:json
        }));
      }
      else if(ajax.status>=500){
        komponenta.setState(state=>({
          forma:"generisanjeGrupe",
          predmeti:json
        }));
      }
    }
    ajax.open("GET","https://si-mike-2019.herokuapp.com/services/projects/getInfoPredmeti/"
    +this.state.korisnik+"?username="+window.localStorage.getItem("username"),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
    ajax.send();
  }

  token(){
    this.setState(state=>({
      token:10
    }));
  }
}

export default Mike;
