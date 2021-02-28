import React, { Component } from 'react';
import { Alert } from "reactstrap";
import './OdabirDana.css';
 
var siva = '#282c34';
var zelena= '#30e20c';
class OdabirDana extends Component {
  constructor(){
    super()
    this.state={
      prikaziMe: false,
      prikaziMe2: false,
      prikaziMe3: false,
      prikaziMe4: false,
      prikaziMe5: false,
      color: siva,
      color2:siva,
      color3: siva,
      color4: siva,
      color5: siva
    }
  }
 
  operation(){
    this.setState({
      prikaziMe: true,
      color: zelena
    })
  }
  operation2(){
    this.setState({
      prikaziMe2:true,
      color2:zelena
    })
  }
  operation3(){
    this.setState({
      prikaziMe3:true,
      color3:zelena
    })
  }
  operation4(){
    this.setState({
      prikaziMe4:true,
      color4:zelena
    })
  }
  operation5(){
    this.setState({
      prikaziMe5:true,
      color5: zelena
    })
  }
  ponisti1(){
    alert('Uspjesno ste ponistili termine za ponedjeljak')
    this.setState({
      prikaziMe:false,
      color: siva,
    })
  }
  ponisti2(){
    alert('Uspjesno ste ponistili termine za utorak')
    this.setState({
      prikaziMe2:false,
      color2: siva,
    })
  }
  ponisti3(){
    alert('Uspjesno ste ponistili termine za srijedu')
    this.setState({
      prikaziMe3:false,
      color3: siva,
    })
  }
  ponisti4(){
    alert('Uspjesno ste ponistili termine za cetvrtak')
    this.setState({
      prikaziMe4: false,
      color4:siva,
    })
  }
  ponisti5(){
    alert('Uspjesno ste ponistili termine za petak')
    this.setState({
      prikaziMe5:false,
      color5:siva,
    })
  }
  unesi(){
    alert('Uspjesno ste spremili promjene')
  }
   render() {
     let boja=this.state.color ;
     let boja2=this.state.color2;
     let boja3=this.state.color3;
     let boja4=this.state.color4;
     let boja5=this.state.color5;
    return (
      <div className="App">
        <header className="App-header">
          <h1> Klikom na odgovarajući pravougaonik odaberite dane u kojima imate slobodne termine.</h1>
        </header>
        <div id = "pon" onClick={()=>this.operation()} style={{backgroundColor: boja}}><h1>PONEDJELJAK</h1></div>
        <div id = "uto" onClick={()=>this.operation2()} style={{backgroundColor: boja2}}><h1>UTORAK</h1></div>
        <div id = "sri" onClick={()=>this.operation3()} style={{backgroundColor: boja3}}><h1>SRIJEDA</h1></div>
        <div id = "cet" onClick={()=>this.operation4()} style={{backgroundColor: boja4}}><h1>ČETVRTAK</h1></div>
        <div id = "pet" onClick={()=>this.operation5()} style={{backgroundColor: boja5}}><h1>PETAK</h1></div>
        <div id="dugmad">
        <div id="polovina">
        {this.state.prikaziMe?
        <div id="id1">
        <button className="App-edit" id = "b1"  ><h2>Unesite termin/e</h2></button>
        <button className="App-ponisti" id = "b6" onClick={()=>this.ponisti1()}><h2>Poništite dan</h2></button>
        </div>
                :null
        }
         {this.state.prikaziMe2?
         <div id="id2">
        <button className="App-edit" id = "b2" ><h2>Unesite termin/e</h2></button>
        <button className="App-ponisti" id = "b7" onClick={()=>this.ponisti2()}><h2>Poništite dan</h2></button>
        </div>
        :null
        }
        </div>
        <div id="polovina2">
        <div id="cetvrtina">
        {this.state.prikaziMe3?
        <div id="id3">
        <button className="App-edit" id = "b3"><h2>Unesite termin/e</h2></button>
        <button className="App-ponisti" id = "b8" onClick={()=>this.ponisti3()}><h2>Poništite dan</h2></button>
        </div>
        :null
        }
        {this.state.prikaziMe4?
        <div id="id4">
        <button className="App-edit" id = "b4"><h2>Unesite termin/e</h2></button>
        <button className="App-ponisti" id = "b9" onClick={()=>this.ponisti4()}><h2>Poništite dan</h2></button>
        </div>
        :null
        }
        </div>
        <div id="cetvrtina2">
        {this.state.prikaziMe5?
        <div id="id5">
        <button className="App-edit" id = "b5"><h2>Unesite termin/e</h2></button>
        <button className="App-ponisti" id = "b10" onClick={()=>this.ponisti5()}><h2>Poništite dan</h2></button>
        </div>
        :null
        }
        </div>
        </div>
        </div>
        <div id="gen">
        <button id = "generisi" onClick={()=>this.unesi()}><h1>Generiši raspored</h1></button>
        </div>
      </div>
    );
  }
}
export default OdabirDana;