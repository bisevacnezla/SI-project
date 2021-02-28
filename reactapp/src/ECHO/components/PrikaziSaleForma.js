import React, { Component }from 'react';
import './PrikaziSaleForma.css';
import { Alert } from "reactstrap";
class PrikaziSaleForma extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sale: [],
          id: '',
          alertVisible: false,
          alertMessage: "",
          alertMessageStatus: "",
          alertColor: "success"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
    componentDidMount() {
        fetch("https://si-echo-2019.herokuapp.com/si2019/echo/sveSale")
        .then(res => res.json())
      .then(json => {
        this.setState({
          sale: json
        });
      });
      
    }

    componentDidUpdate() {
      fetch("https://si-echo-2019.herokuapp.com/si2019/echo/sveSale")
      .then(res => res.json())
      .then(json => {
      this.setState({
        sale: json
      });
    });
    }

    handleChange(e) {
        this.setState({ id: e.target.value});
    }

    toggle(x) {
    this.setState({ alertVisible: !this.state.alertVisible });
    }
    validiraj(){
      if(!this.state.id){    
        this.setState({
          alertMessage: "Nije odabrana sala za brisanje! ",
          alertMessageStatus: "Greška!",
          alertVisible: true,
          alertColor: "danger"
        });
      return false;
      }
      return true;  
    }

    handleSubmit(event) {
      if(this.validiraj()){
        this.postObrisi();
      }
    }

    postObrisi(event) {
      fetch("https://si-echo-2019.herokuapp.com/si2019/echo/obrisiSalu", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  
          id: this.state.id
        })
      }).then(
        this.setState({
          id: '',
          alertMessage: "Sala uspješno izbrisana! ",
          alertMessageStatus: "Ok!",
          alertVisible: true,
          alertColor: "success"
        })
      );
    }

  render() {
    return (
      <div id="omotacECHO">
        <div class="card" id="mojaKartica">
          <Alert
            id="alertID"
            color={this.state.alertColor}
            toggle={this.toggle.bind(this)}
            isOpen={this.state.alertVisible}
          >
            <strong> {this.state.alertMessageStatus}</strong> <br />
            {this.state.alertMessage}
          </Alert>
          <div class="card-body" id="mojaKarticaBody">
            <h4 class="card-title">Prikaz sala</h4>
            <select
              className="custom-select"
              id="naslovSelectAjla"
              onChange={this.handleChange}
            >
              <option>Odaberite salu</option>
              {this.state.sale.map(item => (
                <option value={item.id}>{item.naziv}</option>
              ))}
            </select>
            <button
              id="dugme1"
              type="button"
              className="btn btn-danger"
              onClick={this.handleSubmit}
            >
              Obriši salu
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PrikaziSaleForma;
