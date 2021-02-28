import React, { Fragment, Component } from 'react';

import GrafikStavka from './GrafikStavka.js';

import { dataPredmetPoGodini } from '../../api.js';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

class ZadacePoPredmetu extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        let { predmetId, godinaId } = this.props;
        dataPredmetPoGodini.get(predmetId, godinaId, "Zadaca").then( data => {
            this.setState({
                data: data
            });
        }).catch(err => {
            toast.error("Greska!");
        })
    }
    render(){
        return (this.state.data ? 
            <GrafikStavka
                data={this.state.data}
                nazivStavke='Zadaca'
                tipGrafika='Bar'
            /> :
            <Spinner />)
    }
}

export default ZadacePoPredmetu;