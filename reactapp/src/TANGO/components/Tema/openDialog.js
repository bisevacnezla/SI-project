import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";

class OpenDialog extends Component {
  
  
  handleDelete = evt => {
     console.log("http://localhost:31919/deleteTheme/"+this.props.id);
  	evt.preventDefault()
    fetch("http://localhost:31919/deleteTheme/"+this.props.id, {
      method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
  window.location.reload();
    return false;
  };

  render() { 
      console.log(this.props)
    return ( 
      <Modal show={this.props.show} onHide={this.props.close}>
      <Modal.Header closeButton>
        <Modal.Title> Poruka </Modal.Title>
      </Modal.Header>
      <Modal.Body> Da li želite izbrisati Temu {this.props.naziv}
      </Modal.Body>
      <Modal.Footer>
      <button type="button" class="btn btn-primary" onClick={this.handleDelete}>Obriši</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.props.close}>Povratak</button>
        
      </Modal.Footer>
    </Modal>
      
     );
  }
}
 
export default OpenDialog;