


import React, { Component } from "react";
import history from "../utils/history";
import { Link } from "react-router-dom";
import MainContent from "./mainContent";

class Header extends Component {  

  render() {
  

   

    return (
      <div>
        <div> <Link to={"/KILO/kreiranjeZadace/?idPredmeta="+this.props.podaci.state.idPredmet}  onClick={this.props.podaci.postaviIdeve}>
          <button
            type="button"
            class="meniBtn"
            className="btn btn-primary left-buttons"
            id="KreiranjeKilo"
            style={{ width: "100%" }}
            style={{ display: this.props.podaci.state.idStudent === null ? 'inherit' : 'none' }}
            onClick={()=>this.props.podaci.postaviAktivniDiv(1)}
          >
           
            Kreiranje zadaće
          </button></Link>
       </div>
<div>
          <Link to= {"/KILO/azuriranjeZadace/?idPredmeta="+this.props.podaci.state.idPredmet} onClick={this.props.podaci.postaviIdeve}>
          <button
            type="button"
            class="meniBtn"
            className="btn btn-primary left-buttons"
            id="AzuriranjeKilo"
            style={{ width: "100%" }}
            style={{ display: this.props.podaci.state.idStudent === null ? 'inherit' : 'none' }}
            onClick={()=>this.props.podaci.postaviAktivniDiv(2)}
          >
            Ažuriranje zadaće
          
          </button>
       </Link>
</div>
        <div> <Link to={"/KILO/brisanjeZadace/?idPredmeta="+this.props.podaci.state.idPredmet}  onClick={this.props.podaci.postaviIdeve}>
           
          <button
            type="button"
            class="meniBtn"
            className="btn btn-primary left-buttons"
            id="BrisanjeKilo"
            style={{ width: "100%" }}
            style={{ display: this.props.podaci.state.idStudent === null ? 'inherit' : 'none' }}
            onClick={()=>this.props.podaci.postaviAktivniDiv(3)}
          >
            Brisanje zadaće
          
          </button>  </Link>
      
</div>
        <div><Link to={"/KILO/ocjenjivanjeZadace/?idPredmeta="+this.props.podaci.state.idPredmet}  onClick={this.props.podaci.postaviIdeve}>
          <button
            type="button"
            class="meniBtn"
            className="btn btn-primary left-buttons"
            id="OcjenivanjeKilo"
            style={{ width: "100%" }}
            style={{ display: this.props.podaci.state.idStudent === null ? 'inherit' : 'none' }}
            onClick={()=>this.props.podaci.postaviAktivniDiv(4)}
          >
            
            Ocjenjivanje zadaće
          
          </button>  </Link>
     </div>

        <div>
          <Link to={"/KILO/student/?idStudenta="+this.props.podaci.state.idStudent+"&idPredmeta="+this.props.podaci.state.idPredmet}  onClick={this.props.podaci.postaviIdeve}>
          <button
            type="button"
            class="meniBtn"
            className="btn btn-primary left-buttons"
            style={{ width: "100%" }}
            onClick={()=>this.props.podaci.postaviAktivniDiv(5)}
            style={{ display: this.props.podaci.state.idStudent === null ? 'none' : 'inherit' }}
          >
            
            Student
          
          </button>  </Link>
        </div>
      
      </div>
    );
  }
}

export default Header;
