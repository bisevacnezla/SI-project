import React, { Component } from 'react';
class CreateRoom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roomName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({
            roomName: ''
        })
    }
    render() {
        return (
        // <button id='create-room-btn' type="submit">+</button>
            <form onSubmit={this.handleSubmit} className="new-room-form">
                <input className="input-group mb-3 juliet-message-input" type="text" style={inputStyle}
                placeholder="Kreirajte privatnu sobu" onChange={this.handleChange} value={this.state.roomName} />
                <button id='create-private-room-btn' type="submit" style={{width: '30px%', height: '30px', borderRadius: '0.25rem', fontWeight: 'bold'}}>+</button>
                {/* <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Create" /> */}
            </form>
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

export default CreateRoom;