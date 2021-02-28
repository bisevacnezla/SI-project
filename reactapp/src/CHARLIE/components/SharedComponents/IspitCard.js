import React, { Component } from "react";
import { Link } from "react-router-dom";
import ModalInfo from "../SharedComponents/ModalInfo";
import InformacijeOIspitu from "../InformacijeOIspitu";

class IspitCard extends Component {
  constructor (...args) {
    super(...args);

    this.state = {
      modalInfo: false
    };
}
toggleInfo = (idIspit) => {
  this.setState({
    modalInfo: !this.state.modalInfo
  });
}

saveState = (type, state, idIspit) => {
  switch (type) {
      case "modalInfo":
          this.setState({
              modalInfo: state
          });
          break;
      
      default:
          break;
  }
}

  dajBoju (el) {
    var ONEDAY = 1000 * 60 * 60 * 24;
    var danas = new Date().getTime()
    var difference_ms = Math.abs(el.rokPrijave - danas);
    var brDana = Math.round(difference_ms/ONEDAY);
    
    if(brDana > 2){
      return "#98f442"
    }
  }
  renderIspit = () =>
    this.props.ispiti
      .filter(ispit => ispit.tipIspita === this.props.tipIspita)
      .map(el => (
        <li key={el.idIspit} style={{width:"100%", marginBottom:"20px"}}>
            <div style={{width:"100%", display:"flex"}}>
              <div style={{width:"10%"}}>
                <div style={{borderRadius:"50px", width:"15px", height:"15px", backgroundColor:this.dajBoju(el)}}></div>
              </div>
              <div style={{width:"45%"}} >{el.idPredmet}</div>
              <button style={{width:"45%"}} type="button" class="btn btn-primary"  onClick={() => this.setState({ modalInfo: true, idIspit: el.idIspit })}>
                        Info o ispitu
              </button>
            </div>
        </li>
      ));

  render() {
    return (
      <div
        className="card"
        style={{ width: "30%", marginRight: "10px" }}
      >
        <div className="card-body">
          <h4 className="card-title">{this.props.tipIspita}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Otvorene prijave</h6>
          <ul style={{ listStyle: "none", textAlign: "left" }}>
            {this.renderIspit(this.props.tipIspita)}
          </ul>
        </div>
        <ModalInfo
                    saveState={this.saveState}
                    show={this.state.modalInfo}
                    idIspit={this.state.idIspit}
                    naslovModala="Informacije o ispitu"
                    tijeloModala={<InformacijeOIspitu idIspit={this.state.idIspit}/>}
                    onClose={this.toggleInfo}
          />
      </div>
    );
  }
}

export default IspitCard;
