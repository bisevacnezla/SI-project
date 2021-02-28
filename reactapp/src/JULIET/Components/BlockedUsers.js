import React, { Component } from 'react';
import '../styles/EventPlanner.css';

class BlockedUsers extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        this.props.getUserRole();
        if(this.props.currentUserRole == 'admin'){
            this.props.banUser(this.state.user);
            this.props.blockAUser(this.state.user);
            this.setState({
                user: ''
            });
            

        }else{
            this.props.blockAUser(this.state.user);
            this.setState({
                user: ''
            })
        }
    }
    onChangeHandlerBlock(e){
        this.setState({
            user: e.target.value,
          });
    }
    handleChange(e) {
        this.setState({
            user: e.target.value
        })
    }

    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }

    render(){
        return(
            <form  onSubmit={this.onSubmit.bind(this)} style={{width: '100%', paddingTop: '5px'}}>
                <input  type="text" style={inpStyle} placeholder="Blokiraj korisnika" onChange={this.handleChange} value={this.state.user} />
                <input  id="juliet-event-button" className="btn btn-outline-primary" type="submit" value="Blokirajte korisnika" style={{width: '100%', background: 'white', color: this.props.colorScheme, fontWeight: 'bold'}}/>
            </form>
        )
    }
    
}


const inpStyle = {
    borderRadius : '0.25rem',
    height: '40px',
    width: '100%',
    marginBottom: '4px',
    padding: '3px 6px',
    border: '0.5px solid rgb(0,0,0,0.4)'
}

export default BlockedUsers;