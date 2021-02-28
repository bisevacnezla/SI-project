import React, {Component} from 'react'
import axios from 'axios'

class FormaProfPred extends Component {
    constructor(props) {
        super(props)
  
        this.initialState = {
          asistent: '',
          predmet: '',
          listaAsistenata: [],
          listaPredmeta: []
        }
    
        this.state = this.initialState
      }

      componentDidMount(){
        axios.get ('http://localhost:31901/api/korisnik/GetAllAssistants')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({listaAsistenata: response.data});
        })
        . catch (error =>{
            console.log(error)
        })

        axios.get ('http://localhost:31901/api/predmet/GetPredmeti')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({listaPredmeta: response.data});
        })
        . catch (error =>{
            console.log(error)
        })
      }

    onChangeAsistent = (e) => {
        var split=e.target.value.split(" - ");     
        this.setState({
          asistent: split[0]
         })  
    }

    onChangePredmet = (e) => {
        var split=e.target.value.split(" - ");     
        this.setState({
          predmet: split[0]
         })  
    }

    spoji(asistent, predmet){
        console.log(asistent,predmet);
        const json={"idUloga":asistent, "idPredmet":predmet, "godina":null, "ciklus":null, "obavezan":null}
        axios.post("http://localhost:31901/api/povezivanje/linkAssistantSubject", json)
        .then(response => {
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render() {
        const {asistent, predmet, listaAsistenata, listaPredmeta} = this.state;

        return (
          <div className="card align-items-center">
          <div className="card-body col-md-4 ">
              <p>Prikaz svih asistenata: </p><br />
                <select className="custom-select" value={asistent} onChange={this.onChangeAsistent}> 
                {
                  listaAsistenata.length ? listaAsistenata.map(list => 
                  <option key={list.idUloga}>{list.ime} {list.prezime} </option>
                  ): null
                }
                </select><br /><br />

                <p>Prikaz svih predmeta: </p><br />
                <select className="custom-select" value={predmet} onChange={this.onChangePredmet}> 
                {
                  listaPredmeta.length ? listaPredmeta.map(list => 
                  <option key={list.id}>{list.naziv}</option>
                  ): null
                }
                </select><br /><br />

                <button className="btn btn-success btn-block" onClick={()=>this.spoji(asistent,predmet)}>Dodaj</button>
                </div>
          </div>
        );
    }
}

export default FormaProfPred
