import React, { Component, Fragment } from 'react';
import { Form, Label } from 'reactstrap';
import './bootstrapflatly.css';
import BrisanjeClanova from './BrisanjeClanovaGrupe';


class IzborVodje extends Component {
    constructor(props){
        super(props);
        this.state={
          forma:"null"
        }
        this.sacuvajVodju=this.sacuvajVodju.bind(this);
        this.brisanjeClanova=this.brisanjeClanova.bind(this);
    }

    kreirajFormu() {
        
        return (
            <div className="card" style={{float: "left", width:"100%"}}> 
                <div class="card-body" id="formaIzbor">
                <h4 class="card-title" style={{textAlign:"left"}}>Izbor vodje </h4>
                <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Unesite vodju za odabranu grupu</h6>
        <br/>
                <label class="col-form-label" style={{float:"left"}}>Projektna grupa</label>
                            <div class="select-option">
                                    <select  className="form-control" id="selectGrupe"  >
                                        <option  className="list-group-item" value="" selected="selected">Odaberite grupu</option>
                                        <option className="list-group-item" value="grupa1" >Grupa 1</option>
                                        <option className="list-group-item" value="grupa2" >Grupa 2</option>
                                        <option className="list-group-item" value="grupa3" >Grupa 3</option>
                                    </select>

                                    
                            </div>
                           
                        <br/>
                            <label class="col-form-label" for="name" style={{float:"left"}}>Unesite vodju za odabranu grupu:</label>
                            
                       
                           
                            <input type="text" className="form-control inputText"  style={{textAlign:"left"}}/>

                            <br/>
                            <button className="btn btn-primary" style={{float:"left", margin:"10px"}} onClick={this.brisanjeClanova}>Nazad</button>
                            <button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.sacuvajVodju}>Potvrdi </button>
                           
                       
                            
                       
                       
                </div>
            </div>
                
        );
            
      }  
      render(){
        if(this.state.forma=="null") {
          return(
            <Fragment>
                <Form>
                    
                    {this.kreirajFormu()}
                </Form>
            </Fragment>
          );
        }
        else if (this.state.forma=="brisanjeClanova") {
            return( 
                <BrisanjeClanova/>
            )
        }
      }

      sacuvajVodju() {
      /*  var ajax=new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status=="200"){
                
            }
        }
        ajax.open("POST","http://localhost:31913/services/group/selectleader",true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send();*/
        alert("Uspjesno odabran!");
      }

      brisanjeClanova() {
        this.setState({forma:"brisanjeClanova"});
      }
      
}
export default IzborVodje;
