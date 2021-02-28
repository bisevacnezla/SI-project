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
            naziv: '',
            ects: '',
            brojPredavanja: '', 
            brojVjezbi: '',
            opis: '' 
        }
       
      }

      componentDidMount  () {
        axios.get ('https://si2019alpha.herokuapp.com/api/predmet/GetPredmeti')
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
          selectedValue: split[1], id: split[0], naziv: split[1], ects:split[2], brojPredavanja:split[3], brojVjezbi:split[4], opis:split[5]
         })  
    }


      handleChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      izmjeni() {
      
        const data=this.state
        console.log("Svi potrebni podaci: ", data)
        const body =
        {  "Id": data.id,
            "naziv": data.naziv,
            "ects": data.ects,
            "brojPredavanja": data.brojPredavanja, 
            "brojVjezbi": data.brojVjezbi,
            "opis": data.opis
            
        };
        
        const xhr = new XMLHttpRequest();
        
        const body1=JSON.stringify(body);
        console.log("Body1: ", body1);
        if(data.id!="--Predmeti--" && data.id!="" ) {
        xhr.open('POST','https://si2019alpha.herokuapp.com/api/predmet/PromijeniPredmet', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if(xhr.status === 200) {
            const resp = xhr.responseText;
           
          }
        }
        xhr.onerror = () => {
          console.log(xhr.statusText);
        }
        xhr.send(body1);   
        alert("Uspješno izvršene promjene!")
        window.location.reload()
      }
      else {
        alert("Izaberite predmet!")
      }
      
      }
      obrisi(naziv, selectedValue){
        if(selectedValue!="--Predmeti--" && selectedValue!="" && selectedValue!=undefined ) {
        const json={naziv};
        console.log(naziv);
        axios.delete("https://si2019alpha.herokuapp.com/api/predmet/deleteSubject?naziv="+ selectedValue)
        .then(response=>{
          console.log(response);
        })
        .catch(error=>{
          console.log(error)
        })
        alert("Uspješno obrisan predmet!")
      }
      else {
        alert("Izaberite predmet!")
      }
      }
     
     

    render() {
        const { naziv, ects, brojPredavanja, brojVjezbi, opis, lista, selectedValue, id} = this.state;
       
        return (
          <div className="card align-items-center">
          <div className="card-body col-md-4" >
            <br />
            <br />
                <p>Izaberite predmet: </p><br />
                <select className="custom-select"  onChange={this.onChange} > 
                <option >--Predmeti-- </option>
                {
                  lista.length ? lista.map(list => 
                
                  <option key={list.id} value={[list.id, list.naziv, list.ects, list.brojPredavanja, list.brojVjezbi, list.opis]}>{list.id} - {list.naziv} </option>
                
                  ): null
                }
                </select><br /><br />
                
                <br />
             
            <form  onSubmit={this.handleSubmit}>
              <label>Naziv </label>
              <input  className="form-control" type="text" name="naziv" value={naziv} required onChange={this.handleChange} /><br />
              
              <label >Broj ECTS kredita </label>
              <input className="form-control" type="number" name="ects" required value={ects} onChange={this.handleChange}  /><br />

              <label >Broj predavanja </label>
              <input className="form-control" type="number" name="brojPredavanja" required value={brojPredavanja} onChange={this.handleChange}  /><br />

              <label >Broj vježbi </label>
              <input className="form-control" type="number" name="brojVjezbi" required value={brojVjezbi} onChange={this.handleChange}  /><br />
              <label>Opis </label>
              <input className="form-control" type="text" name="opis" required value={opis} onChange={this.handleChange} /><br />

              
              <button className="btn btn-primary btn-block" onClick={()=>this.izmjeni()}>Spremi promjene</button>
              <button className="btn btn-primary btn-block" onClick={()=>this.obrisi(naziv, selectedValue)}>Obrisi predmet</button>
             </form><br />

             
             </div>
    </div>
        );
    }
}

export default Forma

/*            <label className="font-weight-bold">ID predmeta</label>
              <input className="form-control font-weight-bold" readOnly value={id} /> <br />
*/