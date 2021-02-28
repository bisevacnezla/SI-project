import React, {Component} from 'react'

class FormaOdsjekPred extends Component {
    constructor(props) {
        super(props)
  
        this.initialState = {
          odsjek: '',
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

    render() {
        const { odsjek, predmet } = this.state;

        return (
        <div className="card align-items-center">
          <div className=" card-body col-md-2">
          
            <form  onSubmit={this.OnSubmit} className="container-fluid">
              <label className="col-md-4">Odaberite odsjek </label>
              <select className="form-control"  name="asistent" value={odsjek} onChange={this.handleInputChange}> </select>
              <br />
              
              <label className="col-md-4">Odaberite predmet </label>
              <select className="form-control"  name="predmet" value={predmet} onChange={this.handleInputChange} > </select>
              <br />

        
              
              <input type="submit" value="Dodaj" className="btn btn-success btn-block" />
            </form>
            </div>
          </div>
        );
    }

}
export default FormaOdsjekPred
