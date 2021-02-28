import React, {Component} from 'react'
import axios from 'axios'
import { postRequest } from './actions/post'

class Forma extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lista: [],
			listaOdsjeka: [],
            selectedValue: '',
            id: '',
            ime: '',
            prezime: '',
            otac: '',
            majka: '',
            jmbg: '',
            titula: '',
            datum_rodjenja: '',
            mjesto_rodjenja: '',
            kanton: '',
            drzavljanstvo: '',
            adresa: '',
            email: '',
            telefon: '',
            odsjek: '',
            linkedin: '',
            website: '',
            spol: '',
            username: ''
        }
       
      }

      componentDidMount(){
        axios.get ('https://si2019alpha.herokuapp.com/api/korisnik/getAllProfessors')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({lista: response.data});     
        })
        . catch (error =>{
            console.log(error)
        })
		
		axios.get ('https://si2019alpha.herokuapp.com/api/odsjek/GetOdsjeci')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({listaOdsjeka: response.data});     
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
          otac: split[3], 
          majka: split[4], 
          jmbg: split[5], 
          spol: split[6],
          titula: split[7], 
          datum_rodjenja: split[8], 
          mjesto_rodjenja: split[9], 
          kanton: split[10], 
          drzavljanstvo: split[11], 
          adresa: split[12], 
          email: split[13],           
          telefon: split[14],
          odsjek: split[15],
          username: split[16],
          linkedin: split[17],
          website: split[18]

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
            "odsjek": data.odsjek,
            "ime": data.ime,
            "prezime": data.prezime,
            "datumRodjenja": data.datum_rodjenja,
            "JMBG": data.jmbg,
            "email": data.email,
            "mjestoRodjenja": data.mjesto_rodjenja,
            "kanton": data.kanton,
            "drzavljanstvo": data.drzavljanstvo,
            "telefon": data.telefon,
            "spol": data.spol,
            "imePrezimeMajke": data.majka,
            "imePrezimeOca": data.otac,                        
            "adresa": data.adresa,
            "username": data.username,
            "linkedin": data.linkedin,
            "website": data.website,
            "titula": data.titula
            
            
        };
        
        const xhr = new XMLHttpRequest();
        
        const body1=JSON.stringify(body);
        console.log("Body1: ", body1);

        xhr.open('POST','https://si2019alpha.herokuapp.com/api/korisnik/updateProfessor', true);
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

      obrisi(id){
        const json={id};
        console.log(id);
        axios.delete('https://si2019alpha.herokuapp.com/api/korisnik/deleteProfessor?id='+id)
        .then(response=>{
          console.log(response);
        })
        .catch(error=>{
          console.log(error)
        })
      }
      

    render() {
        const { ime, prezime, otac, majka, jmbg, titula, datum_rodjenja, mjesto_rodjenja, kanton, drzavljanstvo, adresa, email, telefon, odsjek, username, linkedin, website, lista, selectedValue, id,listaOdsjeka} = this.state;
       
        return (
          <div className="card align-items-center">
          <div className="card-body col-md-4" >
            <br />
            <br />
                <p>Prikaz svih profesora: </p><br />
                <select className="custom-select" onChange={this.onChange}> 
                {
                  lista.length ? lista.map(list => 
                  <option key={list.id} value={[list.id, list.ime, list.prezime, list.imePrezimeOca, list.imePrezimeMajke, list.JMBG, list.spol, list.titula, list.datumRodjenja, list.mjestoRodjenja, list.kanton, list.drzavljanstvo, list.adresa, list.email, list.telefon, list.idOdsjek, list.username, list.linkedin, list.website]}>{list.ime} {list.prezime}</option>
                  ): null
                }
                </select><br /><br />
                
                <br />
             
            <form  onSubmit={this.handleSubmit}>
              <label>Ime </label>
              <input  className="form-control" type="text" name="ime" value={ime} onChange={this.handleChange} /><br />
              
              <label >Prezime </label>
              <input className="form-control" type="text" name="prezime" value={prezime} onChange={this.handleChange}  /><br />

              <label >Ime i prezime oca</label>
              <input className="form-control " type="text" name="otac" value={otac} onChange={this.handleChange}/><br />

              <label >Ime i prezime majke</label>
              <input className="form-control " type="text" name="majka" value={majka} onChange={this.handleChange}/><br />

              <label>JMBG </label>
              <input className="form-control " type="text" name="jmbg" value={jmbg} onChange={this.handleChange} /><br />

              <label >Titula </label>
              <input className="form-control " type="text" name="titula" value={titula} onChange={this.handleChange} /><br />
              
              <label >Datum rođenja </label>
              <input className="form-control " type="date" name="datum_rodjenja" value={datum_rodjenja} onChange={this.handleChange} /><br />
              
              <label >Mjesto rođenja </label>
              <input className="form-control " type="text" name="mjesto" value={mjesto_rodjenja} onChange={this.handleChange} /><br />
              
              <label>Kanton </label>
              <input className="form-control " type="text" name="kanton" value={kanton} onChange={this.handleChange} /><br />

              <label >Državljanstvo </label>
              <input className="form-control " type="tel" name="drzavljanstvo" value={drzavljanstvo} onChange={this.handleChange} /><br />
              
              <label>Adresa stanovanja </label>
              <input className="form-control " type="text" name="adresa" value={adresa} onChange={this.handleChange} /><br />
              
              <label >Email </label>
              <input className="form-control " type="email" name="email" value={email} onChange={this.handleChange} /><br />              
              
              <label>Telefon </label>
              <input className="form-control " type="tel" name="telefon" value={telefon} onChange={this.handleChange} /><br />
			  
			  <label >Odsjek </label>
              <select className="custom-select" name="odsjek" onChange={this.onChange} onChange={this.handleChange}> 
               
                {
                 
                  listaOdsjeka.length ? listaOdsjeka.map(list => 
                  
                  <option key={list.idOdsjek} value={[ list.naziv]}> {list.naziv} </option>
                
                  ): null
                }
                </select><br /><br />


              <label>Username </label>
              <input className="form-control " type="text" name="username" value={username} onChange={this.handleChange} /><br />

              <label>Linkedin </label>
              <input className="form-control " type="text" name="linkedin" value={linkedin} onChange={this.handleChange} /><br />

              <label>Website </label>
              <input className="form-control " type="text" name="website" value={website} onChange={this.handleChange} /><br />
              
              <input type="submit" value="Uredi" className="btn btn-primary btn-block" />
             </form><br />
              <button className="btn btn-primary btn-block" onClick={()=>this.obrisi(id)}>Obrisi</button>

             
              </div>
    </div>
        );
    }
}

export default Forma

/*<label className="font-weight-bold">ID profesora</label>
  <input className="form-control font-weight-bold" readOnly value={id} /> <br />*/