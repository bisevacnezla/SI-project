import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

import { Icon } from '@opuscapita/react-icons';

import ConfirmationModal from '../Modali/ConfirmationModal.js';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: false
        }
    }
    toggle(){
        this.setState({
            toggle: !this.state.toggle
        })
    }
    render(){
        let { naziv, godinaId, predmetId } = this.props.izvjestaj;
        let putanja = `/Lima/izvjestaji/godina=${godinaId}&predmet=${predmetId}`;
        return (
            <Fragment>
                <ConfirmationModal 
                    toggle={()=>{this.toggle()}} 
                    isOpen={this.state.toggle} 
                    confirm={()=>{this.props.deleteIzvjestaj(this.props.izvjestaj)}}
                    poruka="Da li ste sigurni da zelite obrisati precicu?" />
                <div className="d-flex align-items-center w-100 btn-light card-header py-0">
                    <Link to={putanja} className="d-flex align-items-center w-100" style={{minHeight: 50, color: 'black'}}>{naziv}</Link>
                    <div onClick={()=>{this.toggle()}} className="ml-auto btn btn-danger" style={{width: '100px'}} >
                        Obriši
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home;