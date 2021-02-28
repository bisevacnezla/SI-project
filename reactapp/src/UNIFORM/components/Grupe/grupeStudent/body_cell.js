import React, { Component } from 'react';
import './grupeStudent.css';

export class body_cell extends Component {
  render() {
    var studentData=this.props.student;
    var imePrezime;
    if(studentData)
    imePrezime = studentData.imePrezime;
    else
    imePrezime = "";
    if(this.props.vlasnik)
    {
      return (  
        <tr className="text-dark">   
          <td style={loginStudent}>
            {imePrezime}
          </td>   
        </tr>      
      )
    }
    else
    {
      return (   
        <tr className="text-dark">  
          <td style={regularStudent}>
            {imePrezime}
          </td> 
        </tr>        
      )
    }   
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
