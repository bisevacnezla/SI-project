import React, {Component} from 'react';

class DugmeZaSort extends Component{
    constructor(props) {
        super(props);
        this.state={
            select_1: '1',
            select_2: '1'
        }
      }
    
    handleSelectPrvi = (event) => {
        this.setState({select_1:event.target.value});
    }

    handleSelectDrugi = (event) => {
        this.setState({select_2:event.target.value});
    }
    
    Sortiraj = () =>{
        this.props.sortirajNiz(this.state.select_1, this.state.select_2);
    }
    
    render() {

          return(
            <form className="d-inline-flex justify-content-end p-2 bd-highlight">
                <select value={this.state.select_1} onChange={this.handleSelectPrvi} className="form-control" id='sr' >
                    <option value='1'>Manji -> veci</option>
                    <option value='2'>Veci -> manji</option>
                </select>
  
                <select value={this.state.select_2} onChange={this.handleSelectDrugi} className="form-control" id='ss' >
                    <option value='1'>A-Z</option>
                    <option value='2'>Datum</option>
                    <option value='3'>Komentari</option>
                </select>
  
                <input className="btn btn-primary" type='button' value='sortiraj' 
                    onClick={this.Sortiraj}></input> 
            </form>
          );
    }
    

}

export default DugmeZaSort;