import React, {Component} from 'react'

class FormaProfPred extends Component {
    constructor(props) {
        super(props)
  
        this.initialState = {
          profesor: '',
          predmet: ''
        }
    
        this.state = this.initialState
      }

      handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

//Funkcija za backend
      OnSubmit = (event) =>{
        event.preventDefault()
        const data=this.state
        console.log("Svi potrebni podaci: ", data)
      }
     

    render() {
        const { profesor, predmet } = this.state;

        return (
          <div className="col-md-4">
          
            <form  onSubmit={this.OnSubmit} className="container-fluid">
              <label>Odaberite profesora </label>
              <select className="form-control"  name="profesor" value={profesor} onChange={this.handleInputChange}> </select>
              <br />
              
              <label>Odaberite predmet </label>
              <select className="form-control"  name="predmet" value={predmet} onChange={this.handleInputChange} > </select>
              <br />

        
              
              <input type="submit" value="Dodaj" className="btn btn-success btn-block" />
            </form>
          </div>
        );
    }
}

export default FormaProfPred
