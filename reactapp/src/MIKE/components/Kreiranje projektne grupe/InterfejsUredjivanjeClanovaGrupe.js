import React, { Component } from 'react';
import './bootstrapflatly.css';
import IzborVodje from './FormaZaIzborVodje';
import BrisanjeClanova from './BrisanjeClanovaGrupe'
import UnosInformacija from './UnosInformacija'

class InterfejsUredjivanjeClanovaGrupe extends Component {
  constructor(props){
    super(props);
    this.state={
      korisnik:props.korisnik,
      projektID:props.projektID,
      predmetID:props.predmetID,
      studentiUnutra:[],
      studentiVani:props.studenti,
      predmet:props.predmet,
      forma:"null"
    }
    this.nizUnutra=[];
    this.nizVani=props.studenti;
    this.nizStudenata=[];
    this.dohvatiStudenteProjekat=this.dohvatiStudenteProjekat.bind(this);
    this.premjestiVani=this.premjestiVani.bind(this);
    this.premjestiUnutra=this.premjestiUnutra.bind(this);
    this.sacuvajPromjene=this.sacuvajPromjene.bind(this);
    //this.izborVodje=this.izborVodje.bind(this);
    this.brisanjeClanova=this.brisanjeClanova.bind(this);
    this.unosInformacija=this.unosInformacija.bind(this);
  }

  render() {
    if(this.state.forma=="null") {
    return (
      <div className="card" style={{float: "left", width:"100%"}}>
        <div class="card-body">
        <h4 class="card-title" style={{textAlign:"left"}}>Uredjivanje clanova grupe</h4>
        <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Grupa 4</h6>
      <br/>
        
      <div className="bs-component">
        <div className="row">
          <div className="col-lg-4">
            <select multiple className="form-control" ref="unutra">
                {
                  this.state.studentiUnutra.map(student=>{
                    return <option className="list-group-item">{student.ime} {student.prezime}</option>
                  })
                }
            </select>
          </div>
          <div className="btn-group-vertical">
            <button className="btn btn-secondary" onClick={this.premjestiVani}>>></button>
            <button className="btn btn-secondary" onClick={this.premjestiUnutra}>{`<<`}</button>
          </div>
          <div className="col-lg-4">
            <select multiple className="form-control" ref="vani">
                {
                  this.state.studentiVani.map(student=>{
                    return <option className="list-group-item">{student.ime} {student.prezime}</option>
                  })
                }
            </select>
          </div>
        </div>
        <br/>
        <button className="btn btn-primary"  style={{float:"left", margin:"10px"}} onClick={this.unosInformacija}>Nazad</button>
        {/*<button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.brisanjeClanova}>Dalje</button>*/}
        <button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.sacuvajPromjene}>Sačuvaj</button>
      </div>
      </div>
      </div>
    );
  }
    else if (this.state.forma=="brisanjeClanova") return (
      <BrisanjeClanova/> 
     );
     else if (this.state.forma=="unosInformacija") return (
      <UnosInformacija korisnik={this.state.korisnik} predmet={this.state.predmet}/> 
     );

  };

  brisanjeClanova(){
    this.setState({forma:"brisanjeClanova"});
  }
  unosInformacija(){
    this.setState({forma:"unosInformacija"});
  }


  dohvatiStudenteProjekat(){
    var ajax=new XMLHttpRequest();
    var komponenta=this;
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status=="200"){
            var tekst=ajax.responseText;
            if(tekst.length==0) return;
            var json=JSON.parse(tekst);
            var jsonNovi=[];
            for(var i=0;i<json.length;i++){
                jsonNovi.push({ime:json[i].ime,prezime:json[i].prezime});
            }
            komponenta.setState(thisState=>({studentiUnutra:jsonNovi,studentiVani:thisState.studentiVani}));
        }
    }
    ajax.open("POST","https://si-mike-2019.herokuapp.com/services/group/getProjectStudents",true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("student=1&grupa=1");

    var ajax2=new XMLHttpRequest();
    var komponenta=this;
    ajax2.onreadystatechange=function(){
        if(ajax2.readyState==4 && ajax2.status=="200"){
            var tekst=ajax2.responseText;
            if(tekst.length==0) return;
            var json=JSON.parse(tekst);
            var jsonNovi=[];
            for(var i=0;i<json.length;i++){
                jsonNovi.push({ime:json[i].ime,prezime:json[i].prezime});
            }
            komponenta.setState(thisState=>({studentiUnutra:thisState.studentiUnutra,studentiVani:jsonNovi}));
        }
    }
    ajax2.open("POST","https://si-mike-2019.herokuapp.com/services/group/getProjectStudents",true);
    ajax2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax2.send("student=1&grupa=0");
  }
  premjestiUnutra(){
    var x=this.refs.unutra;
    var y=this.refs.vani;
    if(y.selectedIndex>=0){
      var student=this.nizVani[y.selectedIndex];
      this.nizUnutra.push(student);
      for(var i=0;i<this.nizVani.length;i++){
        if(this.nizVani[i].id==student.id){
          this.nizVani.splice(i,1);
          break;
        }
      }
      var o=y.options[y.selectedIndex];
      x.add(o);
    }
  }
  premjestiVani(){
    var x=this.refs.unutra;
    var y=this.refs.vani;
    if(x.selectedIndex>=0){
      var student=this.nizUnutra[x.selectedIndex];
      this.nizVani.push(student);
      for(var i=0;i<this.nizUnutra.length;i++){
        if(this.nizUnutra[i].id==student.id){
          this.nizUnutra.splice(i,1);
          break;
        }
      }
      var o=x.options[x.selectedIndex];
      y.add(o);
    }
  }
  sacuvajPromjene(){
    var ajax=new XMLHttpRequest();
    var komponenta=this;
    ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && ajax.status=="200"){
        var id=JSON.parse(ajax.responseText);
        if(id.message){
          alert("Grupa je kreirana!");
        }
        else{
          id=id.id;
          var payload=[];
          for(var i=0;i<komponenta.nizUnutra.length;i++){
            payload.push({idStudent:komponenta.nizUnutra[i].id,idGrupaProjekta:id})
          }
          var jsonSend;
          jsonSend["username"]=komponenta.window.localStorage.getItem("username");
          jsonSend["clanovi"]=payload;
          let ajax2=new XMLHttpRequest();
          ajax2.onreadystatechange=function(){
            if(ajax2.readyState==4 && ajax2.status=="200"){
              alert("Grupa je kreirana!");
            }
          }
          ajax2.open("POST","https://si-mike-2019.herokuapp.com/services/group/addmembers",true);
          ajax2.setRequestHeader("Content-Type", "application/json");
          ajax2.setRequestHeader("Authorization",komponenta.window.localStorage.getItem("token"));
          ajax2.setRequestHeader("Accept","application/json");
          ajax2.send(JSON.stringify(jsonSend));
        }  
      }
    }
    ajax.open("POST","https://si-mike-2019.herokuapp.com/services/group/",true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
    ajax.send("idProjekat="+this.state.projektID+"&nazivGrupe="+this.props.naziv+"&ostvareniBodovi=0&komentarAsistenta= &username="+window.localStorage.getItem("username"));
  }
}

export default InterfejsUredjivanjeClanovaGrupe;