import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios'; 


export class dateTimePickerr extends Component {

  state = {
    datum: new Date(),
  }
 

    promjenaDatuma = () =>
    { 
  
      let noviDatum= new Date(this.state.datum);
      var ddNew = String(noviDatum.getDate()).padStart(2, '0');
      var mmNew = String(noviDatum.getMonth() + 1).padStart(2, '0'); //Januar je 0!
      var yyyyNew = noviDatum.getFullYear(); 
      let noviDatumm = yyyyNew + '-' + mmNew + '-' + ddNew;
      console.log(yyyyNew);
      console.log(mmNew);
      console.log(ddNew);
     

      axios.post('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/promjenaRoka/"+this.props.idPredmet+"/"+yyyyNew+"/"+mmNew+"/"+ddNew).then()
      {
        console.log('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/promjenaRoka/"+this.props.idPredmet+"/"+yyyyNew+"/"+mmNew+"/"+ddNew)
        document.location.reload();
      };
      

      
    } 
    
    onChange = datum => {   
      this.setState({ datum });

    }
   
    render() {
      if(this.props.lockState)
      return (<div></div>);


      return (
        <div style={divCenter}>
          <DateTimePicker
            onChange={this.onChange}
            value={this.state.datum}
          />
          <button style={ButtonPromjeni} onClick={this.promjenaDatuma.bind(this)} className="btn btn-primary">Promjeni rok</button>
        </div>
      );
    }

  
}

export default dateTimePickerr

const ButtonPromjeni = 
{
  marginLeft:'10vw'

}
const divCenter = 
{
  display:'flex',
  marginRight: '20vw',
  marginLeft: '25vw',
  marginTop: '0',
  marginBottom: '0',
  width:'50vw'

}
