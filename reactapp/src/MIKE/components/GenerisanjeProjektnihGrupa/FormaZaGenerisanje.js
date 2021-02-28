import React, { Component, Fragment } from 'react';
import { Form, Label } from 'reactstrap';


class GenerisiProjektnuGrupu extends Component {
    kreirajFormu() {
        return (
            <div> 
                <form class="forma" id="formaGenerisanje">

                <label for="assistent">Predmeti</label>
                            <div class="select-option">
                                    <select id="selectPredmeti" >
                                        <option value="" selected="selected">Odaberite predmet</option>
                                        <option value="Softverski inzenjering" >Softverski inzenjering</option>
                                        <option value="Vjestacka inteligencija" >Vjestacka inteligencija</option>
                                        <option value="Projektovanje informacionih sistema" >Projektovanje informacionih sistema</option>
                                        <option value="Dizajn i arhitektura softverskih sistema" >Dizajn i arhitektura softverskih sistema</option>
                                    </select>
                            </div>
                           
                        <br/>

                        <div> 
                            <label for="name">Broj studenata u grupi:</label>
                            <input  type="number" min="1" max="10" id="brojStudenata"></input>

                            <label for="name">Redoslijed:</label>
                            <br/>
                            <label>abecedno <input type="checkbox" id="checkbox"/> </label><br/>
                            <label>nasumicno <input type="checkbox"/> </label>
                            
                       
                           
                            
                            <br/>
                            <input type="submit" value="Odustani" /> 
                            <input type="submit" value="Generisi" />
                           
                           </div>
                       
                            
                       
                       
                </form>
            </div>
                
        );
            
      }  
      render(){
          return(
            <Fragment>
                <Form>
                    <label class ="headerForm" >Generisanje projektne grupe</label>
                    {this.kreirajFormu()}
                </Form>
            </Fragment>
          );
      }
}
export default GenerisiProjektnuGrupu;
