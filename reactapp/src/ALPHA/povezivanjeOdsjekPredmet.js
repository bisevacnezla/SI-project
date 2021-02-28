import React, {Component} from 'react'
import axios from 'axios'

class FormaProfPred extends Component {
   constructor(props) {
       super(props)
        this.initialState = {
         odsjek: '',
         predmet: '',
         selectedValueO: '',
         selectedValueP: '',
         godina: '',
         semestar: '',
         ciklus: '',
         obavezan: '',
         listaOdsjeka: [],
         listaPredmeta: []
       }
  
       this.state = this.initialState
     }

     componentDidMount(){
       axios.get ('https://si2019alpha.herokuapp.com/api/odsjek/GetOdsjeci')
       .then(response => {
           console.log("Lista: ", response.data);
           this.setState({listaOdsjeka: response.data});
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

   onChangeOdsjek = (e) => {
       var split=e.target.value.split(",");  
       console.log(split[0]); 
       this.setState({
         odsjek: split[0],
         selectedValueO: e.target.value
        }) 
   }

   onChangePredmet = (e) => {
       var split=e.target.value.split(",");
       console.log(split[0]);   
       this.setState({
         predmet: split[0],
         selectedValueP: e.target.value
        }) 
   }

   spoji(par1, par2){
       const body={"idOdsjek": this.state.odsjek, "idPredmet": this.state.predmet, "godina": this.state.godina, "ciklus": this.state.ciklus, "semestar": this.state.semestar, "obavezan": this.state.obavezan}
       const json=JSON.stringify(body);
       console.log(json);

       const xhr = new XMLHttpRequest();

       xhr.open('POST', 'https://si2019alpha.herokuapp.com/api/povezivanje/SpojiOdsjekPredmet', true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.onload = () => {
         if(xhr.status === 200) {
           const resp = xhr.responseText;
           alert("Uspješno spojeni odsjek i predmet");
         }
       }
       xhr.onerror = () => {
         console.log(xhr.statusText);
       }
       xhr.send(json);
   }

   handleChange = (event) => {
     event.preventDefault()
     this.setState({
       [event.target.name]: event.target.value
     })
   }

   render() {
       const {listaOdsjeka, listaPredmeta, selectedValueO, selectedValueP, godina, semestar, ciklus, obavezan}= this.state;
       console.log(godina, semestar, ciklus, obavezan);
       return (
         <div className="card align-items-center">
         <div className="card-body col-md-3">
             <p>Prikaz svih odsjeka: </p><br />
               <select className="custom-select" value={selectedValueO} onChange={this.onChangeOdsjek} onClick={this.onChangeOdsjek}>
               {
                 listaOdsjeka.length ? listaOdsjeka.map(list =>
                 <option key={list.idOdsjek} value={[list.idOdsjek, list.naziv]}>{list.naziv}</option>
                 ): null
               }
               </select><br /><br />

               <p>Prikaz svih predmeta: </p><br />
               <select className="custom-select" value={selectedValueP} onChange={this.onChangePredmet} onClick={this.onChangePredmet}>
               {
                 listaPredmeta.length ? listaPredmeta.map(list =>
                 <option key={list.id} value={[list.id, list.naziv]}>{list.naziv}</option>
                 ): null
               }
               </select><br /><br />

               <label>Godina:</label>
               <input className="form-control" type="number" name="godina" value={godina} onChange={this.handleChange}  /><br />

               <label>Ciklus:</label>
               <input className="form-control" type="number" name="ciklus" value={ciklus} onChange={this.handleChange}  /><br />

               <label>Semestar:</label>
               <input className="form-control" type="number" name="semestar" value={semestar} onChange={this.handleChange}  /><br />

               <label>Obavezan:</label>
               <input className="form-control" type="number" name="obavezan" value={obavezan} onChange={this.handleChange}  /><br />
              
               <button className="btn btn-primary btn-block" onClick={()=>this.spoji("par", "par2")}>Dodaj</button>

          </div>
         </div>
       );
   }
}

export default FormaProfPred
