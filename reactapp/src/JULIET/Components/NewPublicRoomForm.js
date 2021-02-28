import React, { Component } from 'react'


export class NewPublicRoomForm extends Component {
    constructor(){
        super()
        this.state={
            roomName:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({ roomName:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.createPublicRoom(this.state.roomName);
        this.setState({roomName:''})
    }
  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
            <input className="input-group mb-3 juliet-message-input" style={inputStyle} onChange={this.handleChange} type='text' placeholder='Kreirajte javnu sobu' value={this.state.roomName} />
            <button id='create-room-btn' type="submit" style={{width: '30px%', height: '30px', borderRadius: '0.25rem', fontWeight: 'bold'}}>+</button>
        </form>
      </div>
    )
  }
}

const inputStyle = {
  width: '80%',
  padding: '3px 6px',
  marginRight: '5px',
  display: 'inline-block',
  borderRadius : '0.25rem',
  height: '30px',
  marginBottom: '4px',

}

export default NewPublicRoomForm
