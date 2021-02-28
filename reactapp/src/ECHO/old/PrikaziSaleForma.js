import React, { Component }from 'react';
import './PrikaziSaleForma.css';

class PrikaziSaleForma extends Component {

    render() {

    return (

        <div className ="container" > 
        <div id = "overlay">
            <form >       
                <div className="row" style={{marginTop:'10px'}}>
                    <label className="col-1" style={{marginLeft:'10px', marginTop:'20px',marginRight:'15px'}}>Sale</label>
                    <button type="button" className="btn btn-danger float-right" id="zatvoriDugme" style={{ marginLeft: '72%',width:'47px'}}>X</button>

                </div>
                <div className="row" style={{marginTop:'10px'}}>
                    <select className="form-control col-7" id="naslovSelect" style={{marginLeft:'20px'}}>
                        <option>Sala 1</option>
                        <option>Sala 2</option>
                        <option>Sala 3</option>
                        <option>Sala 4</option>
                        <option>Sala 5</option>
                    </select>
                </div>
                <div className="form-group row col-12">

                    <button type="submit" className="btn btn-outline-primary col-3"  style={{marginLeft:'170px', marginTop:'270px',marginBottom: '20px'}}>Obrisi salu</button>           

                </div>
            </form>
            </div>
        </div>
    );
 }
}
export default PrikaziSaleForma;