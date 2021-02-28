import React from 'react'
import '../styles/Message.css'
import { format } from 'date-fns';

class Message_ extends React.Component {
    render() {
        return(
            <div className="juliet-message">
                <div className="juliet-avatar-container">
                    <img src={(this.props.user && this.props.user.avatarURL) || "avatar.png"} className="juliet-avatar"></img>
                </div>
                <div className="juliet-message-container">
                    <h4 className="juliet-message-sender" onClick={this.props.openPrivateChat}>{this.props.user && this.props.user.name} <span className="juliet-message-time">{format(new Date(this.props.date), 'DD. MMM, HH:mm')}</span></h4>
                    <p className="juliet-message-text" >
                        {this.props.text}
                    </p>
                </div>
            </div>
        )
    }
}



export default Message_;