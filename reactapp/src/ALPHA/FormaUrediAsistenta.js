import React, {Component} from 'react'
import axios from 'axios'
import { postRequest } from './actions/post'

class Forma extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lista: [],
            selectedValue: '',
            id: '',
            ime: '',
            prezime: '',
            email: '',
            telefon: '',                        
            adresa: ''
        }
       
      }

      componentDidMount(){
        axios.get ('https://si2019alpha.herokuapp.com/api/korisnik/getAllAssistants')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({lista: response.data});     
        })
        . catch (error =>{
            console.log(error)
        })
    }

    onChange = (e) => {
        var split=e.target.value.split(",");     
        this.setState({
          selectedValue: split[1], 
          id: split[0],
          ime: split[1], 
          prezime: split[2],   
          email: split[3],           
          telefon: split[4],
          adresa: split[5]
         })  
    }


      handleChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleSubmit = (event) =>{
        event.preventDefault()
        const data=this.state
        console.log("Svi potrebni podaci: ", data)
        const body =
        {   
            "id": data.id,
            "ime": data.ime,
            "prezime": data.prezime,            
            "email": data.email,
            "telefon": data.telefon,                 
            "adresa": data.adresa           
            
        };
        
        const xhr = new XMLHttpRequest();
        
        const body1=JSON.stringify(body);
        console.log("Body1: ", body1);

        xhr.open('POST','https://si2019alpha.herokuapp.com/api/korisnik/updateAssistant', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if(xhr.status === 200) {
            const resp = xhr.responseText;
            alert(resp);
          }
        }
        xhr.onerror = () => {
          console.log(xhr.statusText);
        }
        xhr.send(body1);   
      
      }     

      promote(id){
        const json={id};
        axios.post('https://si2019alpha.herokuapp.com/api/korisnik/promoteAssistantToProfessor', json)
        .then(response=>{
          console.log(response);
        })
        .catch(error=>{
          console.log(error)
        })
      }

      obrisi(id){
        const json={id};
        console.log(id);
        axios.delete("https://si2019alpha.herokuapp.com/api/korisnik/deleteAssistant?id="+id)
        .then(response=>{
          console.log(response);
        })
        .catch(error=>{
          console.log(error)
        })
      }
      

    render() {
        const { ime, prezime, email, telefon, adresa, lista, selectedValue, id} = this.state;
       
        return (
          <div className="card align-items-center">
          <div className="card-body col-md-4" >
            <br />
                <p>Prikaz svih asistenata: </p><br />
                <select className="custom-select" onChange={this.onChange} onClick={this.onChange}> 
                {
                  lista.length ? lista.map(list => 
                  <option key={list.id} value={[list.id, list.ime, list.prezime, list.email, list.telefon, list.adresa]}>{list.ime} {list.prezime}</option>
                  ): null
                }
                </select><br /><br />
                
                <br />
             
            <form  onSubmit={this.handleSubmit}>
              <label>Ime </label>
              <input  className="form-control" type="text" name="ime" value={ime} onChange={this.handleChange} /><br />
              
              <label >Prezime </label>
              <input className="form-control" type="text" name="prezime" value={prezime} onChange={this.handleChange}  /><br />
              
              <label >Email </label>
              <input className="form-control " type="email" name="email" value={email} onChange={this.handleChange} /><br />              
              
              <label>Telefon </label>
              <input className="form-control " type="tel" name="telefon" value={telefon} onChange={this.handleChange} /><br />
              
              <label>Adresa stanovanja </label>
              <input className="form-control " type="text" name="adresa" value={adresa} onChange={this.handleChange} /><br />
              
              <input type="submit" value="Uredi" className="btn btn-primary btn-block" />
             </form><br />

             <button className="btn btn-primary btn-block" onClick={()=>this.promote(id)}>Promovisi</button>
             <button className="btn btn-primary btn-block" onClick={()=>this.obrisi(id)}>Obrisi</button>
        </div>
    </div>
        );
    }
}

export default Forma

/*              <label className="font-weight-bold">ID studenta</label>
              <input className="form-control font-weight-bold" readOnly value={id} /> <br />
*/