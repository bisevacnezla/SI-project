import React, {Component} from 'react';
import Korisnik from '../Korisnik';
import OpenDialog from './openDialog';
import {Link} from 'react-router-dom';
import {IdUSER} from '../id.js';

class Tema extends Component{

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      sticky : false
        };
  }
  setSticky = evt => {
    this.setState({
      sticky: !this.state.sticky
  });
   evt.preventDefault()
   fetch("https://si2019tango.herokuapp.com/setSticky", {
     method: 'POST',  
    body: JSON.stringify({
      idTheme: this.props.tema.idTheme,
      IdUser:IdUSER, //logovan user
      sticky:  !this.state.sticky
    }),  
   headers:{
     'Content-Type': 'application/json'
   }
 }).then(res => res.json())
 .then(response => console.log('Success:', JSON.stringify(response)))
 .catch(error => console.error('Error:', error));
 window.location.reload();
   return false;
 };
  handleClose() {
    this.setState({ show: false });
    window.location.reload();
  }

  handleShow() {
   this.setState({ show: true });
  }
  //setSticky = () => {
   
//}

    render(){
      
      const {idTheme,idPredmeta, idUser,description,title, timeCreated,brojKomentara, sticky}=this.props.tema;
      this.state.sticky = sticky;
      return(
        <>
      <div className='shadow-sm p-3 mb-5 bg-light rounded' style={{ border: sticky ? "3px solid" : "" }}>
        
          <div className='naziv_teme' >
            <a className="nav-link" href={'/TANGO/Komentari/?idTheme='+ idTheme}>{title}</a>
            <button type="button" class="btn btn-primary px-1"  onClick={this.setSticky}><i class="fas fa-thumbtack" aria-hidden="true"></i></button>
          </div>
          <div className='datum_komentari'>
            <p className='brKom' >
              Br. komentara: {brojKomentara}
            </p>
            <p className='datStv'>
                {timeCreated}
            </p>
          </div> 
          <div class="d-flex flex-row-reverse p-2">
            <button id="deleteBtn" className="btn btn-link" onClick={this.handleShow.bind(this)}> Obrisi </button>
            <Link to ={{
                    pathname: '/Tango/Komentari',
                    state: { nazivTeme:{title},
                              id: {idTheme} }
                  }}>
          <a className="nav-link" href={'/TANGO/Komentari/?idTheme='+ idTheme}>Komentarisi</a>
          </Link>
            <OpenDialog key={idTheme} naziv={title} id={this.props.tema.idTheme} show={this.state.show} close={this.handleClose}/>
          </div>
      </div>
      </>
      );
    }
  }

  class Teme extends Component{
    render(){
      return(
        this.props.teme.map(TEMA => {
          if(TEMA.korisnik != undefined)
          return(
          <div className='tema'>
            <div className='slika_ime'>
              <Korisnik key={TEMA.korisnik.id} korisnik={TEMA.korisnik}/>
            </div>
            <Tema key={TEMA.idTheme} tema={TEMA}/>
          </div>
          );
        })
      );
    }
  }

export default Teme;