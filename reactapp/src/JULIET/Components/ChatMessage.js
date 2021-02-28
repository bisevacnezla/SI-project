import React, { Component } from 'react';
    class  ChatMessage extends Component {
        constructor(props) {
            super(props);
            this.changeView = this.changeView.bind(this);
        }
        changeView() {
            this.props.changeView('signup')
        }
        render() {
            return (
                <div>
                    <button className="juliet-chat-button" onClick={this.changeView}>Pošalji poruku</button>
                </div>
            )
        }
    }
    export default ChatMessage;