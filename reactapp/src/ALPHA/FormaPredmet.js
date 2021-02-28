import React, {Component} from 'react'

class FormaPredmet extends Component {
    constructor(props) {
        super(props)
  
        this.initialState = {
          naziv: '',
          ects: '',
          brojPredavanja: '',
          brojVjezbi: '',
          opis: ''
         
        }
    
        this.state = this.initialState
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
        if(data.brojPredavanja<0 || data.brojVjezbi<0 || data.ects<0 ) {
          alert("Broj predavanja, vježbi i ects kredita ne može biti negativan")
          window.location.reload()
          return
        }

        const xhr = new XMLHttpRequest();

        const body = JSON.stringify(data);
        xhr.open('POST', 'https://si2019alpha.herokuapp.com/api/predmet/AddNewPredmet', true);
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
        xhr.send(body); 
        alert("Uspješno dodan predmet!")
        window.location.reload()
       
      }
     

      handleOptionChange = changeEvent => {
        this.setState({
          spol: changeEvent.target.value
        });
      };

    render() {
        const { naziv, ects, brojPredavanja, brojVjezbi, opis } = this.state;

        return (
          <div className="card align-items-center">
          <div className=" card-body col-md-4" >
            <form  onSubmit={this.handleSubmit} className="container-fluid">
              <br />
              <label >Naziv predmeta</label>
              <input  className="form-control" type="text" name="naziv" required value={naziv} onChange={this.handleChange} /><br />
              
              <label >Broj ECTS kredita </label>
              <input className="form-control" type="number" name="ects" required onChange={this.handleChange}  /><br />

              <label >Broj predavanja</label>
              <input className="form-control" type="number" name="brojPredavanja" required  onChange={this.handleChange}  /><br />

             

              <label >Broj vježbi</label>
              <input className="form-control " type="number" name="brojVjezbi" required  onChange={this.handleChange}/><br />
              <label >Opis</label>
              <input className="form-control " type="text" name="opis" required  onChange={this.handleChange}/><br />

            
             
              
              
              <input type="submit" value="Dodaj" className="btn btn-primary btn-block" />
    </form>
    </div>
    </div>
        );
    }
}

export default FormaPredmet
