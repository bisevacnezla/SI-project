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

   

    componentDidMount(search){
      if(search==''){
        axios.get ('https://si2019alpha.herokuapp.com/api/predmet/GetPredmeti')
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({lista: response.data});
        })
        . catch (error =>{
            console.log(error)
        })
      }
      else{
        axios.get ('https://si2019alpha.herokuapp.com/api/predmet/GetPredmet?naziv='+search)
        .then(response => {
            console.log("Lista: ", response.data);
            this.setState({lista: [response.data]});
        })
        . catch (error =>{
            console.log(error)
        })
      }
    }

    handleChange = (e) =>{
      this.setState({
        search: e.target.value
      }) 
    }

    obrisi(naziv){
        console.log(naziv);
        axios.delete("https://si2019alpha.herokuapp.com/api/predmet/deleteSubject?naziv="+naziv)
        .then(response => {
            console.log(response);    
        })
        . catch (error =>{
            console.log("Error", error)
        })
    }

    render (){
        const {lista, search}=this.state
        console.log("LISTA", lista);
        return (
          <div className="card">
            <div className="card-body">
              <br /> 
                <input type="text" className="form-control col-md-4" value={search} onChange={this.handleChange} placeholder="Naziv predmeta"></input>  <br />
                <button className="btn btn-primary btn-block col-md-4" onClick={()=> this.componentDidMount(search)}>Pretraži</button>
              <br />
              
              <table>  
                <thead className="table table-sm table-primary">
                  <tr>
                      <th >NAZIV</th>
                      <th >ECTS</th>
                      <th >BROJ PREDAVANJA</th>
                      <th >BROJ VJEŽBI</th>
                      <th >OPIS</th>
                      <th >ID PROFESORA</th>
                      <th >ID ASISTENTA</th>
                      <th>OBRIŠI</th>
                  </tr>
                </thead>
                <tbody className="table table-sm">
                {
                    lista.length ? lista.map(list => 
                        <tr key={list.id}>
                            <th>{list.naziv}</th>
                            <th>{list.ects}</th>
                            <th>{list.brojPredavanja}</th>
                            <th>{list.brojVjezbi}</th>
                            <th>{list.opis}</th>
                            <th>{list.idProfesor}</th>
                            <th>{list.idAsistent}</th>
                            <th><button className="btn btn-primary btn-block"  onClick={()=>this.obrisi(list.naziv)}>Obriši</button></th>
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
