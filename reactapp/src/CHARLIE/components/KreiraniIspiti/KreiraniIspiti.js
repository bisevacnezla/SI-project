import React from 'react'
import ModalUredi from "../SharedComponents/ModalUredi";
import Modal3 from "../SharedComponents/Modal3";
import Modal2 from "../SharedComponents/Modal2";
import axios from 'axios'
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';


import "../SharedComponents/tabeleCharlie.css";
import { FormGroup, Table } from "reactstrap";
import PregledStudenata from "../PregledStudenata";
import UrediIspit from "../UrediIspit";

class KreiraniIspiti extends React.Component{
  constructor (...args) {
    super(...args);

    this.state = {
      ispiti: [
        {
          idIspit: '',
          idPredmet: '',
          tipIspita: '',
          termin: ''
        }
      ],

      modalShow: false,
      isEmptyState: false,
      modalUredi: false
    };
}



toggleModal = (idIspit) => {
  this.setState({
    modalShow: !this.state.modalShow,
    idIspit: idIspit
  });
}

togglePregled = (idIspit) => {
  this.setState({
    isEmptyState: !this.state.isEmptyState,
    idIspit: idIspit
  });
}

toggleUredi = (idIspit) => {
  this.setState({
    modaUredi: !this.state.modalUredi,
    idIspit: idIspit
  });
}

obrisiIspit = () => {
  this.setState({ ispiti: this.state.ispiti.filter(ispit => ispit.idIspit !== this.state.idIspit) });
  this.setState({
    modalShow: !this.state.modalShow
  });
}

saveState = (type, state, idIspit) => {
  switch (type) {
      case "modalShow":
          this.setState({
              modalShow: state,
              idIspit: idIspit
          });
          break;
      case "modalUredi":
            this.setState({
                modalUredi: state,
                idIspit: idIspit
            });
          break;
          case "isEmptyState":
            this.setState({
              isEmptyState: state,
                idIspit: idIspit
            });
            break;
      default:
          break;
  }
}


state = {response:[]}

  async componentDidMount() {
    const idKorisnika = window.localStorage.getItem('id')
    const ispiti = await axios.get(`http://si2019charlie.herokuapp.com/kreiraniIspiti/${idKorisnika}`);
    //Za svaki entry nadji ime predmeta na osnovu id-a
    console.log(ispiti);
    this.setState({ ispiti: ispiti.data });
  } 

  renderIspiti = () => {
    return this.state.ispiti.map(el => (
      <tr>
        <td class="tabtip1">{el.idPredmet}</td>
        <td class="tabtip1">{el.tipIspita}</td>
        <td class="tabtip1">{new Date(el.termin).toUTCString()}</td>
        <td  class="tabtip1">

        <button
              type="button"
              id="btnStud"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
              onClick={() => this.togglePregled(el.idIspit)}
            >
              Studenti
            </button>
            <br />
    
         

            <button  
              type="button"            
              id="btnUredi"
              class="btn btn-link"
              style={{ marginRight: "5px", marginTop: "10px" }}
              onClick={() => this.setState({ modalUredi: true, idIspit: el.idIspit })}
            >
              Uredi
            </button>


            <button
              type="button"

              id="btnIzbrisi"
              className="btn btn-danger"
              style={{marginTop: "10px"}}
              onClick={() => this.toggleModal(el.idIspit)}

            >
              Izbriši
            </button>
        </td>
      </tr>
    ));
  };

  render(){
    const { ispiti } = this.state;
   
    return(
      
<div class="container-fluid" style={{marginTop: "30px"}}>
        <h2 style={{marginBottom: "30px"}}>Kreirani ispiti</h2>

<div>
<FormGroup className="px-4" style={{marginTop: "20px"}}>
          <Table className="table table-bordered text-center bg-active border-solid">
            <thead>
              <tr className="bg-primary text-light">
                <th class="tabtip">Predmet</th>
                <th class="tabtip">Tip ispita</th>
                <th class="tabtip">Datum ispita</th>
                <th class="tabtip" />
              </tr>
            </thead>
            <tbody>{this.renderIspiti()}</tbody>
          </Table>
          </FormGroup> 
 
 
 

        <br />

        </div>
        <Modal2
                    saveState={this.saveState}
                    show={this.state.modalShow}
                    naslovModala="Jeste li sigurni da želite obrisati ispit?"
                    obrisiIspit={this.state}
                    potvrdiBtnCharlie="Potvrdi"
                    onConfirm={
                      this.obrisiIspit
                    }
                   onClose={this.toggleModal}

          />
          <ModalUredi
                    saveState={this.saveState}
                    show={this.state.modalUredi}
                    idIspit={this.state.idIspit}
                    naslovModala="Uredi ispit"
                    tijeloModala={<UrediIspit idIspit={this.state.idIspit}/>}
                    onClose={this.toggleUredi}
          />

      <Modal3
                    saveState={this.saveState}
                    show={this.state.isEmptyState}
                    naslovModala="Pregled studenata"
                    tijeloModala={<PregledStudenata />}
                    onClose={this.togglePregled}

          />
        </div>
    )
  }
}

export default KreiraniIspiti