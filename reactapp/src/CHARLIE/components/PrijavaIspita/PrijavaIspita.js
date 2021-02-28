import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IspitCard from "../SharedComponents/IspitCard";

class PrijavaIspita extends React.Component {
  state = { ispiti: [] };

  async componentDidMount() {
    //kad se uradi backend otkomentarisati..
    const ispiti = await axios.get("http://si2019charlie.herokuapp.com/ispiti");
    //Filter po predmetima koje slusa student
    //Za svaki entry nadji ime predmeta na osnovu id-a
    this.setState({ ispiti: ispiti.data });
  }

  render() {
    return (
      <div class="container-fluid" style={{marginTop: "30px"}}>
      <h2 style={{marginBottom: "30px"}}>Prijava ispita</h2>
        <div id="zaCharlijeveKartice" style={{display: "inherit"}}>
        <div id="vrsteIspita" style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyItems: "space-evenly",
          flexWrap: "wrap"
        }}>
        <IspitCard ispiti={this.state.ispiti} tipIspita="Prvi parcijalni ispit"/>
          {/*<IspitCard ispiti={this.state.ispiti} tipIspita="I parcijalni ispit"/>*/}
          <IspitCard ispiti={this.state.ispiti} tipIspita="Drugi parcijalni ispit"/>
          <IspitCard ispiti={this.state.ispiti} tipIspita="Usmeni ispit" id="usmeniIspiti" />
          <IspitCard ispiti={this.state.ispiti} tipIspita="Integralni ispit" id="integralniIspit" style={{marginTop: "20px"}} />
          <IspitCard ispiti={this.state.ispiti} tipIspita="Uvid u radove" id="uvidURadove" style={{marginTop: "20px"}} />
        </div>
        <div class="col" style={{textAlign: "center", marginTop: "20px"}}>
        <button
          type="button"
          id="prijavljeniIspiti"
          className="btn btn-primary"
          onClick={() => this.props.onChangeActiveId(4)}
          
        >
          Prijavljeni ispiti
        </button></div></div>
      </div>
    );
  }
}

export default PrijavaIspita;

