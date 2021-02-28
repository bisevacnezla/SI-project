import React, { Component } from 'react';
import '../styles/UsersList.css'
import '../styles/RoomList.css';
import { LensTwoTone } from '@material-ui/icons';

class Members extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            room_users: this.props.room_users, 
            input: '',
            joinableRooms:this.props.joinableRooms,
            rooms: this.props.rooms,
            userName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }

    handleChange(e) {
        this.setState({
            userName: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addUser(this.state.userName);
        this.setState({
            userName: ''
        })
    }

    render(){
        return(
            <div style={{width: '100%', padding: '10px 0'}}>     
                <div className="juliet-section-h" onClick={(e) => {
                        let node = document.getElementById('all-members')
                        let display = node.style.display;
                        node.style.display = display === "block" ? 'none' : "block";
                        node = document.getElementById('arrow-members');
                        let innerHTML = node.innerHTML; 
                        node.innerHTML = innerHTML === "keyboard_arrow_right" ? "keyboard_arrow_down" : "keyboard_arrow_right"
                    }}>
                    <div className="juliet-section-header"><h5>Članovi</h5></div>
                    <i id="arrow-members" class="material-icons-outlined md-14">keyboard_arrow_right</i>
                </div> 
                <ul style={{overflowX: 'hidden', height:'80%', margin: '0', display: 'none'}} id="all-members">
                <form onSubmit={this.handleSubmit} style={{width: '100%'}}>
                    <input className="input-group mb-3 juliet-message-input" type="text" style={inputStyle}
                    placeholder="Dodajte korisnika u sobu" onChange={this.handleChange} value={this.state.userName} />
                </form>
                    
                    { this.props.room_users && this.props.currentUser ? 
                        this.props.room_users.map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="juliet-user" key={index}>  
                                <div className="juliet-presence-state"> {user.presence.state === 'online' && <i class="material-icons md-12 md-online">fiber_manual_record</i> || user.presence.state === 'offline' && <i class="material-icons-outlined md-12">fiber_manual_record</i>}</div>
                                <div className="juliet-username-name">{user.name}</div>
                            </li>
                        }) : null   
                    }
                </ul>
                
            </div>
        )
    }
}   

const createRoomStyle ={
   
    gridColumn: 1/2
}

const addUserStyle = {
   
    gridColumn: 2/3
}

const inputStyle = {
    width: '100%',
    padding: '3px 6px',
    borderRadius: '5px',
    border: '0.5px solid rgb(0, 0, 0, 0.4)',
    height: '35px'

}
export default Members;