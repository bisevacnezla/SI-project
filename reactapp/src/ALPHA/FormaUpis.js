
import React, {Component} from 'react'
import axios from 'axios'

const naziviOdsjeka=["RI", "AiE", "EE", "TK"];
const opcije = naziviOdsjeka.map((naziv)=>{
 return <option>{naziv}</option>;
});

class FormaUpis extends Component {
   constructor(props) {
       super(props)
        this.initialState = {
         ime: '',
         prezime:'',
         id:'',
         ciklus: '',
         sem: '',
         odsjek: '',
         username: '',
         lista: [],
         selectedValue:'',
         search:''
       }
  
       this.state = this.initialState
     }

     componentDidMount(param){
       console.log(param);
       
       //"http://localhost:31901/api/korisnik/searchStudent?ime="+param
       axios.get ("https://si2019alpha.herokuapp.com/api/korisnik/searchStudent?ime="+param)
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
       this.setState({selectedValue: e.target.value, id: split[0], ime: split[1], prezime: split[2], username: split[3]}) 
   }

   handleChange = (e) =>{
     this.setState({
       search:e.target.value
     })
   }

     handleInputChange = (event) => {
       event.preventDefault()
       this.setState({
         [event.target.name]: event.target.value
       })
     }

//Funkcija za backend
     OnSubmit = (event) =>{
       event.preventDefault()
       const data=this.state
       console.log("Svi potrebni podaci: ", data)   
      
       const xhr = new XMLHttpRequest();
       const json = {"ciklus": this.state.ciklus, "semestar": this.state.sem, "username":this.state.username, "odsjek":this.state.odsjek}
       const body = JSON.stringify(json);

       console.log(body);
       //NOVI API CE BITI
       xhr.open('POST', 'https://si2019alpha.herokuapp.com/api/korisnik/enrollStudentToSemester', true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.onload = () => {
         if(xhr.status === 200) {
           const resp = xhr.responseText;
           alert(resp);
         }
       }
       xhr.onerror = () => {
         console.log(xhr.statusText);
         alert(xhr.responseText);
       }
       xhr.send(body);
   }

   render() {
       const { ime, prezime, id, ciklus, sem, odsjek,lista, selectedValue,search } = this.state;

       return (
         <div className="card align-items-center">
         <div className="card-body col-md-4">
           <br />
           <input type="text" className="form-control" value={search} onChange={this.handleChange} placeholder="Ime studenta"></input> <br />
           <button className="btn btn-primary btn-block" onClick={()=> this.componentDidMount(search)}>Pretraži</button>

           <br />
           <p>Prikaz studenata: </p><br />
           <select className="custom-select" value={selectedValue} onChange={this.onChange}  onClick={this.onChange}>
             {
               lista.length ? lista.map(list =>
                 <option key={list.id} value={[list.id, list.ime, list.prezime, list.username]}>{list.ime} {list.prezime}</option>
               ): null
             }
           </select><br /><br />

        
           <form  onSubmit={this.OnSubmit}>
             <label>Ime studenta </label>
             <input className="form-control" type="text" name="name"  readOnly value={ime}/><br />

             <label>Prezime studenta </label>
             <input className="form-control" type="text" name="name"  readOnly value={prezime}/><br />

             <label>Ciklus</label>
             <input className="form-control" type="number" name="ciklus" value={ciklus} onChange={this.handleInputChange} /><br />
            
             <label>Semestar</label>
             <input className="form-control" type="number" name="sem" value={sem} onChange={this.handleInputChange} /><br />

             <label>Odsjek</label><br />
             <select className="custom-select" name="odsjek" value={odsjek} onChange={this.handleInputChange}>{opcije}</select><br /><br />
            
             <input type="submit" value="Upiši" className="btn btn-primary btn-block" />
            
           </form>
         </div>
         </div>
       );
   }
}

export default FormaUpis


/*<input className="form-control" type="number" name="odsjek" value={odsjek} onChange={this.handleInputChange} /><br />*/
 
/*<label>ID</label>
  <input className="form-control" type="text" name="name"  readOnly value={id}/><br />*/