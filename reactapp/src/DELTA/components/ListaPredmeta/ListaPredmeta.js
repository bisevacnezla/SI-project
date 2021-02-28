import React, { Component } from "react";
import axios from 'axios';
import Predmet from "../Predmet/Predmet";
class ListaPredmeta extends Component {

  constructor(props) {
    super(props);
    this.state = {
        activeDivId: 1,
        ListaPredmeta: ["Softver Inženjering","Vještačka Inteligencija",
        "Projektovanje Informacionih sistema","Administracija Računarskih Mreža",
        "Završni rad"],
        IDaktivnogPredmeta: 0
    };
};


changeActiveId(id){
    this.props.triggerChangeActiveId(id);
}

dohvatiIDPredmetaPrekoNaziva(naziv){
  setTimeout(() => {
    axios.get("https://si2019delta.herokuapp.com/dohvatiIDPredmeta/"+naziv)
    .then(response => {
      const id = response.data;
          this.setState({
            IDaktivnogPredmeta: id
          })
          console.log(this.state.IDaktivnogPredmeta);
          this.props.idAktivnog(this.state.IDaktivnogPredmeta);   
    })
    . catch (error =>{
        console.log(error)
    })
  }, 100)
}

render() {
    return (
        <div >
            <button 
                type="button" 
                className="btn btn-primary left-buttons" 
                id = "moj"
                onClick = {()=>
                  {
                    this.changeActiveId(1)
                    this.dohvatiIDPredmetaPrekoNaziva(this.state.ListaPredmeta[0]);
                  }
                }>{this.state.ListaPredmeta[0]}
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>
                  {
                    this.changeActiveId(2);
                    this.dohvatiIDPredmetaPrekoNaziva(this.state.ListaPredmeta[1]);
                  }
                }>{this.state.ListaPredmeta[1]}
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>
                  {
                    this.changeActiveId(3);
                    this.dohvatiIDPredmetaPrekoNaziva(this.state.ListaPredmeta[2]);
                  }
                }>{this.state.ListaPredmeta[2]}
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>
                  {
                    this.changeActiveId(4);
                    this.dohvatiIDPredmetaPrekoNaziva(this.state.ListaPredmeta[3]);
                  }
                }>{this.state.ListaPredmeta[3]}
            </button>
            <button 
                type="button" 
                className="btn btn-primary left-buttons"
                onClick = {()=>
                  {
                    this.changeActiveId(5);
                    this.dohvatiIDPredmetaPrekoNaziva(this.state.ListaPredmeta[4]);
                  }
                }>{this.state.ListaPredmeta[4]}
            </button>
        </div>
        
    );
}
};   

export default ListaPredmeta;
