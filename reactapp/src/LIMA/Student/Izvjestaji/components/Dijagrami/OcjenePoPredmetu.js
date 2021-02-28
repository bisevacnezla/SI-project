import React, { Fragment, Component } from 'react';

import GrafikStavka from './GrafikStavka.js';

import { dataPredmetPoGodini } from '../../api.js';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

class OcjenePoPredmetu extends Component {
    constructor(){
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount(){
        let { predmetId, godinaId } = this.props;
        dataPredmetPoGodini.get(predmetId, godinaId, "Ocjena").then( data => {
            this.setState({
                data: data
            });
        }).catch(err => {
            toast.error("Greska!");
        })
    }
    izracunajProsjecnuOcjenu(){
        let ukupno = 0, koliko = 0;
        let { data } = this.state;
        for(let i=0;i<data.length;i++){
            if(isNaN(data[i]))continue;
            ukupno += data[i];
            koliko++;
        }
        return ukupno/koliko;
    }
    render(){
        return (this.state.data ? 
            <Fragment>
                <h6 className="pt-3 px-3">Prosjecna ocjena: {this.izracunajProsjecnuOcjenu()}</h6>
                <GrafikStavka
                    data={this.state.data}
                    nazivStavke='Ocjena'
                    tipGrafika='Pie'
                />
            </Fragment> :
            <Spinner />
            )
    }
}

export default OcjenePoPredmetu;