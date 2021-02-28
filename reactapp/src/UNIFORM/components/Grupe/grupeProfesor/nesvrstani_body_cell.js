import React, { Component } from 'react';
import './grupeProfesor.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '40vw'
  }
};



const MojModal = (ovaj) => {
  ovaj=ovaj.ovaj; //samo ignorisite ovo i ponasajte se u daljem dijelu da je ovaj == this znaci npr ovaj.props.termin.sala ce vam vratiti salu iz bekendaaa
  if(!ovaj.state.showModal)
    return null;
    var text='Dodaj studenta u proizvoljnu grupu';
  return(
    //ovo je citav modal, html mijenjate i tu nakon biljeske treba dodati textbox polje za unos azuriranje i brisanje biljeske
    
    <div>
            <Modal 
               isOpen={ovaj.state.showModal}
               contentLabel="Minimal Modal Example"
               style = {customStyles}
            >
            {text}
            <div></div>
              <br/>
              <br/>
              <div style={divStyle}>
              <button style={stylishLeft} className = 'btn btn-primary' onClick={ovaj.props.dodajStudentaRandom.bind(ovaj,ovaj.props.student.idStudent)}>Dodaj</button>
              <button style={stylishRight} className = 'btn btn-secondary' onClick={ovaj.handleCloseModal}>Zatvori</button>
              </div>
            </Modal>
    </div>
  );
}


export class body_cell extends Component {

  
constructor () {
  super();
  this.state = {
    showModal: false
  };

  this.handleOpenModal = this.handleOpenModal.bind(this);
  this.handleCloseModal = this.handleCloseModal.bind(this);
  this.handleChange = this.handleChange.bind(this);
  /*this.handleClick = this.handleClick.bind(this);*/
}

componentDidMount () {
  Modal.setAppElement('body');
}

handleOpenModal () {
  this.setState({ showModal: true });
}

handleCloseModal () {
  this.setState({ showModal: false });
}

handleChange(event) {
  this.setState({title: event.target.value});
}/*

handleClick(event) {
  this.setState({title: event.target.value});
  this.props.dodajRandom()





}*/




  render() {
    var studentData=this.props.student;
    var imePrezime;
    
    var dugme;
    if(studentData)
    {
      if(!this.props.lockState)
      dugme = (<button onClick = {(this.state).showModal ? null : this.handleOpenModal} style={plus} ></button>);  
      else
      dugme = (<div></div>);  
      imePrezime = studentData.imePrezime;
    }
    else
    {
      dugme = (<div></div>);         
      imePrezime = "";
    }
    var startIndex = (this.props.redniBroj+1)+". ";

      return (   
        <tr className="text-dark">  
          <td>
            <b>{startIndex}</b>
            {imePrezime}
            {dugme}
            <MojModal ovaj={this}></MojModal>
            
        
          </td> 
        </tr>        
      )
    }   
  
}

export default body_cell

const loginStudent = 
{  
  backgroundColor:"lightgreen"
}

const regularStudent = 
{

}

const stylishRed=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center',
  color: 'red'
}
const stylishCasual=
{
  borderStyle: 'dashed dashed dashed dashed',
  backgroundColor:"lemonchiffon",
  justifyContent:'center'
}

const stylishLeft=
{
    float:'left'
}
const stylishRight=
{
    float:'right'
}
const stylishCenter=
{  
  margin: '0 auto'  
}
const divStyle=
{
}

const plus = 
{
  background:'url(./slicica_plus.jpg) no-repeat',
  cursor:'pointer',
  border:'none',
  backgroundSize: '100%',
  width:'20px',
  height:'20px',
  verticalAlign: 'middle',
  marginRight:'10px',
  float:'right'    
}




