import React, { Component } from 'react';
import '../styles/UsersList.css'
import '../styles/RoomList.css';
import NewPublicRoomForm from './NewPublicRoomForm';
import CreateRoom from './CreateRoom';

class UsersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: this.props.users, 
            input: '',
            currentUser: this.props.currentUser,
            joinableRooms:this.props.joinableRooms,
            rooms: this.props.rooms,
            online: true
        }
    }

    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }
    triggerAdd(user, index) {
        if(typeof this.props.currentUser.customData === "undefined"  || !Array.isArray(this.props.currentUser.customData.favoriteUsers)) {
            this.props.currentUser.customData = {
                'favoriteUsers': [user.id]
            }
            this.props.chatkit.updateUser({
                id: this.props.currentUser.id,
                customData: {
                    favoriteUsers: [user.id]
                }
            })
        } else {
            this.props.currentUser.customData.favoriteUsers.push(user.id);
            this.props.chatkit.updateUser({
                id: this.props.currentUser.id,
                customData: {
                    favoriteUsers: this.props.currentUser.customData.favoriteUsers
                }
            })
        }

        this.setState({
            currentUser: this.props.currentUser
        })
    }

    triggerDelete(user, index){
        this.props.currentUser.customData.favoriteUsers = this.props.currentUser.customData.favoriteUsers.filter(function(el){
            return el !== user.id;
        });

        this.props.chatkit.updateUser({
            id: this.props.currentUser.id,
            customData: {
                favoriteUsers: this.props.currentUser.customData.favoriteUsers
            }
        })
        this.setState({
            currentUser: this.props.currentUser
        })
     }

    render(){
        /*console.log(this.props.users);*/
        
        const listSrc = this.props.users.filter(d => d.id.includes(this.state.input));
        const favoriteUsers = this.props.users.filter(d => this.props.currentUser.customData && this.props.currentUser.customData.favoriteUsers && this.props.currentUser.customData.favoriteUsers.includes(d.name) && d.id.includes(this.state.input));
        if(this.props.users && this.props.currentUser){
            const currentUser = this.props.currentUser;
            return(
                <div style={{height: '100%', width: '100%'}}>           
                    <input placeholder="Traži" className="juliet-user-search-input" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
                    <ul style={{overflowX: 'hidden', height:'calc(100% - 54px)', margin: '0'}}>
                        <div className="juliet-section-h">
                            <div className="juliet-section-header"><h5>Sobe</h5></div>
                            <div className="juliet-remove juliet-section-icon" onClick={(e)=> {
                                var node = document.getElementById('addRoom')
                                var display = node.style.display;
                                node.style.display = display === "block" ? 'none' : "block"
                                }}><i class="material-icons-outlined md-14">add_circle_outline</i>
                            </div>
                        </div>
                        <div id="addRoom" style={{display: 'none'}}>
                            <div>                     
                                <CreateRoom  style={createRoomStyle} createRoom={this.props.createRoom}/>
                                {this.props.hasErrorAddUser?<p style={{gridColumn: 1/3}}>Greška prilikom dodavanja korisnika</p>:null}
                                <NewPublicRoomForm style={createRoomStyle} createPublicRoom={this.props.createPublicRoom}/>
                            </div>
                        </div>
                        {this.props.rooms.filter(room => !room.isPrivate && room.name.includes(this.state.input)).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"juliet-room" + active + " juliet-user"} onClick={() => this.props.joinRoomById(room.id,this.props.currentUser)}
                            key={index}>
                                <div className="juliet-presence-state"><i class="material-icons md-12">public</i> </div>
                                <div className="juliet-username-name">{room.name}</div>
                                </li>
                        })}

                        {this.props.rooms.filter(room => room.isPrivate && room.name.includes(this.state.input)).map((room, index) => {
                            const active = this.props.room.id === room.id ? "active" : "";
                            return <li className={"juliet-room" + active + " juliet-user"} onClick={() => this.props.joinRoomById(room.id,this.props.currentUser)} 
                            key={index}>
                                <div className="juliet-presence-state"><i class="material-icons md-12">lock</i> </div>
                                <div className="juliet-username-name">{room.name}</div>
                            </li>
                        })}
                        
                        {this.props.joinableRooms.length > 0 && <h5 className="juliet-section-header">Javne sobe</h5>}
                        {this.props.joinableRooms.filter(room => room.name.includes(this.state.input)).map(room => {
                        return (
                            <li key={room.id} className="juliet-room juliet-user" onClick={()=>this.props.joinRoomById(room.id,this.props.currentUser)}>
                                <div className="juliet-presence-state"><i class="material-icons md-12">public</i> </div>
                                <div className="juliet-username-name">{room.name}</div>
                            </li>                        
                            )
                        })}
                        
                        {favoriteUsers.length > 0 && <h5 className="juliet-section-header">Omiljeni korisnici</h5> }
                        {favoriteUsers.map((user, index) => {
                                return <li className="juliet-user" key={index} onClick={() => this.props.openPrivateChat(user.id)} >
                                    <div className="juliet-presence-state"> {user.id === currentUser.id ? this.state.online && <i class="material-icons md-12 md-online">fiber_manual_record</i> || !this.state.online && <i class="material-icons-outlined md-12">fiber_manual_record</i> : user.presence.state === 'online' && <i class="material-icons md-12 md-online">fiber_manual_record</i> || user.presence.state === 'offline' && <i class="material-icons-outlined md-12">fiber_manual_record</i>}</div>
                                <div className="juliet-username-name">{user.name}</div>
                                    <div className="juliet-user-online" onClick={(e)=> {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.setState({
                                        online: !(this.state.online)
                                    })
                                }}>{this.state.online && user.id === currentUser.id && <i class="material-icons-outlined md-14">toggle_on</i> || this.state.online===false && user.id === currentUser.id && <i class="material-icons-outlined md-14">toggle_off</i>}
                                    </div>
                                    <div className="juliet-remove" onClick={(e)=>{
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.triggerDelete(user, index);
                                    }}><i class="material-icons-outlined md-14">cancel</i></div>
                                </li>
                            })
                        }
                        
                        <h5 className="juliet-section-header">Korisnici</h5>
                        {listSrc.filter((user) => (!currentUser.customData || 
                            typeof currentUser.customData.favoriteUsers !== "undefined" && !currentUser.customData.favoriteUsers.includes(user.id))).map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="juliet-user" key={index}>  
                                <div className="juliet-presence-state"> {user.id === currentUser.id ? this.state.online && <i class="material-icons md-12 md-online">fiber_manual_record</i> || !this.state.online && <i class="material-icons-outlined md-12">fiber_manual_record</i> : user.presence.state === 'online' && <i class="material-icons md-12 md-online">fiber_manual_record</i> || user.presence.state === 'offline' && <i class="material-icons-outlined md-12">fiber_manual_record</i>}</div>
                                <div className="juliet-username-name">{user.name}</div>
                                <div className="juliet-user-online"onClick={(e)=> {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.setState({
                                        online: !(this.state.online)
                                    })
                                }}>{this.state.online && user.id === currentUser.id && <i class="material-icons-outlined md-14">toggle_on</i> || this.state.online===false && user.id === currentUser.id && <i class="material-icons-outlined md-14">toggle_off</i>}
                                    </div>
                                <div className="juliet-remove" onClick={(e)=> {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.triggerAdd(user, index);
                                }}><i class="material-icons-outlined md-14">add_circle_outline</i></div> 
                            </li>
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <p>Loading...</p>
            )
        }
    }
}

const createRoomStyle ={
    gridColumn: 1/2
}

const inpStyle = {
    borderRadius : '0.25rem',
    height: '40px',
    margin: '2px'
}
const userSearch = {
    borderRadius : '0.25rem',
    height: '40px',
    margin: '2px'
}
export default UsersList;