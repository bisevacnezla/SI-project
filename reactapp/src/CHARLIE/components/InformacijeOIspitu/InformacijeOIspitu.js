import React, { Component } from 'react'

import axios from 'axios';
import DatePicker from "react-datetime";

class InformacijeOIspitu extends Component {

  state ={ispit:{
    rokPrijave: new Date(),
    termin: new Date(),
    vrijemeTrajanja:0,
    kapacitet: 0,
    napomena: ''
  }}

  async componentDidMount() {
    // vratit ce ispit kad se uradi backend
    const {data} = await axios.get(`http://si2019charlie.herokuapp.com/ispit/${this.props.idIspit}`)
    console.log(data)
    this.setState({ ispit: data});
  }

  render() {
    return (
    <div class="container-fluid" style={{marginTop: "30px"}}>
      
            <div style={{textAlign: "left"}}>  
              <label htmlFor="rokPrijave" class="col-form-label col-form-label-lg">Rok prijave: </label> 
            </div>
              <DatePicker
                        id="rokPrijave"
                        value={this.state.ispit && this.state.ispit.rokPrijave || new Date()}
                        disabled
                
              /> 
              <div style={{textAlign: "left"}}>  
              <label htmlFor="sala" class="col-form-label col-form-label-lg">Sala:</label>
              </div>
              <select
                multiple
                class="custom-select"
                id="sala"                
                disabled               
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
                        id="termin2"                        
                        disabled        
                        value={this.state.ispit && this.state.ispit.termin || new Date()}        
              /> 
               <div style={{textAlign: "left"}}>                
              <label class="col-form-label col-form-label-lg" htmlFor="vrijemeTrajanja">Vrijeme trajanja: </label> </div>
              <input type="number" className="form-control" id="vrijemeT2" disabled value={this.state.ispit && this.state.ispit.vrijemeTrajanja || 0}/>
              <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="Kapacitet" >Kapacitet: </label> </div>
              <input type="number" className="form-control" id="kapacitet2" disabled value={this.state.ispit && this.state.ispit.kapacitet || 0}/>
              <div style={{textAlign: "left"}}>
              <label class="col-form-label col-form-label-lg" htmlFor="Kapacitet" >Napomena: </label> </div>
              
           <textarea
                    
                    className="form-control"
                    id="ispitnaNapomena2"
                    rows="15"
                    disabled
                    value={this.state.ispit && this.state.ispit.napomena}
                   
        />
          
      

      </div>)
  }
}

export default InformacijeOIspitu