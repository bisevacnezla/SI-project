import React, {Component} from 'react';
import Korisnik from '../Korisnik';
import Modal from "react-bootstrap/Modal";
import OdgovorNaKomentar from '../OdgovorNaKomentar';
import ListaOdgovora from '../ListaOdgovora';

const userApi = 'https://si2019tango.herokuapp.com/getUser/';


class Komentar extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      user:""
    };
  }

  componentWillMount(){
    this.setState({ucitavanje:true});
    fetch(userApi+ this.props.idUser) 
      .then(response=>response.json())
      .then(user=>this.setState({user:user,ucitavanje:false}));
  }

  handleClose() {
    this.setState({ show: false });
    window.location.reload();
  }

  handleShow() {
    this.setState({ show: true });

  }
  render() {
    const {idComment,idUser, idTheme,text,timeCreated}=this.props.komentar;
    return (   
        <>
        <div>
          <div className='shadow-sm p-4 mb-2 mt-2 bg-light rounded'>
             
                <div>
                    <Korisnik key={this.state.user.idUser} korisnik={this.state.user}/>
                </div>
                
                <div>
                    <p> {text} </p> 
                </div>

                <div class="d-flex justify-content-end mr-2 ">
                    <p> {timeCreated} </p> 
                </div>          
               
              <ul class="d-flex flex-row-reverse p-2">
                <li>
                  <button className="btn btn-link" onClick={this.handleShow}>
                  Odgovori
                  </button>          
                  <OdgovorNaKomentar key={idComment} idComment={idComment} show={this.state.show} close={this.handleClose}/>
                </li>
              </ul>
        </div>          
      </div>
      <div>
         <ListaOdgovora key={idComment} idComment={idComment} idTheme = {idTheme}></ListaOdgovora>
      </div>
    </>
    );
  }       
}   

class Komentari extends Component {
 
    render(){
      return(
        this.props.komentari.map(komentar => {
          return(
            <>
          <div className='tema'>
            <Komentar key={komentar.idComment} komentar={komentar} idUser={komentar.idUser}/>
            </div>
            </>
           
          );
        })
      );
      }
}
 
export default Komentari;


