import React, { Component }from 'react';
import './DodajNovuSalu.css';

class DodajNovuSalu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          naziv: "",
          kapacitet: 1,
          namjena:true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNazivInput = this.handleNazivInput.bind(this);
        this.handleKapacitetInput = this.handleKapacitetInput.bind(this);

    }

    handleNazivInput(event) {
      this.setState({ naziv: event.target.value });
    }
    
    handleKapacitetInput(event) {
      this.setState({ kapacitet: event.target.value });
    }

    handleSubmit(event) {
       
          this.postTermin();
          
      }
      postTermin(event) {
        fetch("http://localhost:31905/si2019/echo/unesiSalu", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            
            kapacitet: this.state.kapacitet, 
            naziv: this.state.naziv,
           namjena: this.state.namjena
          })
        }).then(
         
        );
      }
    render() {

    return (

        <div className ="container" > 
      
            <form >       
                <div className="row" style={{marginTop:'10px'}}>
                    <button type="button" className="btn btn-danger float-right" id="zatvoriDugme" style={{ marginLeft: '90%',width:'47px'}}>X</button>

                </div>
                
                <div className="form-group row col-5" placeholder="Default input" style={{marginTop:'2%',marginLeft:'10px'}}>
                     <label id="naziv">Naziv sale:</label>
                     <input type="text" className="form-control" id="naziv" onChange={this.handleNazivInput}></input>
                      <label id="kapacitet"  >Kapacitet:</label>
                     <input type="number" className="form-control" id="kapacitet" onChange={this.handleKapacitetInput}></input>
                    
                    
                </div>
                <div className="form-group row col-5" placeholder="Default input" style={{marginTop:'3%',marginLeft:'10px'}}>
                    <label> Sala posjeduje računare: </label>
                    
                </div>
                <div className="form-group row col-5" placeholder="Default input" style={{marginTop:'2%',marginLeft:'10px',marginBottom:'10%'}}>
                    <label id="da" style={{marginRight:'20px'}}><input type="radio" id = "da"></input>Da</label>
                    <label id="ne"><input type="radio" id = "ne"></input>Ne</label>        
                </div>
                <div className="form-group row col-12">
                    <button type="submit" className="btn btn-outline-primary col-3"  style={{marginLeft:'40%'}} onClick={this.handleSubmit}>Dodaj salu</button>           
                </div>
            </form>
            </div>


    );
 }
}
export default DodajNovuSalu;