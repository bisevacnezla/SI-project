import React, { Component } from 'react';
import '../styles/Signup.css'
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            banedUser: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ username: e.target.value });
    }

    handleSubmit = () => {
        this.setState({ username: localStorage.getItem('username') });
        Axios.get('https://si2019juliet.herokuapp.com/blockedUser/' + localStorage.getItem('username')).then(res => {
            if (res.data === null) {
                this.props.onSubmit(localStorage.getItem('username'));

            } else {
                /*if(this.state.username === res.data.blockedUserId)*/
                this.setState({
                    username: "",
                    banedUser: true
                })

            }
        });
    }

    render() {
        return (
            <div style={signupStyle} className="juliet-form-container">
                <h1>ETF CHAT</h1>
                {!localStorage.getItem('username') ?
                    <div style={divStyle}>
                        <label style={labelStyle}>Niste prijavljeni!</label>
                        <Link to="/Romeo">
                        <button className="juliet-submit" style={buttonLogin}>Prijavite se!</button>
                        </Link>
                    </div> :
                    <div style={divStyle}>
                        <label style={labelStyle}>{localStorage.getItem('username')}</label>
                        <button className="juliet-submit" onClick={this.handleSubmit} style={buttonLogin}>Nastavi</button>
                    </div>}
                    {this.state.banedUser ? <p style={{ color: "#000", padding: '10px 0' }}>Ovom korisniku je zabranjen pristup!</p> : null}
            </div>
        )
    }
}

const signupStyle = {
    height: '200px',
    width: '40%',
    margin: 'auto',
    marginTop: '10rem'
}

const buttonLogin = {
    height: '35px',
    fontSize: '14px',
    width: '40%'
}
const divStyle = {
    textAlign: 'center',
    display: 'grid',
    gridTemplateRows: '2fr 1fr',
    height: '160px'
}

const labelStyle = {
    color: '#2C3E50',
    margin: 'auto',
    fontSize: '15px',
    fontWeight: 'bold'
}
export default Signup;