
import React, { Component } from 'react';
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
import {instanceLocator, secretKey} from './config.js';
import { default as Chatkit } from '@pusher/chatkit-server';
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.css';

const chatkit = new Chatkit({
  instanceLocator: instanceLocator,
  key: secretKey
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentView: 'signup'
    }
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  createUser(username) {
    chatkit.createUser({
      id: username,
      name: username,
      avatarURL: 'https://cdn2.iconfinder.com/data/icons/ninja/500/Ninja_4-512.png'
    }).then((currentUser) => {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      }).catch((err) => {
        if (err.status === 400) {
          this.setState({
            currentUsername: username,
            currentId: username,
            currentView: 'chatApp'
          })
        }
      });
  }

  changeView(view) {
    this.setState({
      currentView: view
    })
  }


  render() {
    let view = '';
    if (this.state.currentView === "ChatMessage") {
      view = <ChatMessage changeView={this.changeView} />
    } else if (this.state.currentView === "signup") {
      view = <Signup onSubmit={this.createUser} />
    } else if (this.state.currentView === "chatApp") {
      view = <ChatApp currentId={this.state.currentId} chatkit={chatkit}/>
    }
    return (
      <div className="Juliet-App">
        {view}
      </div>
    );
  }
}
export default App;