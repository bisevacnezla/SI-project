import React, {Component} from 'react'
import axios from 'axios'
import { postRequest } from './actions/post'
import { ENGINE_METHOD_DIGESTS } from 'constants';

class Forma extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lista: [],
            selectedValue: '--Izaberite odsjek--',
            idOdsjek: '',
            naziv: ''
        }
       
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

    onChange = (e) => {
        var split=e.target.value.split(",");     
        this.setState({
          selectedValue: split[1], idOdsjek: split[0], naziv: split[1]
          
         })  
         console.log(this.selectedValue)
    }


      handleChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      promijeni(selectedValue) {
        if(selectedValue!="--Izaberite odsjek--" && selectedValue!=undefined) {
        const data=this.state
        console.log("Svi potrebni podaci: ", data)
        const body =
        {  "idOdsjek": data.idOdsjek,
            "naziv": data.naziv
            
        };
        
        const xhr = new XMLHttpRequest();
        
        const body1=JSON.stringify(body);
        console.log("Body1: ", body1);
        
        xhr.open('POST','https://si2019alpha.herokuapp.com/api/odsjek/PromijeniOdsjek', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if(xhr.status === 200) {
            
            const resp = xhr.responseText;
           
          }
        }
        xhr.onerror = () => {
          console.log(xhr.statusText);
          alert("Došlo je do greške. Pokušajte ponovo.")
        }
        xhr.send(body1);   
        alert("Uspješno izvršene izmjene!")
      }
      else {
        alert("Izaberite odsjek!")
      }
      
      }
      obrisi(naziv){
        const json={naziv};
        console.log(naziv);
        axios.delete("https://si2019alpha.herokuapp.com/api/odsjek/DeleteOdsjek?naziv="+ naziv)
        .then(response=>{
          alert("Uspješno obrisan odsjek!")
        })
        .catch(error=>{
          console.log(error)
          alert("Došlo je do greške. Pokušajte ponovo.")
        })
      }
     
     

    render() {
        const { idOdsjek, naziv, lista, selectedValue } = this.state;
       
        return (
          <div className="card align-items-center">
          <div className="card-body  col-md-4">
            <br />
                <p>Odaberite odsjek: </p><br />
                <select className="custom-select"  onChange={this.onChange}> 
                <option >--Izaberite odsjek--</option>
                {
                 
                  lista.length ? lista.map(list => 
                  
                  <option key={list.idOdsjek} value={[list.idOdsjek, list.naziv]}> {list.naziv} </option>
                
                  ): null
                }
                </select><br /><br />
                
                <br />
             
            <form  onSubmit={this.handleSubmit}>
            

              <label>Naziv </label>
              <input  className="form-control" type="text" name="naziv" value={naziv} onChange={this.handleChange} /><br />
              

              
              <button className="btn btn-primary btn-block" onClick={()=>this.promijeni(selectedValue)}>Spremi izmjene</button>
              <button className="btn btn-primary btn-block" onClick={()=>this.obrisi(selectedValue)}>Obrisi odsjek</button>
             </form><br />

             
             </div>
    </div>
        );
    }
}

export default Forma

/*<label className="font-weight-bold">ID odsjeka</label>
  <input className="form-control font-weight-bold" readOnly value={idOdsjek} /> <br />*/