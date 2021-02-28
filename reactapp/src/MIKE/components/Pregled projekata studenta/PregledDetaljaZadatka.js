import React from "react";
import { thisExpression } from "@babel/types";

class DetaljiZadatka extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        this.popuniDetaljeZadatka=this.popuniDetaljeZadatka.bind(this);
    }
      
    render() {
        return ( 
            <div className="card" style={{float: "left", width:"100%"}}> 
             <div class="card-body">
            <form id="detaljiZadatka"  >
                 <label className="col-form-label col-form-label-lg">id:</label>
                 <br/>
                <label class="form-text"> {this.state.id_projekta}</label> 
                <br/>
                <label class="form-text">Opis zadatkaaa: {this.state.opis_zadatka}</label>
                <br/>
                <label class="form-text">Datum pocetka: {this.state.datum_pocetka}</label>
                <br/>
                <label class="form-text">Datum zavrsetka: {this.state.datum_zavrsetka}</label>
                <br/>
                <label class="form-text">Zavrsen: {this.state.zavrsen}</label>
                <br/>
                <label class="form-text">Komentar asistenta: {this.state.komentar_asistenta}</label>
                <br/>
            </form>
            </div>
            </div>
        );
    }
    popuniDetaljeZadatka() {
        
    }
}
export default DetaljiZadatka;
