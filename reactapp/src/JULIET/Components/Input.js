import React, { Component } from 'react';
import { Smile } from 'react-feather';
import { Picker,  emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';

function toggleEmojiPicker() {
    this.setState({
        showEmojiPicker: !this.state.showEmojiPicker,
    });
}

function addEmoji(emoji) {
    const { message } = this.state;
    const text = `${message}${emoji.native}`;

    this.setState({
        message: text,
        showEmojiPicker: false,
    });
}

class Input extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showEmojiPicker: false,
            buttonValue:'Send',
            porukaPlaceholder:'Say "Hi" to everyone'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addEmoji = addEmoji.bind(this);
        this.toggleEmojiPicker = toggleEmojiPicker.bind(this);
    }

    componentWillReceiveProps(prevProps) {
        if(this.props.replyingTo !== prevProps.replyingTo) {
            this.setState({ message: prevProps.replyingTo });
        }
    }

    handleChange(e) {
        this.setState({
            message: e.target.value,
            buttonValue: 'Send',
            porukaPlaceholder: 'Pozdravite druge korisnike'
        })
        this.props.onChange(e)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setState({
            message: ''
        })
    }
    render() {
        const {
            showEmojiPicker,
          } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="juliet-input-field">
                <input className="input-group mb-3 juliet-message-input" type="text" style={inputStyle}
                placeholder={this.state.porukaPlaceholder} onChange={this.handleChange} value={this.state.message} />
                
                <ul className="juliet-emoji-popup">
                    {showEmojiPicker ? (
                    <Picker set="emojione" onSelect={this.addEmoji} />
                    ) : null}
                </ul>
                <button
                    type="button"
                    className="juliet-toggle-emoji"
                    onClick={this.toggleEmojiPicker}>
                    <Smile />
                </button>
                {/* <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value={this.state.buttonValue} /> */}
            </form>
        )
    }
} 

const buttonStyle = {
    height: '40%',
    marginLeft: '10px'
}

const inputStyle = {
    width: '100%',
    padding: '0',
    height: '60%',
    position: 'relative',
    top: '0',
    bottom: '0'
}

export default Input;
