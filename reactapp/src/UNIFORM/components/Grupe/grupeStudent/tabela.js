import React, { Component, Fragment } from 'react'
import { CustomInput, Form, FormGroup, Label, Input, Table } from "reactstrap";
import Body_Cell from './body_cell.js';
import Header_Cell from './header_cell.js';
import axios from 'axios'; 
import SelectRedoslijed from './selectRedoslijed.js';

export class tabela extends Component {

    state = {
        prijavljeniStudentiGrupe: [

        ],
        stateStudenti:[

        ],
        kapacitet:0
      };
    
    

    prijaviStudenta = () =>
    {
        
        axios.post('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/addStudentToGroup/"+this.props.idLogovanogStudenta+"/"+this.props.grupa.idGrupaTermina).then()
        {
            console.log('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/addStudentToGroup/"+this.props.idLogovanogStudenta+"/"+this.props.grupa.idGrupaTermina)
            document.location.reload();
        };
    } 
 
    odjaviStudenta = () =>
    {
        
        axios.post('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/removeStudentFromGroup/"+this.props.idLogovanogStudenta+"/"+this.props.grupa.idGrupaTermina).then()
        {
            console.log('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/removeStudentFromGroup/"+this.props.idLogovanogStudenta+"/"+this.props.grupa.idGrupaTermina)
            document.location.reload();
        };
    }

  render() {
    var stateStudenti = [];
    var prijavljeniStudentiGrupe = [];
    if(!prijavljeniStudentiGrupe || prijavljeniStudentiGrupe.length==0)
    {
        for(var i=0;i<this.props.kapacitet;i++)
        {
            var vlasnikBool = false;
            if(this.props.login==1 && i<this.props.grupa.studenti.length)
            {
                if(this.props.grupa.studenti[i].idStudent==this.props.idLogovanogStudenta)
                vlasnikBool=true;
    
                stateStudenti.push(
                    {
                        id:this.props.grupa.studenti[i],
                        imePrezime:this.props.grupa.studenti[i].imePrezime,
                        datumPrijave:this.props.grupa.studenti[i].datumPrijave,
                        vlasnik:vlasnikBool
                    }
                )
            }
            
            prijavljeniStudentiGrupe.push(
                <Body_Cell student={this.props.grupa.studenti[i]} vlasnik={vlasnikBool}/>
            );
        }
        this.state.prijavljeniStudentiGrupe =  prijavljeniStudentiGrupe;
        this.state.stateStudenti = stateStudenti;
        this.state.kapacitet = this.props.kapacitet;
        //this.setState({kapacitet:this.props.kapacitet});    
    }
    

    var login=this.props.login;
    if(login==3)
    {
        if(this.props.kapacitet==this.props.grupa.studenti.length)
        login=4;
    }

    var text="Footer";
    var poruke=[
      "Ispišite se iz grupe",
      "Upisani ste u drugu grupu",
      "Upišite se u grupu",
      "Grupa je popunjena",
      ""
      
    ]
    var button=(<Fragment></Fragment>);
    var redoslijed=(<React.Fragment></React.Fragment>);
    var poruka="";
    if(this.props.redniBroj==0)
    redoslijed=(<SelectRedoslijed trenutniRedoslijed={this.props.trenutniRedoslijed} idPredmet={this.props.idPredmet}/>);
      
    if(!this.props.lockState)
    {
      poruka = poruke[this.props.login-1];
      if(login==1)
      button=(<button style={minus} onClick={this.odjaviStudenta.bind(this.props.redniBroj)}></button>);
      else if(login==3)
      button=(<button style={plus} onClick={this.prijaviStudenta.bind(this.props.redniBroj)}></button>); 
    }
   
    

    var stylish = stylishCasual;
    if(login==2 || login==4)
    stylish = stylishRed;

    

    return (
      <div>
      {redoslijed}
      <Table bordered className="table table-bordered text-center border-solid">
          <thead>
              <Header_Cell naziv={this.props.naziv}/>
          </thead>
          <tbody>
               {this.state.prijavljeniStudentiGrupe}
          </tbody> 
          <tfoot>
               <tr className="text-dark">        
                   <td style={stylish}>
                       {button}
                       {poruka}                       
                   </td>
                </tr>
            </tfoot>
      </Table>
      </div>
    )
  }
}
/**/
export default tabela

const tableStyle=
{    
    margin:"2.5vw",
    width:'40vw',
    overflow: 'visible'
}


const naslovStyle=
{
    textAlign: 'center'
}

const podnaslovStyle=
{
    color: 'gray'
}


const selectStyle=
{
    width: '35vw'
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
