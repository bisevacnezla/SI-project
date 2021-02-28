import React, { Component } from 'react';
import './grupeProfesor.css';


export class body_cell extends Component {
  render() {
    var studentData=this.props.student;
    var imePrezime;
    
    var dugme;
    if(studentData)
    {
      if(!this.props.lockState)
      dugme = (<button style={minus} onClick={this.props.odjaviStudenta.bind(this)}></button>);
      else
      dugme = (<div></div>);       
      imePrezime = studentData.imePrezime;
    }
    else
    {
      dugme = (<div></div>);         
      imePrezime = "";
    }

      return (   
        <tr className="text-dark">  
          <td>
            {imePrezime}
            {dugme}
          </td> 
        </tr>        
      )
    }   
  
}

export default body_cell

const loginStudent = 
{  
  backgroundColor:"lightgreen"
}

const regularStudent = 
{

}

const stylishRed=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center',
  color: 'red'
}
const stylishCasual=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center'
}

const minus = 
{
  background:'url(./slicica_minus_prof.jpg) no-repeat',
  cursor:'pointer',
  border:'none',
  backgroundSize: '100%',
  width:'20px',
  height:'20px',
  verticalAlign: 'middle',
  marginRight:'5px',
  float:'right'  

  
}



