import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import '../styles/ChatApp.css';
import { instanceLocator, testToken, testRoomId} from './../config.js'
import UsersList from './UsersList';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatApp.css';
import UploadFile from './UploadFile';
import Axios from 'axios';
import {SwatchesPicker} from 'react-color';
import { Droplet } from 'react-feather';
import FileSidebar from './FileSidebar';
import Members from './Members';
import PinnedMessages from './PinnedMessages';
import EventPlanner  from './EventPlanner';
import BlockedUsers  from './BlockedUsers';


let predmeti = require('../predmeti.json');

function findPredmetId(nameOfPredmet) {
    for(var i = 0; i < Object.keys(predmeti).length; i++) {
        for(var j = 0; j < Object.keys(predmeti[i].name).length; j++) {
            if(predmeti[i].name[j].toLowerCase() === nameOfPredmet.toLowerCase()) {
                return predmeti[i].id;   
            }
        }
    }
    return -1; 
}

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            botUser: null,
            currentRoom: {},
            messages: [],
            messageToSend: '',
            users: [],
            room_users: [],
            rooms: [],
            hasErrorAddUser: null,
            hasErrorBlockUser: false,
            typingUsers: [], 
            pinnedMessages: [], 
            colorForUser: null, 
            showColorPicker: false,
            joinableRooms:[],
            blockedUsers: [],
            presenceUser: [],
            currentUserRole: null
        }
        this.addMessage = this.addMessage.bind(this);
        this.openPrivateChat = this.openPrivateChat.bind(this);
        this.joinRoomById = this.joinRoomById.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.initRooms = this.initRooms.bind(this);
        this.addUser = this.addUser.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.downloadClick = this.downloadClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.pinMessage = this.pinMessage.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.toggleColorPicker = this.toggleColorPicker.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.createPublicRoom = this.createPublicRoom.bind(this);
        this.blockAUser = this.blockAUser.bind(this);
        this.usersPresence = this.usersPresence.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
        this.setState({rooms :[]});
    }
    toggleColorPicker() {
        this.setState({
            showColorPicker: !this.state.showColorPicker,
        });
    }
    
    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })
        const chatManagerBot = new ChatManager({
            instanceLocator: instanceLocator,
            userId: "bot@autoreply",
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })
        
        chatManagerBot.connect().then(currentUser => {
            this.setState({botUser: currentUser})
            return currentUser;
        })
        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser }, () => { 
                    
                    Axios.get('https://si2019juliet.herokuapp.com/colorscheme/' + this.state.currentUser.id).then(res => {
                        if (res.data === 0) { // korisnik nema svoj colorscheme
                            this.setState({
                                colorForUser: null
                            });
                        } else { 
                            Axios.get('https://si2019juliet.herokuapp.com/colorschemeUser/' + this.state.currentUser.id).then(res => {
                                this.setState({
                                    colorForUser: res.data.colorId
                                })
                            });
                        }
                    }) 
                    currentUser.getJoinableRooms()
                    .then(joinableRooms => {
                        this.setState({
                            joinableRooms
                        })
                    })
                })
                this.initRooms(currentUser);
                this.joinRoomById(testRoomId,currentUser);
            })
            .then(() => {
                
                
            })
            .then(() => {
                
            })
        const url = 'https://si2019juliet.herokuapp.com/pinovanePoruke';
            
        Axios.get(url).then(res => {
            this.setState({ 
                pinnedMessages: res.data
            }, () => {
                //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages));
            });
        }).catch(e => {console.log(e)});
        
        
    }
    getUserRole(){
        Axios.get('https://si2019juliet.herokuapp.com/users/'+this.state.currentUser.id +'/roles').then(res=>{
            this.setState({
                currentUserRole : res.data[0].role_name
            })
        });
        
    }
    usersPresence(){
        this.state.users.forEach(userPS =>{
            const userAndState = {
                userID : userPS.id,
                userState : userPS.presence.state }
            this.setState({
                presenceUser: [...this.state.presenceUser, userAndState]                      
            });
        })
    }
    changeState(){

    }
    initRooms(CU) {
        CU.rooms.forEach(userRoom => {
            CU.subscribeToRoom({
                roomId: userRoom.id
            }).then(() => {
                if (userRoom.name === CU.id && userRoom.users.length > 1) {
                    CU.updateRoom({
                        roomId: userRoom.id,
                        name: CU.id === userRoom.users[0].id ? userRoom.users[1].id : userRoom.users[0].id
                    })
                }

            })
        })
        this.setState({ rooms: CU.rooms });
    }

    joinRoomById(roomId,CU) {
        this.setState({ messages: [] });
        CU.subscribeToRoom({
            roomId: roomId,
            messageLimit: 20,
            hooks: {
                onMessage: message => {
                    if(message.text === 'DELETED'){
                        return;
                    }
                    this.setState({
                        messages: [...this.state.messages, message]                      
                    })                  
                },
                onPresenceChanged: () => this.forceUpdate(),
                onUserJoinedRoom: () => this.forceUpdate(),
                onUserLeftRoom: () => this.forceUpdate(),
                onUserStartedTyping: user => {
                    console.log(user.name + ' poceo kucati....');
                    this.setState({
                      typingUsers: [...this.state.typingUsers, user.name],
                    })
                },
                onUserStoppedTyping: user => {
                    console.log(user.name + ' prestao kucati...');
                    this.setState({   
                        typingUsers: this.state.typingUsers.filter(
                            username => username !== user.name
                        ),
                    })
                },
            }
        }).then((room) => {
            let usersMap = new Map();

            room.users.map((user, index) => {
                usersMap.set(user.id, user.avatarURL);
            })

            this.setState({
                currentRoom: room,
                room_users: room.users,
                users: CU.users
            })

            this.forceUpdate();
        })
    }

    openPrivateChat(userId) {
        this.setState({ messages: [] });
        const room = this.state.rooms.filter(room => room.name === userId);
        if (room.length > 0) {
            this.joinRoomById(room[0].id,this.state.currentUser);
        } else {
            this.state.currentUser.createRoom({
                name: userId,
                private: true,
                addUserIds: [userId]               
            }).then((room) => {
                this.setState({ rooms: [...this.state.rooms, room] });
                this.joinRoomById(room.id,this.state.currentUser);
            });
        }
    }

    addMessage(text) {
        console.log(this.state.currentUser);
        this.state.currentUser.sendMessage({
            text: text,
            roomId: this.state.currentRoom.id
        }).then(() => {       
            if(text.substr(0, 11) === "@izvjestaj ") {
                var name = text.substr(11);
                var predmetGodina = name.split(", ");
                var predmetId = findPredmetId(predmetGodina[0]);
                if (predmetId !== -1) {
                    this.state.botUser.sendMessage({
                        text: "https://zamger.etf.unsa.ba/?sta=izvjestaj/predmet&predmet=" + predmetId + "&ag=" + 
                        (parseInt(predmetGodina[1]) - 2005) + "&sm_arhiva=0",
                        roomId: this.state.currentRoom.id
                    })
                } else {
                    this.state.botUser.sendMessage({
                        text: "Nepostojeci predmet",
                        roomId: this.state.currentRoom.id
                    })
                }
            }
            else if(text.substr(0,11) === '@setAvatar '){
                let url = text.substr(text.indexOf(' ') +1,text.length); 
                Axios.post('https://si2019juliet.herokuapp.com/updateAvatar', {
                    url: url,
                    currentUId:this.state.currentUser.id
                }).then(res => {
                    window.alert('Avatar will change next time you log in.');

                    let userCopy = this.state.currentUser;
                    userCopy.avatarURL = url;

                    let usersCopy = this.state.users;

                    usersCopy.map((user, index) => {
                        if(user.id === this.state.currentUser.id) user.avatarURL = url;
                    });
                    
                    this.setState({
                        currentUser: userCopy,
                        users: usersCopy
                    })

                    this.forceUpdate();
                })
               .catch(e => console.log(e));            
            }
        }).catch(error => console.error('error', error));
    }
    banUser(userID){
        Axios.post('https://si2019juliet.herokuapp.com/blockedUser', {
            user_id: userID
        }).then(res =>{
            console.log("otisao u bazu i vratio se");
        })
        .catch(e => console.log(e));
    }

    createRoom(roomName){
        this.state.currentUser.createRoom({
            name: roomName,
            private: true            
        }).then(room => {
            this.setState({ rooms: [...this.state.rooms, room] });
            this.joinRoomById(room.id,this.state.currentUser);
        })
        .catch(err=> console.log("err wth cr room", err))
    }
    addUser(userName){
        const rid = this.state.currentRoom.id;
        this.state.currentUser.addUserToRoom({
            userId: userName,
            roomId: rid,
            hooks: {
                onUserJoinedRoom: () => this.forceUpdate()
            }
          })
            .then(() => {
              this.joinRoomById(rid,this.state.currentUser);
              this.setState({hasErrorAddUser:false});
            })
            .catch(err => {
              this.setState({hasErrorAddUser:true});
            })
    }
    
    createPublicRoom(roomName){
        this.state.currentUser.createRoom({
            name: roomName,
            private: false           
        }).then(room => {
            this.setState({ rooms: [...this.state.rooms, room] });
            this.joinRoomById(room.id,this.state.currentUser);            
        })
        .catch(err=> console.log("err wth cr room", err))
    }

    sendTypingEvent(event) {
        this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id }).catch(error => console.error('error', error))
    }

    uploadFile(file){
        const fData = new FormData();
        fData.append('file', new Blob([file], {type: file.type}));
        fData.append('name', file.name);
        fData.append('sender', this.state.currentUser.id);
        fData.append('room', this.state.currentRoom.id);

        let config = {
            header : {
              'Content-Type' : 'multipart/form-data'
            }
        }

        Axios.post('https://si2019juliet.herokuapp.com/upload', fData, config).then(res => {
            window.alert('Uspješno upisano u bazu!');
            this.addMessage('Downloaduj file: ' + file.name);
            
        }).catch(() => window.alert('Greška...'));
    }

    downloadClick(name){
        const url = 'https://si2019juliet.herokuapp.com/download/' + name;

        Axios.get(url).then(res => {
            let resultByte = res.data.file.data;
            var bytes = new Uint8Array(resultByte);
            var blob = new Blob([bytes], {type: res.data.mimetype});

            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = res.data.naziv;
            link.click();
        }).catch(e => console.log(e));
    }

    deleteClick(message, index){


        Axios.post('https://si2019juliet.herokuapp.com/deleteMessage', {
            message_id: message.id,
            sender: message.senderId,
            fileName: message.text.substring(message.text.indexOf(': ') + 2, message.text.length)
        })
        .catch(e => console.log(e));

        let msgTmp = this.state.messages.slice(0, index).concat(this.state.messages.slice(index + 1, this.state.messages.length));

        this.setState({
            messages: msgTmp
        })
    }

    handleReply(message) {
        this.setState({ messageToSend: `Replying to ${message.senderId}: "${message.text}"\n>` });
    }

    pinMessage(message) {
        const url = 'https://si2019juliet.herokuapp.com/pinovanePoruke/' + message.id;
        //console.log(url);
        Axios.get(url).then(res => {
            if (res.data === 0) { // ne postoji u bazi
                let trenutnaPoruka = {
                    messageCreatedAt: message.createdAt,
                    messageId: message.id + '',
                    roomId: message.roomId,
                    senderId: message.senderId,
                    text: message.text
                };
                this.setState({ 
                    pinnedMessages: this.state.pinnedMessages.concat([trenutnaPoruka])
                }, () => {
                    //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages));
                    const reqBody = {
                        messageCreatedAt: message.createdAt,
                        messageId: message.id + '',
                        roomId: message.roomId,
                        senderId: message.senderId,
                        text: message.text
                    }
                    Axios.post('https://si2019juliet.herokuapp.com/pinujPoruku', reqBody)
                    .then(res => {})
                    .catch(e => console.log(e));
                });
                
            } 
            else { // postoji u bazi
                this.setState({
                    pinnedMessages: this.state.pinnedMessages.filter(function(m) { 
                        return m.messageId != message.id;
                    }
                )}, () => { 
                    //localStorage.setItem('PinovanePoruke', JSON.stringify(this.state.pinnedMessages)); 
                });
                const url2 = 'https://si2019juliet.herokuapp.com/pinujPoruku/' + message.id;
                Axios.delete(url2).then(res => {}).catch(e => {console.log(e)});
            } 
        });
    }
    handleColorChange(color, event) {
        this.setState({
            colorForUser: color.hex
        }, () => {
            Axios.get('https://si2019juliet.herokuapp.com/colorscheme/' + this.state.currentUser.id).then(res => {
                if (res.data === 0) {
                    Axios.post('https://si2019juliet.herokuapp.com/colorscheme', {
                        colorId: color.hex, 
                        userId: this.state.currentUser.id
                    });
                } else {
                    Axios.delete('https://si2019juliet.herokuapp.com/colorscheme/' + this.state.currentUser.id).then(res => {
                        Axios.post('https://si2019juliet.herokuapp.com/colorscheme', {
                            colorId: color.hex, 
                            userId: this.state.currentUser.id
                        });
                    }).catch(e => console.log(e));
                };
            })
            
        });
    }
    blockAUser(userID){
        const UsersToBlock = this.state.users.filter(user => user.id === userID);
        const roomIfDelete = this.state.currentRoom.id;
        if(this.state.currentUser.id === userID){
            this.setState({ rooms: [...this.state.rooms.filter(roomaa => roomaa.id !== roomIfDelete)] });
            this.state.currentUser.leaveRoom({ roomId: this.state.currentRoom.id })
            .then(room => {
                if(room.users.length === 0){
                    this.state.currentUser.deleteRoom({ roomId: this.state.currentRoom.id })
                    .then(() => {
                        
                        console.log('Deleted room with ID: ');
                        
                    })
                    .catch(err => {
                        console.log(`Err`);
                    })
                    
                    
                }
                })
                .catch(err => {
                console.log(`Error leaving room ${this.state.currentRoom.id}: ${err}`)
                })
            this.setState({hasErrorBlockUser:false});
            this.joinRoomById(this.state.rooms[0].id,this.state.currentUser);
        } else if(UsersToBlock.length !== 0){
            this.setState({
                blockedUsers: [...this.state.blockedUsers, UsersToBlock[0]]
            })
            this.state.currentUser.removeUserFromRoom({
                userId: userID,
                roomId: this.state.currentRoom.id
              })
                .then(() => {
                    this.joinRoomById(this.state.currentRoom.id,this.state.currentUser);
                    this.setState({hasErrorBlockUser:false});
                    if(this.state.currentRoom.users.length === 0){
                        this.state.currentUser.deleteRoom({ roomId: this.state.currentRoom.id })
                        .then(() => {
                            console.log('Deleted room with ID: '+ this.state.currentRoom.id);
                                                    
                    
                        })
                        .catch(err => {
                            console.log(`Error deleted room ${this.state.currentRoom.id}: ${err}`)
                        })
                        
                    }
                
                })
                .catch(err => {
                  console.log('Error removing user from room:'+ err);
                })
            
        }else{
        this.setState({hasErrorBlockUser:true});
        console.log('No such user');
    }
    }
    render() {
        let colorScheme = this.state.colorForUser != null ? this.state.colorForUser : "#2C3E50";
        const {
            showColorPicker,
        } = this.state;

        return ( 
            <div className="juliet-chat-app-wrapper">

                <div style={{'background': colorScheme}} className="juliet-list-wrapper">
                    <UsersList 
                        openPrivateChat={this.openPrivateChat} 
                        users={this.state.users} 
                        room_users={this.state.room_users}
                        currentUser={this.state.currentUser}
                        room={this.state.currentRoom}
                        joinRoomById={this.joinRoomById}
                        rooms={this.state.rooms}
                        joinableRooms={this.state.joinableRooms}
                        chatkit={this.props.chatkit}
                        createRoom={this.createRoom}
                        createPublicRoom={this.createPublicRoom}
                        addUser={this.addUser}
                        hasErrorAddUser={this.state.hasErrorAddUser}
                        usersPresence={this.usersPresence}
                    />
                </div>

                <div className="juliet-msg-wrapper">
                    
                    <div className="juliet-messages">
                        <MessageList currentId={this.props.currentId} replyToMessage={this.handleReply} currentRoom={this.state.currentRoom}
                            messages={this.state.messages.slice(0).slice(-30)} pinMessage={this.pinMessage} downloadClick={this.downloadClick} deleteClick={this.deleteClick}
                            users={this.state.users} colorScheme={colorScheme}/>
                        <TypingIndicator typingUsers={this.state.typingUsers} />
                    </div>
                    
                    <div className="juliet-input-all">
                        <div style={{height: '60%'}}>
                            <Input onSubmit={this.addMessage} onChange={this.sendTypingEvent} replyingTo={this.state.messageToSend}/>
                        </div>
                        <div style={{height: '40%'}}>
                            <UploadFile onSubmit={this.uploadFile} colorScheme={colorScheme} />
                        </div>
                    </div>
                    
                </div>
                <div style={{'background': colorScheme}} className="juliet-list-wrapper juliet-right-wrapper">
                    <BlockedUsers currentUserRole={this.state.currentUserRole} banUser={this.banUser} getUserRole={this.getUserRole} blockAUser={this.blockAUser} colorScheme={colorScheme}/>
                    <Members 
                        openPrivateChat={this.openPrivateChat} 
                        room_users={this.state.room_users}
                        currentUser={this.state.currentUser}
                        room={this.state.currentRoom}
                        chatkit={this.props.chatkit}
                        addUser={this.addUser}
                    />
                    <FileSidebar downloadClick={this.downloadClick} roomId={this.state.currentRoom.id} />
                    <PinnedMessages pinnedMessages={this.state.pinnedMessages} roomId={this.state.currentRoom.id} />
                    <EventPlanner currentId={this.props.currentId} colorScheme={colorScheme}/> 
                    <ul className="juliet-colors-popup" onMouseLeave={this.toggleColorPicker} >
                        {this.state.showColorPicker ? 
                            <SwatchesPicker onChange={this.handleColorChange}/> 
                        : null}
                    </ul>
                    <div style={{width: '100%', padding: '10px 0'}}>   
                        <div className="juliet-section-h">
                        <div className="juliet-section-header" style={{width: 'calc(100% - 24px)'}}>
                            <h5 style={{display: 'inline-block'}}>Izaberi temu:</h5>
                        </div>
                        <button
                            style={{display: 'inline-block'}}
                            type="button"
                            className="juliet-toggle-colors"
                            onClick={this.toggleColorPicker}>
                            <Droplet />
                        </button>   
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatApp;