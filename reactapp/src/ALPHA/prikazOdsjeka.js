import React, {Component} from 'react'
import axios from 'axios'


class prikazOdsjeka extends Component{
    constructor(props) {
        super(props)

        this.state = {
          lista: [], 
          search: ''
        }
    }

    componentDidMount(search){
        if(search==''){
            axios.get ('https://si2019alpha.herokuapp.com/api/odsjek/GetOdsjeci')
            .then(response => {
                console.log("Lista: ", response.data);
                this.setState({lista: response.data});
            })
            . catch (error =>{
                console.log(error)
            })
        }
        else{
            axios.get ('https://si2019alpha.herokuapp.com/api/odsjek/GetOdsjek?naziv='+search)
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
        axios.delete("https://si2019alpha.herokuapp.com/api/odsjek/DeleteOdsjek?naziv="+naziv)
        .then(response => {
            console.log(response);    
        })
        . catch (error =>{
            console.log("Error", error)
        })
    }

    render (){
        const {lista, search}=this.state
        console.log("l",lista);
        return (
            <div className="card">
            <div className="card-body col-md-7">
                <br /> 
                    <input type="text" className="form-control col-md-5" value={search} onChange={this.handleChange} placeholder="Naziv"></input>  <br />
                    <button className="btn btn-primary btn-block col-md-5" onClick={()=> this.componentDidMount(search)}>Pretraži</button>
                <br />
                

                <table >
                    <thead className="table table-sm table-primary">
                        <tr>
                            <th>NAZIV</th>
                            <th>OBRIŠI</th>
                        </tr>
                    </thead>
                    <tbody className="table table-sm ">
                        {
                            lista.length ? lista.map(list => 
                                <tr key={list.idOdsjek}>
                                    <th>{list.naziv}</th>
                                    <th><button className="btn btn-primary btn-block"  onClick={()=>this.obrisi(list.naziv)}>Obriši</button></th>
                                </tr>
                            ): null
                        }
                    </tbody>
                </table><br /><br />
                
            </div>
            </div>
        );
    }
}

export default prikazOdsjeka
