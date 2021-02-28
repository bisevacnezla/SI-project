import React, {Component} from 'react'
import axios from 'axios'

class FormaPr extends Component {
    constructor(props) {
        super(props)
        
        this.initialState = {
          lista: [],
          odsjek: 'RI',
          idUloga: '3',
          ime: '',
          prezime: '',
          datumRodjenja:'',
          JMBG:'',
          email:'',
          mjestoRodjenja:'',
          kanton: '',
          drzavljanstvo: '',
          telefon: '',
          spol:'zensko',
          imePrezimeMajke:'',
          imePrezimeOca:'',
          adresa:'',
          username: null,
          password: null,
          linkedin:'',
          website:'',
          titula:''
 
        }
    
        this.state = this.initialState
      }
      componentDidMount(){
       
        axios.get ('https://si2019alpha.herokuapp.com/api/odsjek/GetOdsjeci')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({lista: response.data});     
        })
        . catch (error =>{
            console.log(error)
        })
    }

      handleChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

//Funkcija za backend
      handleSubmit = (event) =>{
        event.preventDefault()
        const data=this.state
        console.log("Svi potrebni podaci: ", data);

        const xhr = new XMLHttpRequest();

        const body1 =
        {  "idOdsjek": data.odsjek,
        "idUloga": data.idUloga,
        "ime": data.ime,
        "prezime": data.prezime,
        "datumRodjenja":data.datumRodjenja,
        "JMBG":data.JMBG,
        "email":data.email,
        "mjestoRodjenja":data.mjestoRodjenja,
        "kanton": data.kanton,
        "drzavljanstvo": data.drzavljanstvo,
        "telefon": data.telefon,
        "spol":data.spol,
        "imePrezimeMajke":data.imePrezimeMajke,
        "imePrezimeOca":data.imePrezimeOca,
        "adresa":data.adresa,
        "username": null,
        "password": null,
        "linkedin":data.linkedin,
        "website":data.website,
        "titula":data.titula
            
        };
        const body = JSON.stringify(body1);
        console.log("Svi potrebni podaci strng: ", body);
        xhr.open('POST', 'https://si2019alpha.herokuapp.com/api/korisnik/AddNewProfessor', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if(xhr.status === 200) {
            const resp = xhr.responseText;
            alert(resp);
            window.location.reload()
          }
          else {
            alert(xhr.responseText)
          }
        }
        xhr.onerror = () => {
          console.log(xhr.statusText);
        }
        xhr.send(body); 
       
      }
     

      handleOptionChange = changeEvent => {
        this.setState({
          spol: changeEvent.target.value
        });
      };

    render() {
        const {idOdsjek, ime, prezime, datumRodjenja, JMBG, email, mjestoRodjenja, kanton, drzavljanstvo, telefon, spol, imePrezimeMajke, imePrezimeOca, adresa, website, linkedin, titula, lista } = this.state;

        return (
          <div className="card align-items-center">
          <div className="card-body col-md-4" >
            <form  onSubmit={this.handleSubmit} className="container-fluid">
              <br />
              <label >Odsjek </label>
              <select className="custom-select" name="odsjek"  onChange={this.onChange} onChange={this.handleChange}> 
               
                {
                 
                  lista.length ? lista.map(list => 
                  
                  <option key={list.idOdsjek} value={[ list.naziv]}> {list.naziv} </option>
                
                  ): null
                }
                </select><br /><br />
                
               
              <label >Ime </label>
              <input  className="form-control" type="text" name="ime" required onChange={this.handleChange} /><br />
              
              <label >Prezime </label>
              <input className="form-control" type="text" name="prezime" required onChange={this.handleChange}  /><br />
              <label >Datum rođenja </label>
              <input className="form-control " type="date" name="datumRodjenja" required onChange={this.handleChange} /><br />
              <label>JMBG </label>
              <input className="form-control " type="text" name="JMBG" required onChange={this.handleChange} /><br />
              <label >Email </label>
              <input className="form-control " type="email" name="email" required onChange={this.handleChange} /><br />
              <label >Mjesto rođenja </label>
              <input className="form-control " type="text" name="mjestoRodjenja" required onChange={this.handleChange} /><br />
              <label>Kanton </label>
              <input className="form-control " type="text" name="kanton" required onChange={this.handleChange} /><br />

              <label >Državljanstvo </label>
              <input className="form-control " type="tel" name="drzavljanstvo" required  onChange={this.handleChange} /><br />
              <label>Telefon </label>
              
              <input className="form-control " type="tel" name="telefon" required onChange={this.handleChange} /><br />

              <label className="radio-inline">Spol </label>
              <div className="custom-control custom-radio">
                <input id="1" className="custom-control-input" type="radio" value="zensko" onChange={this.handleOptionChange} checked={this.state.spol === "zensko"}/> 
                <label class="custom-control-label" for="1">Žensko</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="2" className="custom-control-input" type="radio" value="musko" onChange={this.handleOptionChange} checked={this.state.spol === "musko"}/>
                <label class="custom-control-label" for="2">Muško</label><br/><br/>
              </div>

              <label >Ime i prezime majke</label>
              <input className="form-control " type="text" name="imePrezimeMajke" required  onChange={this.handleChange}/><br />
              <label >Ime i prezime oca</label>
              <input className="form-control " type="text" name="imePrezimeOca" required onChange={this.handleChange}/><br />
              <label >Linkedin</label>
              <input className="form-control " type="text" name="linkedin" required onChange={this.handleChange}/><br /> 
              
              <label >Website</label>
              <input className="form-control " type="text" name="website" required onChange={this.handleChange}/><br />
                       
              <label>Adresa stanovanja </label>
              <input className="form-control " type="text" name="adresa" required onChange={this.handleChange} /><br />
              
              <label >Titula </label>
              <input className="form-control " type="text" name="titula" required onChange={this.handleChange} /><br />
            
              
              <input type="submit" value="Dodaj" className="btn btn-primary btn-block" />
    </form>
    </div>
    </div>
        );
    }
}

export default FormaPr