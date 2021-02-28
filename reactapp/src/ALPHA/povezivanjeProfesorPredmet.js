import React, {Component} from 'react'
import axios from 'axios'

class FormaProfPred extends Component {
    constructor(props) {
        super(props)
  
        this.initialState = {
          profesor: '',
          predmet: '',
          listaProfesora: [],
          listaPredmeta: []
        }
    
        this.state = this.initialState
      }

      componentDidMount(){
        axios.get ('https://si2019alpha.herokuapp.com/api/korisnik/getAllProfessors')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({listaProfesora: response.data});
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

    onChangeProfesor = (e) => {
        var split=e.target.value.split(",");     
        this.setState({
          profesor: split[0]
         })  
    }

    onChangePredmet = (e) => {
        var split=e.target.value.split(",");     
        this.setState({
          predmet: split[0]
         })  
    }

    spoji(predmet, profesor){
      console.log(predmet, profesor)
      if(profesor=='' || predmet=="" || profesor==undefined || predmet==undefined || profesor=="--Profesori--" || predmet=="--Predmeti--")
      alert("Izaberite profesora i predmet!")
      else {
        console.log(profesor,predmet);
        const json={"idPredmet":predmet, "idProfesor":profesor}
        axios.post("https://si2019alpha.herokuapp.com/api/povezivanje/linkProfessorSubject", json)
        .then(response => {
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
        alert("Uspješno dodan profesor na predmet!")
      }
    }

    render() {
        const {profesor, predmet, listaProfesora, listaPredmeta} = this.state;

        return (
          <div className="card align-items-center">
          <div className="card-body col-md-2">
            <br />
              <p>Odaberite profesora: </p><br />
                <select className="custom-select"  onChange={this.onChangeProfesor}> 
                <option>--Profesori--</option>
                {
                  listaProfesora.length ? listaProfesora.map(list => 
                  <option key={list.id} value= {[list.id, list.ime,  list.prezime]}>{list.ime}  {list.prezime}</option>
                  ): null
                }
                </select><br /><br />

                <p>Odaberite predmet: </p><br />
                <select className="custom-select"  onChange={this.onChangePredmet}> 
                <option >--Predmeti--</option>
                {
                  listaPredmeta.length ? listaPredmeta.map(list => 
                  <option key={list.id} value= {[list.id, list.naziv]}> {list.naziv}</option>
                  ): null
                }
                </select><br /><br />

                <button className="btn btn-primary btn-block" onClick={()=>this.spoji(predmet,profesor)}>Dodaj</button>
                </div>
          </div>
        );
    }
}

export default FormaProfPred