import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from "@material-ui/core";
import Axios from "axios";

function Transition(props) {
    return <Slide direction="up" {...props} />
}

export default class ThreadDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageToSend: ''
        };
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleChange = (e) => {
        this.setState({
            messageToSend: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.persist();
        this.props.onSubmit(this.state.messageToSend);
        this.setState({ messageToSend: '' });
    }

    render() {
        const { ...other } = this.props;
        return (
            <div>
                <Dialog
                    maxWidth="md"
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="thread-dialog-title"
                    {...other}
                >
                    <DialogTitle id="thread-dialog-title">Poruka #{this.props.message.id}</DialogTitle>
                    <DialogContent>
                        <ul style={listStyle} className="list-group juliet-message-list">
                            {this.props.messagelist.map((message, index) => (
                                <li
                                    className="list-group-item juliet-message" style={messageStyle} key={index}>
                                    <h4 className="juliet-message-sender">{message.sender}</h4>
                                    <p className="juliet-message-text" >
                                        {message.text}
                                    </p>
                                </li>
                            ))}</ul>
                        <form onSubmit={this.handleSubmit}>
                            <input className="input-group mb-3 juliet-message-input" type="text" style={inputStyle}
                                onChange={this.handleChange} value={this.state.messageToSend} />
                            <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Pošalji" />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} style={{color: this.props.colorScheme}}>Zatvori</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const listStyle = {
    height: '100%',
    textAlign: 'left'
}

const messageStyle = {
    alignContent: 'center'
}

const buttonStyle = {
    height: '40%',
    marginLeft: '10px'
}

const inputStyle = {
    width: '100%',
    padding: '0'
}