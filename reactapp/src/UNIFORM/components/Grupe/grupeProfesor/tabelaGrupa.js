import React, { Component } from 'react'
import { CustomInput, Form, FormGroup, Label, Input, Table } from "reactstrap";
import Body_Cell from './body_cell.js';
import Header_Cell from './header_cell.js';
import Footer_Cell from './footer_cell.js';
import plusSlicica from './slicica_plus.jpg';
import minusSlicica from './slicica_minus.jpg';
import DateTimePickerr from './dateTimePickerr.js'
import axios from 'axios'; 
import SelectRedoslijed from './selectRedoslijed.js';

export class tabela extends Component {

  odjaviStudenta = (index) =>
  {     
    
      axios.post('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/removeStudentFromGroup/"+this.props.grupa.studenti[index].idStudent+"/"+this.props.grupa.idGrupaTermina).then()
      {
          console.log('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/removeStudentFromGroup/"+this.props.grupa.studenti[index].idStudent+"/"+this.props.grupa.idGrupaTermina)
          document.location.reload();
      };
  } 

  izbrisiGrupu = () =>
  {        
      axios.post('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/removeGroup/"+this.props.grupa.idGrupaTermina).then()
      {
          console.log('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/removeGroup/"+this.props.grupa.idGrupaTermina)
          document.location.reload();
      };
  }


  render() {
    var prijavljeniStudentiGrupe = [];
    for(var i=0;i<this.props.kapacitet;i++)
    {
        var vlasnikBool = false;
        if(this.props.login==1 && i<this.props.grupa.studenti.length)
        {
            if(this.props.grupa.studenti[i].idStudent==this.props.idLogovanogStudenta)
            vlasnikBool=true;   
        }
        
        prijavljeniStudentiGrupe.push(
            <Body_Cell lockState={this.props.lockState} odjaviStudenta={this.odjaviStudenta.bind(this,i)} student={this.props.grupa.studenti[i]} vlasnik={vlasnikBool}/>
        );
    }   

    
    var poruka = "";
    var stylish = stylishCasual;
    if(this.props.kapacitet!=this.props.grupa.studenti.length)
    {
      stylish=stylishGreen;
      poruka="Grupa nije popunjena";
    }
    else
    {
      stylish=stylishRed;
      poruka="Grupa je popunjena";
    }   
    
    var picker=(<React.Fragment></React.Fragment>);
    var redoslijed=(<React.Fragment></React.Fragment>);
    if(this.props.redniBroj==0)
    {
      if(!this.props.lockState)
      picker=(<DateTimePickerr idPredmet={this.props.idPredmet}/>);
      redoslijed=(<SelectRedoslijed trenutniRedoslijed={this.props.trenutniRedoslijed} idPredmet={this.props.idPredmet}/>);
    }


        

    return (
      <div>
      {picker}
      {redoslijed}
      <Table bordered className="table table-bordered text-center border-solid">   
          <thead>
          <Header_Cell naziv={this.props.naziv}/>
          </thead>
          <tbody>
              
              {prijavljeniStudentiGrupe}
          </tbody> 
          <tfoot>                    
              <Footer_Cell redniBroj={this.props.redniBroj} lockState={this.props.lockState} izbrisiGrupu={this.izbrisiGrupu} stylish={stylish} poruka={poruka} redniBrojGrupe={this.props.grupa.idGrupaTermina}/>
          </tfoot>
      </Table>
      </div>
    )
  }
}

export default tabela

const tableStyle=
{    
    margin:"2.5vw",
    width:'95vw'
}
const stylishRed=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center',
  color: 'red'
}
const stylishGreen=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center',
  color: 'green'
}
const stylishCasual=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center'
}

const minus = 
{
  background:'url(./slicica_minus.jpg) no-repeat',
  cursor:'pointer',
  border:'none',
  backgroundSize: '100%',
  width:'20px',
  height:'20px',
  verticalAlign: 'middle',
  marginRight:'5px'  

  
}

const plus = 
{
  background:'url(./slicica_plus.jpg) no-repeat',
  cursor:'pointer',
  border:'none',
  backgroundSize: '100%',
  width:'20px',
  height:'20px',
  verticalAlign: 'middle',
  marginRight:'10px'    
}
