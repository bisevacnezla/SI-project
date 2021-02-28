import React, { Component } from "react";
import "./AppKilo.css";
import Header from "./component/header";
import MainContent from "./component/mainContent";
import Footer from "./component/footer";

class App extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    var idS=urlParams.get("idStudenta")
    ? Number(urlParams.get("idStudenta"))
    : null;
    this.state = {
    
    rendajOpet:true,
    idPredmet: urlParams.get("idPredmeta")
        ? Number(urlParams.get("idPredmeta"))
        : 1,
    idStudent: idS ,
    aktivirajDiv: (idS===null) ? 1 :5
  }
} 
  
  postaviAktivniDiv=(redniBrojDiva)=>{
    //console.log('mijenja aktivni div u '+redniBrojDiva);
this.setState({aktivirajDiv:redniBrojDiva});
if(this.state.rendajOpet===true) this.setState({rendajOpet:false});
else this.setState({rendajOpet:true});

  }

postaviIdeve=()=>{
  const urlParams = new URLSearchParams(window.location.search);
  
 this.setState({idPredmet: urlParams.get("idPredmeta")
  ? Number(urlParams.get("idPredmeta"))
  : 1});
this.setState({idStudent: urlParams.get("idStudenta")
? Number(urlParams.get("idStudenta"))
: null});
var imaLi=urlParams.get("idStudenta");
if(imaLi!==null) 
this.postaviAktivniDiv(5);
console.log('postavi idPredmet i idSTudent ima liii studenta ' +imaLi);

}

  render() {
    console.log('aktivni div' +this.state.aktivirajDiv);
    return (
      <div className="App">
        <div style={{minWidth:"100%"}}>

        <div id="mainKilo" className="row" style={{ margin: "0px", padding: "0px" }}>
        <div id="leftKilo"
        className="col-lg-2 col-md-3 col-sm-12" style={{
          backgroundColor: "#2C3E50",
          minHeight: "100%",
          padding: "0px",
          margin: "0px"
          
        }}  
        > 
        <Header podaci={this}></Header>
        </div>
        <div    id="rightKilo" 
                className="col-lg flex-grow-1 col-sm-12 col-md" style={{
                backgroundColor: "white",
                minHeight: "calc(100vh - 80px)",
                margin: "0px",
                padding: "0px"
}}>
       <MainContent podaci={this}></MainContent>
        </div>
        <Footer />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
