import React from "react";
export default class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };
      onConfirm = e => {
        this.props.onConfirm && this.props.onConfirm(e);
      };
    render() {
        
    return <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Da li ste sigurni?</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" onClick={this.onConfirm}>Potvrdi</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.onClose}>Poništi</button>
    </div>
  </div>;
  }
}