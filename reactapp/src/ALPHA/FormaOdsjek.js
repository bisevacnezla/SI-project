import React, {Component} from 'react'

class FormaOdsjek extends Component {
    constructor(props) {
        super(props)
  
        this.initialState = {
          naziv: ''
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
        
        const xhr = new XMLHttpRequest();

        const body = JSON.stringify(data);

        
        //Drugi URL
        xhr.open('POST', 'https://si2019alpha.herokuapp.com/api/odsjek/AddNewOdsjek', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if(xhr.status === 200) {
            const resp = xhr.responseText;
            alert(resp);
          }
        }
        xhr.onerror = () => {
          console.log(xhr.statusText);
        }
        xhr.send(body);  
      }
     

    render() {
        const { naziv } = this.state;

        return (
          <div className="card align-items-center">
          <div className="card-body  col-md-4">
            <form  onSubmit={this.OnSubmit} className="container-fluid">
              <label >Naziv odsjeka </label>
              <input className="form-control" type="text" name="naziv" value={naziv} onChange={this.handleInputChange} /><br />
              
              <input type="submit" value="Upiši" className="btn btn-primary btn-block" />
            </form>
            </div>
          </div>
        );
    }
}

export default FormaOdsjek
