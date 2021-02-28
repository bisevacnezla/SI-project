import React from 'react'
import { Link } from 'react-router-dom';
import Modal from "../SharedComponents/Modal";
import DatePicker from "react-datetime";
import axios from "axios";

class UrediIspit extends React.Component {
  constructor(props) {
    super(props);
    const {
      idIspit
    } = props;
    this.state = {
      idIspit: idIspit || 0,
      ispit: {}
    };
  }

 /* handleRokPrijaveChange = e => {
    this.setState({
      rokPrijave: e.target
    });
  };

  handleTerminChange = e => {
    this.setState({
      termin: e.target
    });
  };

  handleSalaChange = e => {
    this.setState({
      sale: e.target
    });
  };

  onVrijemeTrajanjaChange = e => {
    this.setState({
      vrijemeTrajanja: e.target
    });
  };

  onKapacitetChange = e => {
    this.setState({
      kapacitet: e.target
    });
  };

  onNapomenaChange = e => {
    this.setState({
      napomena: e.target
    });
  };
   state = { ispit: {} };*/

  async componentDidMount() {
    // vratit ce ispit kad se uradi backend
    const { ispitID } = this.state.idIspit;
    const ispit = (await axios.get(`http://si2019charlie.herokuapp.com/ispit/${ispitID}`))
      .data;
    console.log(ispit);
    this.setState({ ispit });
  }

  render() {
    const {
      rokPrijave,
      termin,
      sale,
      vrijemeTrajanja,
      kapacitet,
      napomena
    } = this.state.ispit;
   
    return (
      <div class="container-fluid" style={{marginTop: "30px", textAlign: "left"}}>    
        
            <div style={{textAlign: "left"}}>  
              <label htmlFor="rokPrijave" class="col-form-label col-form-label-lg">Rok prijave: </label> 
            </div>
              <DatePicker
              id="rokPrijaveUredi"
              selected={this.state.rokPrijave}
              
              value={rokPrijave} 
              />  
              <div style={{textAlign: "left"}}>  
              <label htmlFor="sala" class="col-form-label col-form-label-lg">Sala:</label>
              </div>
              <select
                multiple
                class="custom-select"
                id="salaUredi"    
               
                value={sale}            
                            
              >
                <option>VA</option>
                <option>MA</option>
                <option>S0</option>
                <option>S1</option>
                <option>S3</option>
              </select>
              <div style={{textAlign: "left"}}>  
              <label htmlFor="termin" class="col-form-label col-form-label-lg">Termin: </label> 
            </div>
              <DatePicker
                id="terminUredi"                        
                selected={this.state.termin}
                
                value={termin}        
              /> 
              <div style={{textAlign: "left"}}>                
              <label class="col-form-label col-form-label-lg" htmlFor="vrijemeTrajanja">Vrijeme trajanja: </label> </div>
              <input type="number" className="form-control" id="vrijemeTUredi"
                value={vrijemeTrajanja} />
              <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="Kapacitet">Kapacitet: </label> </div>
              <input type="number" className="form-control" id="kapacitetUredi"
                value={kapacitet}/>
              <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="Kapacitet">Napomena: </label> </div>
              
           <textarea 
                    
                    className="form-control"
                    id="ispitnaNapomenaUredi"
                    placeholder="Ovdje unesite napomenu..."
                    rows="15"
                   
                    value={napomena}
                   
        />
           
           

          </div>
        
    )
  }
}

export default UrediIspit
