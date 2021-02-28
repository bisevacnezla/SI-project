import React, {Component} from 'react';
import Korisnik from '../Korisnik';
import Komentar from '../Komentar'
import { randomBytes } from 'crypto';
import LISTA_PROBNA from './LISTA'

const themesApi= 'https://si2019tango.herokuapp.com/getReplys/'


class Odgovor extends Component {   
    
    render() {
      //  console.log(this.props.komentar.odgovori)
      if(this.props.komentar.odgovori!=undefined)
        return (
            this.props.komentar.odgovori.map(odg=>{
                if(odg.idComment==this.props.id && odg.korisnik!=undefined) {
                return(
                    <div  class="shadow p-5 mb-2 ml-5 mr-5 mt-0 bg-white rounded">
                        <Korisnik key={odg.korisnik.id} korisnik={odg.korisnik}/>

                        <div>
                             <p> {odg.text} </p> 
                        </div>
                          <div class="d-flex justify-content-end mr-2">
                            <p> {odg.timeCreated} </p> 
                        </div>
                    </div>

                )
                }
            })
          
        );
    return (<div></div>);
    }
}



class ListaOdgovora extends Component {

    constructor() {
        super();
        this.state = {
          komentari:[],
          idComment: 1
        };        
      }
      componentWillMount(){
        this.setState({ucitavanje:true});
        fetch(themesApi+this.props.idTheme) 
          .then(response=>response.json())
          .then(komentari=>this.setState({komentari:komentari,ucitavanje:false, idComment: this.props.idComment}));
     //   this.setState({komentari:LISTA_PROBNA,ucitavanje:false});
      }


render(){
  //  console.log(this.state.komentari);
    return(
        this.state.komentari.map(komentar => {
               return (
                   <div  style={{ padding:  "3px" }}> 
                       <Odgovor key={komentar.idComment} komentar={komentar} id={this.props.idComment}/>
                   </div>
               )
        })
     //   <div>lol</div>
        ); 
    }
}
export default ListaOdgovora;

