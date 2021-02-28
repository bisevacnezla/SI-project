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
        axios.get ('https://si2019alpha.herokuapp.com/api/korisnik/getAllAssistants')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({listaAsistenata: response.data});
        })
        . catch (error =>{
            console.log(error)
        })

        axios.get ('https://si2019alpha.herokuapp.com/api/predmet/GetPredmeti')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({listaPredmeta: response.data});
        })
        . catch (error =>{
            console.log(error)
        })
      }

    onChangeAsistent = (e) => {
        var split=e.target.value.split(",");     
        this.setState({
          asistent: split[0]
         })  
    }

    onChangePredmet = (e) => {
        var split=e.target.value.split(",");     
        this.setState({
          predmet: split[0]
         })  
    }

    spoji(asistent, predmet){
        console.log(asistent,predmet);
        const json={"idAsistent":asistent, "idPredmet":predmet}
        axios.post("https://si2019alpha.herokuapp.com/api/povezivanje/linkAssistantSubject", json)
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
        <div className="card-body  col-md-4">
              <p>Prikaz svih asistenata: </p><br />
                <select className="custom-select"  onChange={this.onChangeAsistent} onClick={this.onChangeAsistent}> 
                {
                  listaAsistenata.length ? listaAsistenata.map(list => 
                  <option key={list.id} value={[list.id]}>{list.ime} {list.prezime}</option>
                  ): null
                }
                </select><br /><br />

                <p>Prikaz svih predmeta: </p><br />
                <select className="custom-select"  onChange={this.onChangePredmet} onClick={this.onChangePredmet}> 
                {
                  listaPredmeta.length ? listaPredmeta.map(list => 
                  <option key={list.id} value={list.id}>{list.naziv}</option>
                  ): null
                }
                </select><br /><br />

                <button className="btn btn-primary btn-block" onClick={()=>this.spoji(asistent,predmet)}>Dodaj</button>

          </div>
          </div>
        );
    }
}

export default FormaProfPred