import React, {Component} from 'react';
import Teme from '../Tema';
import DugmeZaSort from '../DugmeZaSort';
import Paginacija from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import LISTA_PROBNA from './LISTA';
import {AZSortObrnut, AZSort, KomentariSort, KomentariSortObrnut, VrijemeSort,VrijemeSortObrnut} from '../sortovi/Sort.js';
import {IdUSER} from '../id.js';


import {
  withRouter
} from 'react-router-dom'
import { resolve } from 'path';

const themesApi= 'https://si2019tango.herokuapp.com/getThemes/'; //plus id teme



class Lista extends Component{
  constructor() {
    super();
    this.state = {
      teme:[],
      podnizTema: [],
      trenutnaStranica: 1,
      maxPoStranici: 10,
      obrnut: false,
      ukupno:0
    };
    
  }
  
  componentWillMount(){
    this.setState({ucitavanje:true});
    fetch(themesApi+"idPredmeta=4&idUser="+IdUSER) 
      .then(response=>response.json())
      .then(teme=>{
        var ts= this.state.trenutnaStranica * 10;
        var leng= teme.length;
        var pocetniPodniz = teme.slice(ts-10, ts);
        this.setState({teme:teme, podnizTema: pocetniPodniz, ucitavanje:false, ukupno:leng})
      });
    //this.setState({teme:LISTA_PROBNA,ucitavanje:false});
  }
 //                   dodaj ,obrnut
 
  
  dajPodniz = (pocetak, kraj) =>{
    var teme=this.state.teme;
    var podnizTema= teme.slice(pocetak, kraj);
    return podnizTema;
  }

  handlePromjenuStranice = stranica => {
    let Nstranica= stranica * 10;
    var podnizTema = this.state.teme.slice(Nstranica-10, Nstranica);
    this.setState({
        podnizTema: podnizTema,
        trenutnaStranica: stranica,
    })
  }

  searchTema (evt) {
    var pom = this.state.teme;
    this.setState({trenutnaStranica: 1});

    pom =  pom.filter(function(item) {
      console.log(JSON.stringify(item));
      console.log(item.title.indexOf((evt.target.value)));
      return item.title.indexOf((evt.target.value))!=-1;
  });
  this.setState({ukupno: pom.length});

    this.setState({podnizTema:pom});
  }

  handleSortiranje = (sort_1, sort_2) => {
    console.log(sort_1 + sort_2);
        let niz= this.state.teme;
        let obrnut= this.props.obrnut;
        var noviNiz;
        if(sort_1==='1' && sort_2==='1'){
           noviNiz= AZSort(niz);
             if(obrnut) { noviNiz=AZSortObrnut(niz);
                obrnut=false;}
        }

        if(sort_1==='1' && sort_2==='2') {
          noviNiz=VrijemeSort(niz);
            if(obrnut) { noviNiz=VrijemeSortObrnut(niz);
                obrnut=false;}
        }
        
        if(sort_1==='1' && sort_2==='3') {
          noviNiz=KomentariSort(niz);
            if(obrnut) { noviNiz=KomentariSortObrnut(niz);
                obrnut=false;}
        }

        if(sort_1==='2' && sort_2==='1') {
          noviNiz=AZSort(niz);
            if(!obrnut) {noviNiz= AZSortObrnut(niz); obrnut=true;}
        }

        if(sort_1==='2' && sort_2==='2'){
          noviNiz=VrijemeSort(niz);
            if(!obrnut) {  noviNiz=VrijemeSortObrnut(niz); obrnut=true;}
        }

        if(sort_1==='2' && sort_2==='3') {
          noviNiz=KomentariSort(niz);
            if(!obrnut) { noviNiz=KomentariSortObrnut(niz); obrnut=true;}
        }
        let Nstranica= this.state.trenutnaStranica * 10;
        var podnizTema = noviNiz.slice(Nstranica-10, Nstranica);
        this.setState({
            teme:noviNiz,
            podnizTema: podnizTema,
            obrnut: obrnut
        });
  }


  render(){
    if(this.state.ucitavanje){
      return <p>Ucitavanje...</p>
    }
      return(
        <div>
          <div>< button type="button" class="btn btn-primary"><a href="/Tango/NovaTema">Dodaj novu temu</a></button>
 </div>
          <div>
            <DugmeZaSort  
              sortirajNiz={this.handleSortiranje}
              obrnut={this.state.obrnut}
            />
          </div>
          <div>
            <input type='text' class="form-control bg-white rounded" onChange={this.searchTema.bind(this)} placeholder="Search"></input>
          </div>
          {/* <button onClick={() => {this.sortirajAZ(this.state.teme)}}>a-z</button> */}
        <div>
          <Teme teme={this.state.podnizTema}/>
        </div>
        <div>
          <Paginacija onChange={this.handlePromjenuStranice} current={this.state.trenutnaStranica} total={this.state.ukupno}/>
        </div>
        </div>
      );
  }
  
  
}

export default Lista;
