import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import {IdUSER} from '../id.js';

class OdgovoriNaKomentar extends Component {
  
  constructor() {
    super();
    this.state = {
      autor: "",
      komentar: "",
     
    };
  }

  handleOdgovorChange = evt => {
    this.setState({
      komentar: evt.target.value
    });
  }
 
  handleUnesi = evt => {
    if (!this.MozeBitiUneseno()) {
      evt.preventDefault();
      return;
    }
    const { autor, komentar } = this.state; 
    const com = this.props.idComment;  
  	evt.preventDefault()
    fetch("https://si2019tango.herokuapp.com/addReply", {
      method: 'POST',  
      body: JSON.stringify({
      idComment: com,
      idUser: IdUSER,
      text: komentar,
      timeCreated: Date.now()
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

    MozeBitiUneseno() {
      const { autor, komentar } = this.state;
      return (
        komentar.length > 0
      );
    }

  render() { 
    return ( 
      <Modal show={this.props.show} onHide={this.props.close}>
      <Modal.Header closeButton>
        <Modal.Title> Odgovor </Modal.Title>
      </Modal.Header>
      <Modal.Body> <textarea 
                    value={this.state.komentar}  
                    onChange={this.handleOdgovorChange} 
                    class="form-control">
                    </textarea>
      </Modal.Body>
      <Modal.Footer>
      <button type="button" class="btn btn-primary" onClick={this.handleUnesi}>Spasi Promjene</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.props.close}>Povratak</button>
      </Modal.Footer>
    </Modal>
      
     );
  }
}
 
export default OdgovoriNaKomentar;