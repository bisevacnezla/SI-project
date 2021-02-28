import React, { Component } from 'react';
import './grupeProfesor.css';
import plusSlicica from './slicica_plus.jpg';
import minusSlicica from './slicica_minus.jpg';

export class footer_cell extends Component {

  

  render() {
    var text="Footer";
    var poruka = this.props.poruka;
    var stylish = this.props.stylish;
    var button;
    

    if(!this.props.lockState)
    button=(<button style={buttonIzbrisi} className="btn btn-danger" onClick={this.props.izbrisiGrupu.bind(this)}>Izbrisi grupu</button>);
    else
    button=(<div></div>);

    
    return (
      
      <tr className="text-dark">   
      <td>         
          {button}
      </td>
      </tr>     
    )
  }
}

export default footer_cell

const buttonIzbrisi=
{
  verticalAlign: 'middle',
  float:'right',
  marginRight:'38vw',
  width:'20vw'
}

const stylishRed=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center',
  color: 'red',
  float:'right',
  marginRight:'2vw'
}
const stylishCasual=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center',
  float:'right',
  marginRight:'2vw'
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


