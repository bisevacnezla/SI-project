import React, {Component} from 'react';
import Komentari from '../Komentar';
import DugmeZaSort from '../DugmeZaSort';
import Paginacija from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Komentar from '../Komentar';
import ObjaviKomentar from '../ObjaviKomentar';
import {AZSortObrnutKom, AZSortKom, VrijemeSort,VrijemeSortObrnut} from '../sortovi/Sort.js';
//import LISTA_PROBNA from './LISTA';
import {Link} from 'react-router-dom';
import {IdUSER} from '../id.js';

const themesApi= 'https://si2019tango.herokuapp.com/getReplys/'; //plus id teme

class ListaKomentara extends Component {
    constructor() {
        super();
        this.state = {
          komentari:[],
          podnizKomentara: [],
          trenutnaStranica: 1,
          maxPoStranici: 10,
          obrnut: false,
          nazivTeme :'',
          id: 1
        };        
      }

    componentWillMount(){
        const url=window.location;
        let noviUrl=new URL(url);
        const idTeme=noviUrl.searchParams.get('idTheme');
        this.setState({id:idTeme});

        this.setState({ucitavanje:true});
        fetch(themesApi+idTeme) 
          .then(response=>response.json())
          .then(komentari=>{
            var ts= this.state.trenutnaStranica * 10;
            var leng= komentari.length;
            var pocetniPodniz = komentari.slice(ts-10, ts);
            this.setState({komentari:komentari, podnizKomentara: pocetniPodniz, ucitavanje:false, ukupno:leng});
          });
       // this.setState({komentari:LISTA_PROBNA,ucitavanje:false});
    }

    handlePromjenuStranice = stranica => {
      let Nstranica= stranica * 10;
      var podnizKomentara = this.state.komentari.slice(Nstranica-10, Nstranica);
      this.setState({
          podnizKomentara: podnizKomentara,
          trenutnaStranica: stranica,
      })
    }

    handleSortiranje = (sort_1, sort_2) => {
          let niz= this.state.komentari;
          let obrnut= this.props.obrnut;
          var noviNiz;
          if(sort_1==='1' && sort_2==='1'){
             noviNiz= AZSortKom(niz);
               if(obrnut) { noviNiz=AZSortObrnutKom(niz);
                  obrnut=false;}
          }
  
          if(sort_1==='1' && sort_2==='2') {
            noviNiz=VrijemeSort(niz);
              if(obrnut) { noviNiz=VrijemeSortObrnut(niz);
                  obrnut=false;}
          }
          
          if(sort_1==='2' && sort_2==='1') {
            noviNiz=AZSortKom(niz);
              if(!obrnut) {noviNiz= AZSortObrnutKom(niz); obrnut=true;}
          }
  
          if(sort_1==='2' && sort_2==='2'){
            noviNiz=VrijemeSort(niz);
              if(!obrnut) {  noviNiz=VrijemeSortObrnut(niz); obrnut=true;}
          }
  
          let Nstranica= this.state.trenutnaStranica * 10;
          var podnizKomentara = noviNiz.slice(Nstranica-10, Nstranica);
          this.setState({
              komentari:noviNiz,
              podnizKomentara: podnizKomentara,
              obrnut: obrnut
          });
    }


    
    
      render(){
        
        if(this.state.ucitavanje){
          return <p>Ucitavanje...</p>
        }
          return(
            <div>
              
                 <Link to ={{
                    pathname: '/Tango/Teme',
                  
                  }}>
          <button color="primary" className="btn btn-primary my-1 btn-sm" >Povratak</button>
          </Link>
              <div>
                <DugmeZaSort 
                 
                  sortirajNiz={this.handleSortiranje}
                  obrnut={this.state.obrnut}
                />
              </div>
              <div>
                <input type='text' class="form-control bg-white rounded" value="Search"></input>
              </div>
            <div>
            <Komentari komentari={this.state.podnizKomentara}/>
            </div>
            <div>
            <ObjaviKomentar id={this.state.id} nazivTeme={this.state.nazivTeme}/>
              </div>
            <div>
              <Paginacija onChange={this.handlePromjenuStranice} current={this.state.trenutnaStranica} total={this.state.komentari.length}/>
            </div>
            </div>
          );
      }
}
 
export default ListaKomentara;