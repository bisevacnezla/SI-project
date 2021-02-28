import React, {Component} from 'react'
import axios from 'axios'

class prikazAsistenta extends Component{
    constructor(props) {
        super(props)

        this.state = {
          lista: [], 
          search: ''
        }
    }

   

    componentDidMount(param){
      var xhttp = new XMLHttpRequest();
      var self = this;
      
     xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            self.setState({
            lista: JSON.parse(this.response)
          });
        }
      }
    
     if(param!='') xhttp.open("get", "https://si2019alpha.herokuapp.com/api/korisnik/searchProfessor?ime="+param, true);
     else xhttp.open("get", "https://si2019alpha.herokuapp.com/api/korisnik/getAllProfessors", true);
     
      xhttp.send();
    }

    handleChange = (e) =>{
      this.setState({
        search:e.target.value
      }) 
    }

     

    render (){
        const {lista, search}=this.state
        console.log("LISTA", lista.length);
        return (
          <div className="card">
            <div className="card-body">
              <br /> 
                <input type="text" className="form-control col-md-4" value={search} onChange={this.handleChange} placeholder="Ime i prezime"></input>  <br />
                <button className="btn btn-primary btn-block col-md-4" onClick={()=> this.componentDidMount(search)}>Pretraži</button>
              <br />
              
                
              <table>  
                <thead className="table table-sm table-primary">
                  <tr>
                      <th >IME</th>
                      <th >PREZIME</th>
                      <th >IME RODITELJA</th>
                      <th >SPOL</th>
                      <th >JMBG</th>
                      <th >DATUM ROĐENJA</th>
                      <th >MJESTO ROĐENJA</th>
                      <th >KANTON</th>
                      <th >DRŽAVLJANSTVO</th>
                      <th >EMAIL</th>
                      <th >TELEFON</th>
                      <th >USERNAME</th>
                      <th >TITULA</th>
                      <th >WEBSITE</th>
                  </tr>
                </thead>
                <tbody className="table table-sm">
                {
                    lista.length ? lista.map(list => 
                        <tr key={list.id}>
                            <th>{list.ime}</th>
                            <th>{list.prezime}</th>
                            <th>
                              {list.imePrezimeMajke} <br />
                              {list.imePrezimeOca}
                            </th>
                            <th>{list.spol}</th>
                            <th>{list.JMBG}</th>
                            <th>{list.datumRodjenja}</th>
                            <th>{list.mjestoRodjenja}</th>
                            <th>{list.kanton}</th>
                            <th>{list.drzavljanstvo}</th>
                            <th>{list.email}</th>
                            <th>{list.telefon}</th>
                            <th>{list.username}</th>
                            <th>{list.titula}</th>
                            <th>{list.website}</th>
                        </tr>)
                    : null
                }
                </tbody>
              </table><br /><br />
              
            </div>
            </div>
        );
    }
}

export default prikazAsistenta
